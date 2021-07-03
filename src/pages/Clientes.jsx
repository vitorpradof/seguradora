import { useState, useEffect } from 'react';

import { Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, FormGroup, Input } from 'reactstrap';
import { FaPen, FaPlus, FaExclamationCircle } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

function Clientes() {

  const [iniciando, setIniciando] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: "", sobrenome: "", cpf: "", cidade: "", uf: "" });
  const [exibirModalCriarCliente, setExibirModalCriarCliente] = useState(false);

  useEffect (() => {
    getClientes();
  }, []);

  useEffect (() => {
    if (clientes.length) localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  function criarId() {
    let stringAleatoria = '',
        caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 24; i++) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return stringAleatoria;
  }

  function getClientes() {
    const auxClientes = localStorage.getItem("clientes");
    setClientes(auxClientes ? JSON.parse(auxClientes) : []);
    setIniciando(false);
  }

  function handleSubmitCadastrarCliente(e) {
    e.preventDefault();
    
    let arraySobrenomes = novoCliente.sobrenome.split(" "),
        ultimoNome = arraySobrenomes[arraySobrenomes.lenght - 1],
        auxCliente = { 
          id: criarId(),
          ...novoCliente,
          nome: {
            primeiroNome: novoCliente.nome,
            sobrenomes: arraySobrenomes,
            ultimoNome
          } 
        };

    delete auxCliente.sobrenome;

    setClientes([ ...clientes, auxCliente ]);
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
              <Button type="button" color="success" style={{ marginBottom: 15 }} onClick={() => setExibirModalCriarCliente(true)}> <FaPlus size={12} /> Novo cliente</Button>
              { 
                clientes.length ?
                  <Table hover responsive striped size="sm">
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
                            <td style={{ verticalAlign: 'middle' }}>{cliente.nome.primeiroNome} {cliente.nome.ultimoNome}</td>
                            <td style={{ verticalAlign: 'middle' }}>{cliente.cpf}</td>
                            <td style={{ verticalAlign: 'middle' }}>{cliente.cidade}/{cliente.uf}</td>
                            <td style={{ verticalAlign: 'middle' }}>
                              <Button color="link"><FaPen size={14}/> Editar</Button>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table> 
                : <p style={{ marginBottom: 0 }} className="d-flex align-items-center"> <FaExclamationCircle style={{ marginRight: 5 }} /> Ainda não existem clientes cadastrados.</p>
              }
            </div>
          }
        </div>
      </Col>
      <Modal isOpen={exibirModalCriarCliente}>
        <ModalHeader toggle={() => setExibirModalCriarCliente(false)}>Novo cliente</ModalHeader>
        <Form onSubmit={handleSubmitCadastrarCliente}>
          <ModalBody>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-nome"><span className="span-obrigatorio">*</span> Nome</Label>
                  <Input type="text" id="input-nome" value={novoCliente.nome} onChange={e => setNovoCliente({ ...novoCliente, nome: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-sobrenome"><span className="span-obrigatorio">*</span> Sobrenome</Label>
                  <Input type="text" id="input-sobrenome" value={novoCliente.sobrenome} onChange={e => setNovoCliente({ ...novoCliente, sobrenome: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="8">
                <FormGroup>
                  <Label for="input-cidade"><span className="span-obrigatorio">*</span> Cidade</Label>
                  <Input type="text" id="input-cidade" value={novoCliente.cidade} onChange={e => setNovoCliente({ ...novoCliente, cidade: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="input-uf"><span className="span-obrigatorio">*</span> Estado</Label>
                  <Input type="text" id="input-uf" value={novoCliente.uf} onChange={e => setNovoCliente({ ...novoCliente, uf: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="input-cpf"><span className="span-obrigatorio">*</span> CPF</Label>
                  <Input type="text" id="input-cpf" value={novoCliente.cpf} onChange={e => setNovoCliente({ ...novoCliente, cpf: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="button" outline color="secondary" onClick={() => setExibirModalCriarCliente(false)}>Cancelar</Button>{' '}
            <Button type="submit" color="success">Cadastrar</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Row>
  );
}

export default Clientes;