import React, { useState, useEffect } from 'react';

import './style.css';

function DevForm({ onAdd, onEdit, editModeState }){
    const [{editMode, dev}, setEditMode] = editModeState;  
    const [github, setGithub] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar_url, setAvatarURL] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
      if (!editMode) { // Localização do navegador (Pois o usuário está cadastrando)
        setGithub('');
        setTechs('');
        setName('');
        setBio('');
        setAvatarURL('');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          }, {
            timeout: 30000
          }
        )
      } else { // Localização do dev selecionado (Pois o usuário está editando)
        const { github, techs, name=github, bio, avatar_url, location: { coordinates: [latitude, longitude]}} = dev;
        setGithub(github);
        setName(name);
        setBio(bio);
        setAvatarURL(avatar_url);
        setTechs(techs.join(", "));
        setLatitude(latitude);
        setLongitude(longitude);
      }
    }, [editMode, dev]);

    async function handleSubmit(e){
        e.preventDefault();
        if (editMode) {
          await onEdit(dev, {
            techs,
            name,
            bio,
            avatar_url,
            latitude,
            longitude
          })
          setEditMode({editMode: false, dev: {}});
        } else 
        await onAdd({
            github,
            techs,
            latitude,
            longitude
        });
        setGithub('');
        setTechs('');
        setName('');
        setBio('');
        setAvatarURL('');
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github">Usuário do GitHub</label>
          <input 
            name="github" 
            id="github" 
            required
            value={github}
            disabled={editMode}
            onChange={e => setGithub(e.target.value)}
          />
        </div>
    
        <div className="input-block" hidden={!editMode}>
          <label htmlFor="name">Nome</label>
          <input 
            name="name" 
            id="name" 
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input 
            name="techs" 
            id="techs" 
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-block" hidden={!editMode}>
          <label htmlFor="avatar_url">URL do Avatar</label>
          <input 
            name="avatar_url" 
            id="avatar_url" 
            required
            value={avatar_url}
            onChange={e => setAvatarURL(e.target.value)}
          />
        </div>

        <div className="input-block" hidden={!editMode}>
          <label htmlFor="bio">Bio (descrição)</label>
          <textarea
            name="bio" 
            id="bio" 
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>
    
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
              name="latitude" 
              id="latitude" 
              value={latitude} 
              required
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input 
              name="longitude"
              id="longitude" 
              value={longitude} 
              required
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
    
        <button type="submit">Salvar</button>
      </form>
    );
}

export default DevForm;