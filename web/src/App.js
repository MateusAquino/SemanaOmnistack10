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
  const [devs, setDevs] = useState([]);

  // Load devs
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/api/devs');

      setDevs(response.data.devs);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('api/devs', data);
    setDevs([...devs, response.data]); // Spread para manter imutabilidade
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;