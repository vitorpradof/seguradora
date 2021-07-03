import { useState, useEffect } from 'react';

import { Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { FaPen, FaPlus, FaExclamationCircle, FaSearch, FaTimes } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { toast } from 'react-toastify';

function Clientes() {

  const [iniciando, setIniciando] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [filtroCPF, setFiltroCPF] = useState('');
  const [clientesFiltroOn, setClientesFiltroOn] = useState([]);
  const [exibirModalCriarCliente, setExibirModalCriarCliente] = useState(false);
  const [exibirModalEditarCliente, setExibirModalEditarCliente] = useState(false);
  const [exibirModalExcluirCliente, setExibirModalExcluirCliente] = useState(false);

  useEffect (() => {
    resetarClienteSelecionado();
    getClientes();
  }, []);

  useEffect (() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  function resetarClienteSelecionado() {
    setClienteSelecionado({ nome: "", sobrenomes: "", cpf: "", cidade: "", uf: "" });
  }

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

  function handleClickFiltrarCpf() {
    let auxClientes = [ ...clientes ];
    
    setClientesFiltroOn(auxClientes);

    auxClientes = auxClientes.filter(cliente => { return cliente.cpf.indexOf(filtroCPF) >= 0 });

    setClientes(auxClientes);
  }

  function handleClickFecharFiltro() {
    setClientes([ ...clientesFiltroOn ]);
    setClientesFiltroOn([]);
    setFiltroCPF('');
  }

  function handleClickFecharModalCadastrarCliente() {
    setExibirModalCriarCliente(false)
    resetarClienteSelecionado();
  }

  function handleClickFecharModalEditarCliente() {
    setExibirModalEditarCliente(false)
    resetarClienteSelecionado();
  }

  function handleSubmitCadastrarCliente(e) {
    e.preventDefault();
    
    let arraySobrenomes = clienteSelecionado.sobrenomes.split(" "),
        ultimoNome = arraySobrenomes[arraySobrenomes.length - 1],
        auxCliente = { 
          id: criarId(),
          ...clienteSelecionado,
          nome: {
            primeiroNome: clienteSelecionado.nome,
            sobrenomes: arraySobrenomes,
            ultimoNome
          } 
        };

    delete auxCliente.sobrenomes;

    setClientes([ ...clientes, auxCliente ]);
    resetarClienteSelecionado();
    setExibirModalCriarCliente(false);
    toast.success("Cliente cadastrado com sucesso!");
  }

  function handleClickEditarCliente (cliente) {
    let auxCliente = { ...cliente };

    auxCliente.nome = cliente.nome.primeiroNome;
    auxCliente.sobrenomes = "";

    cliente.nome.sobrenomes.map((sobrenome, i) => {
      if (i > 0) auxCliente.sobrenomes += " ";
      auxCliente.sobrenomes += sobrenome;
    });

    setClienteSelecionado(auxCliente);
    setExibirModalEditarCliente(true);
  }

  function handleSubmitEditarCliente(e) {
    e.preventDefault();
    
    let arraySobrenomes = clienteSelecionado.sobrenomes.split(" "),
        ultimoNome = arraySobrenomes[arraySobrenomes.length - 1],
        auxCliente = { 
          ...clienteSelecionado,
          nome: {
            primeiroNome: clienteSelecionado.nome,
            sobrenomes: arraySobrenomes,
            ultimoNome
          } 
        },
        auxClientes = [ ...clientes ];
    
    auxClientes = auxClientes.filter(c => { return c.id !== auxCliente.id });

    delete auxCliente.sobrenomes;

    if (clientesFiltroOn.length) {
      let auxClientesFiltroOn = [ ...clientesFiltroOn ];
      auxClientesFiltroOn = auxClientesFiltroOn.filter(c => { return c.id !== auxCliente.id });
      setClientesFiltroOn([ ...auxClientesFiltroOn, auxCliente ]);
    }

    setClientes([ ...auxClientes, auxCliente ]);
    resetarClienteSelecionado();
    setExibirModalEditarCliente(false);
    toast.success("Cliente editado com sucesso!");
  }

  function handleClickExcluirCliente() {
    let auxClientes = [ ...clientes ];
    
    auxClientes = auxClientes.filter(c => { return c.id !== clienteSelecionado.id });

    if (clientesFiltroOn.length) {
      let auxClientesFiltroOn = [ ...clientesFiltroOn ];
      auxClientesFiltroOn = auxClientesFiltroOn.filter(c => { return c.id !== clienteSelecionado.id });
      setClientesFiltroOn([ ...auxClientesFiltroOn ]);
    }

    setClientes(auxClientes);
    setExibirModalExcluirCliente(false);
    setExibirModalEditarCliente(false);
    resetarClienteSelecionado();
    toast.success("Cliente excluído com sucesso!");
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
              <Row>
                <Col xs="12" sm={{ size: 6, offset: 6 }} md={{ size: 3, offset: 9 }} lg={{ size: 2, offset: 10 }}>
                  <FormGroup>
                    <InputGroup>
                      <Input type="text" placeholder="CPF" value={filtroCPF} onChange={(e) => setFiltroCPF(e.target.value)} />
                      {
                        clientesFiltroOn.length ?
                          <InputGroupAddon addonType="append"><Button color="danger" onClick={() => handleClickFecharFiltro()}><FaTimes /></Button></InputGroupAddon>
                        : <InputGroupAddon addonType="append"><Button color="primary" onClick={() => handleClickFiltrarCpf()}><FaSearch /></Button></InputGroupAddon>
                      }
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              { 
                clientes.length ?
                  <Table hover responsive striped>
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
                              <Button color="link" onClick={() => handleClickEditarCliente(cliente)}><FaPen size={14} /> Editar</Button>
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
        <ModalHeader toggle={() => handleClickFecharModalCadastrarCliente()}>Novo cliente</ModalHeader>
        <Form onSubmit={handleSubmitCadastrarCliente}>
          <ModalBody>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-nome"><span className="span-obrigatorio">*</span> Nome</Label>
                  <Input type="text" id="input-nome" value={clienteSelecionado.nome} onChange={e => setClienteSelecionado({ ...clienteSelecionado, nome: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-sobrenomes"><span className="span-obrigatorio">*</span> Sobrenome</Label>
                  <Input type="text" id="input-sobrenomes" value={clienteSelecionado.sobrenomes} onChange={e => setClienteSelecionado({ ...clienteSelecionado, sobrenomes: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="8">
                <FormGroup>
                  <Label for="input-cidade"><span className="span-obrigatorio">*</span> Cidade</Label>
                  <Input type="text" id="input-cidade" value={clienteSelecionado.cidade} onChange={e => setClienteSelecionado({ ...clienteSelecionado, cidade: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="input-uf"><span className="span-obrigatorio">*</span> Estado</Label>
                  <Input type="text" id="input-uf" value={clienteSelecionado.uf} onChange={e => setClienteSelecionado({ ...clienteSelecionado, uf: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="input-cpf"><span className="span-obrigatorio">*</span> CPF</Label>
                  <Input type="text" id="input-cpf" value={clienteSelecionado.cpf} onChange={e => setClienteSelecionado({ ...clienteSelecionado, cpf: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="button" outline color="secondary" onClick={() => handleClickFecharModalCadastrarCliente()}>Cancelar</Button>{' '}
            <Button type="submit" color="success">Cadastrar</Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Modal isOpen={exibirModalEditarCliente}>
        <ModalHeader toggle={() => handleClickFecharModalEditarCliente()}>Editar cliente</ModalHeader>
        <Form onSubmit={handleSubmitEditarCliente}>
          <ModalBody>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-nome"><span className="span-obrigatorio">*</span> Nome</Label>
                  <Input type="text" id="input-nome" value={clienteSelecionado.nome} onChange={e => setClienteSelecionado({ ...clienteSelecionado, nome: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-sobrenomes"><span className="span-obrigatorio">*</span> Sobrenome</Label>
                  <Input type="text" id="input-sobrenomes" value={clienteSelecionado.sobrenomes} onChange={e => setClienteSelecionado({ ...clienteSelecionado, sobrenomes: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="8">
                <FormGroup>
                  <Label for="input-cidade"><span className="span-obrigatorio">*</span> Cidade</Label>
                  <Input type="text" id="input-cidade" value={clienteSelecionado.cidade} onChange={e => setClienteSelecionado({ ...clienteSelecionado, cidade: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="input-uf"><span className="span-obrigatorio">*</span> Estado</Label>
                  <Input type="text" id="input-uf" value={clienteSelecionado.uf} onChange={e => setClienteSelecionado({ ...clienteSelecionado, uf: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="input-cpf"><span className="span-obrigatorio">*</span> CPF</Label>
                  <Input type="text" id="input-cpf" value={clienteSelecionado.cpf} onChange={e => setClienteSelecionado({ ...clienteSelecionado, cpf: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <Button tyle="button" color="danger" onClick={() => setExibirModalExcluirCliente(true)}>Excluir</Button>
            <div>
              <Button type="button" outline color="secondary" onClick={() => handleClickFecharModalEditarCliente()}>Cancelar</Button>{' '}
              <Button type="submit" color="success">Editar</Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
      <Modal isOpen={exibirModalExcluirCliente}>
        <ModalHeader toggle={() => setExibirModalExcluirCliente(false)}>Excluir cliente</ModalHeader>
        <ModalBody>
          <p style={{ marginBottom: 0 }}>Você tem certeza que deseja excluir o cliente {clienteSelecionado.nome} {clienteSelecionado.sobrenomes}? Cuidado, essa ação não poderá ser desfeita!</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button type="button" outline color="secondary" onClick={() => setExibirModalExcluirCliente(false)}>Cancelar</Button>{' '}
          <Button type="submit" color="danger" onClick={() => handleClickExcluirCliente()}>Excluir</Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
}

export default Clientes;