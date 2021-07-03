import { useState, useEffect } from 'react';

import { Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, FormGroup, Input } from 'reactstrap';
import { FaPen, FaPlus, FaExclamationCircle } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { toast } from 'react-toastify';

function Apolices() {

  const [iniciando, setIniciando] = useState(true);
  const [apolices, setApolices] = useState([]);

  useEffect (() => {
    getApolices();
  }, []);

  useEffect (() => {
    if (apolices.length) localStorage.setItem("apolices", JSON.stringify(apolices));
  }, [apolices]);

  function getApolices() {
    const auxApolices = localStorage.getItem("apolices");
    setApolices(auxApolices ? JSON.parse(auxApolices) : []);
    setIniciando(false);
  }

  function renderizarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  function renderizarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <Row>
      <Col sm={12}>
        <div className="card card-primary card-outline card-outline-tabs" style={{padding: 15}}>
          {
            iniciando ?
              <div className="d-flex justify-content-center align-items-center"><ImSpinner8 size={12} className="fa-spin" style={{ marginRight: 5 }}/> Carregando</div>
            : 
            <div>
              <Button type="button" color="success" style={{ marginBottom: 15 }}> <FaPlus size={12} /> Nova apolice</Button>
              { 
                apolices.length ?
                  <Table hover responsive striped size="sm">
                    <thead>
                      <tr>
                        <th>Apólice</th>
                        <th>Placa</th>
                        <th>Vigência</th>
                        <th>Dias até o vencimento</th>
                        <th>Valor</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        apolices.map(apolice => 
                          <tr key={apolice.id}>
                            <td style={{ verticalAlign: 'middle' }}>{apolice.numero}</td>
                            <td style={{ verticalAlign: 'middle' }}>{apolice.placa}</td>
                            <td style={{ verticalAlign: 'middle' }}>{renderizarData(apolice.vigenciaInicio)} até {renderizarData(apolice.vigenciaFim)}</td>
                            <td style={{ verticalAlign: 'middle' }}>{apolice.diasAteOVencimento}</td>
                            <td style={{ verticalAlign: 'middle' }}>{renderizarValor(apolice.valor)}</td>
                            <td style={{ verticalAlign: 'middle' }}>
                              <Button color="link"><FaPen size={14} /> Editar</Button>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table> 
                : <p style={{ marginBottom: 0 }} className="d-flex align-items-center"> <FaExclamationCircle style={{ marginRight: 5 }} /> Ainda não existem apolices cadastradas.</p>
              }
            </div>
          }
        </div>
      </Col>
    </Row>
  );
}

export default Apolices;