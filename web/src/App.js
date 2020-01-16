import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// Component  : Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação (Obs.: Primeira Letra Maiúscula)
// Propriedade: Informações que um componente "Pai" passa para o componente "Filho"
// Estado     : Informações mantida pelo componente (Lembrar: imutabilidade)

function App() {
    const editModeState = useState({editMode:false, dev:{}});
    const [devs, setDevs] = useState([]);
    const [{editMode}] = editModeState;
  
    // Load devs
    useEffect(() => {
      async function loadDevs(){
        const response = await api.get('devs');
      
        setDevs(response.data.devs);
      }
      loadDevs();
    }, []);
  
    async function handleAddDev(data) {
      const response = await api.post('devs', data);
      if (!devs.length || (devs.length && !devs.reduce((res, dev)=>res===true||dev._id===response.data._id))) // Evitar adicionar duplicatas
        setDevs([...devs, response.data]); // Spread para manter imutabilidade
    }

    async function handleEditDev(dev, data){
      const { github } = dev;
      const newDevs = devs.map(async dev => {
        if (dev.github===github){
            const response = await api.put(`devs/${github}`, data);
            if (response.data.modifiedCount > 0){
              const newDev = await api.get(`devs/${github}`);
              return newDev.data;
            }else 
              return dev;
        } else
            return dev;
      });
      (async () => {
        const resultado = await Promise.all(newDevs);
        setDevs(resultado);
      })();
    }

    async function handleDelDev(github) {
      await api.delete(`devs/${github}`);
      setDevs(devs.filter(dev=>dev.github!==github));
    }
  
    return (
      <div id="app">
        <aside>
          <strong>{editMode ? 'Editar':'Cadastrar'}</strong>
          <DevForm onAdd={handleAddDev} onEdit={handleEditDev} editModeState={editModeState}/>
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} onEdit={editModeState} onDelete={handleDelDev}/>
            ))}
          </ul>
        </main>
      </div>
    );
}

export default App;