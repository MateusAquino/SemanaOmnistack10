import React, { useState, useEffect } from 'react';

import './style.css';

function DevForm({ onAdd, onEdit, editModeState }){
    const [{editMode, dev}, setEditMode] = editModeState;  
    const [github, setGithub] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
      if (!editMode) { // Localização do navegador (Pois o usuário está cadastrando)
        setGithub('');
        setTechs('');
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
        const { github, techs, location: { coordinates: [latitude, longitude]}} = dev;
        setGithub(github);
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