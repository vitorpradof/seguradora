import { useState, useEffect } from 'react';

import { FaPen } from 'react-icons/fa';

import API from '../services/api';

function Clientes() {

  const [clientes, setClientes] = useState([]);

  useEffect (() => {
    getClientes();
  }, []);

  function getClientes() {
    API.get('/clientes').then((response) => {
      setClientes(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card card-primary card-outline card-outline-tabs" style={{padding: 15}}>
          {
            clientes.length ?
              <div className="table-responsive">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Localização</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      clientes.map(cliente => 
                        <tr key={cliente.id}>
                          <td style={{ verticalAlign: 'middle' }}>{cliente.nome.primeiroNome} {[...cliente.nome.sobrenomes]}</td>
                          <td style={{ verticalAlign: 'middle' }}>{cliente.cpf}</td>
                          <td style={{ verticalAlign: 'middle' }}>{cliente.cidade}/{cliente.uf}</td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <button className="btn btn-link"><FaPen size={14}/> Editar</button>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table> 
              </div>
            : <p>Ainda não existem clientes cadastrados.</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Clientes;