import './style.css';
import { FiAlertTriangle, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

import apiViaCep from './services/api.js';

function App() {

  const [cep, setCep] = useState('');

  const [dadosApiCep, setDadosApiCep] = useState({});

  async function SearchCep() {
    if (cep === '') {
      alert('Preencha algum cep para pesquisar!');
      return;
    }

    try {
      const response = await apiViaCep.get(cep + '/json');
      setDadosApiCep(response.data);
    } catch {
      alert('Ocorreu um erro ao buscar o cep...');
    }

  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Busca CEP</h1>
        <div className="div-inputs">
          <input
            type="text"
            placeholder="Digite aqui um cep..."
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button className='btn-search' onClick={SearchCep}><FiSearch size={15} /></button>
        </div>
        {Object.keys(dadosApiCep).length > 0 && (
          <div className='data-adress'>
            <span> {dadosApiCep.bairro} </span>
            <span> {dadosApiCep.logradouro} </span>
            <span> {dadosApiCep.localidade}, {dadosApiCep.uf} </span>
          </div>
        )}


      </div>

    </div>
  );
}

export default App;
