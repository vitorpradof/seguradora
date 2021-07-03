import { useState, useEffect } from 'react';

import { Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, FormGroup, Input, Badge, InputGroup, InputGroupAddon } from 'reactstrap';
import { FaPen, FaPlus, FaExclamationCircle, FaTimes, FaSearch } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { toast } from 'react-toastify';
import moment from 'moment';

function Apolices() {

  const [iniciando, setIniciando] = useState(true);
  const [apolices, setApolices] = useState([]);
  const [novaApolice, setNovaApolice] = useState({ apoliceNumero: 0, placa: "", vigenciaInicio: "", vigenciaFim: "", valor: "" });
  const [apoliceSelecionada, setApoliceSelecionada] = useState({});
  const [filtroNumero, setFiltroNumero] = useState('');
  const [apolicesFiltroOn, setApolicesFiltroOn] = useState([]);
  const [exibirModalCriarApolice, setExibirModalCriarApolice] = useState(false);
  const [exibirModalEditarApolice, setExibirModalEditarApolice] = useState(false);
  const [exibirModalExcluirApolice, setExibirModalExcluirApolice] = useState(false);

  useEffect (() => {
    resetarApoliceSelecionada();
    getApolices();
  }, []);

  useEffect (() => {
    if (apolices.length) localStorage.setItem("apolices", JSON.stringify(apolices));
  }, [apolices]);

  function resetarApoliceSelecionada() {
    setApoliceSelecionada({ 
      apoliceNumero: 0,
      diasAteOVencimento: 0,
      id: "",
      placa: "",
      status: "",
      valor: 0,
      vigenciaFim: "",
      vigenciaInicio: ""
    });
  }

  function criarId() {
    let stringAleatoria = '',
        caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 24; i++) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return stringAleatoria;
  }

  function getApolices() {
    const auxApolices = localStorage.getItem("apolices");
    setApolices(auxApolices ? JSON.parse(auxApolices) : []);
    setIniciando(false);
  }

  function handleClickFiltrarNumero() {
    let auxApolices = [ ...apolices ];
    
    setApolicesFiltroOn(auxApolices);

    auxApolices = auxApolices.filter(apolice => { return apolice.apoliceNumero.indexOf(filtroNumero) >= 0 });

    setApolices(auxApolices);
  }

  function handleClickFecharFiltro() {
    setApolices([ ...apolicesFiltroOn ]);
    setApolicesFiltroOn([]);
    setFiltroNumero('');
  }

  function renderizarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  function renderizarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function calcularDiasDoVencimento(apolice) {
    let diferenca = moment(apolice.vigenciaFim, "YYYY/MM/DD").diff(moment(apolice.vigenciaInicio, "YYYY/MM/DD"));
    return moment.duration(diferenca).asDays();
  }

  function renderizarStatus(apolice) {
    return calcularDiasDoVencimento(apolice) > 0 ? "ABERTA" : "VENCIDA";
  }

  function handleClickFecharModalCadastrarApolice() {
    setExibirModalCriarApolice(false);
    setNovaApolice({ apoliceNumero: 0, placa: "", vigenciaInicio: "", vigenciaFim: "", valor: "" });
  }

  function handleClickFecharModalEditarApolice() {
    setExibirModalEditarApolice(false)
    resetarApoliceSelecionada();
  }

  function handleSubmitCadastrarApolice(e) {
    e.preventDefault();
    
    let auxApolice = { 
      id: criarId(),
      ...novaApolice,
      diasAteOVencimento: calcularDiasDoVencimento(novaApolice),
      status: renderizarStatus(novaApolice)
    };

    setApolices([ ...apolices, auxApolice ]);
    setNovaApolice({ apoliceNumero: 0, placa: "", vigenciaInicio: "", vigenciaFim: "", valor: "" });
    setExibirModalCriarApolice(false);
    toast.success("Apólice cadastrada com sucesso!");
  }

  function handleClickEditarApolice (apolice) {
    setApoliceSelecionada(apolice);
    setExibirModalEditarApolice(true);
  }

  function handleSubmitEditarApolice(e) {
    e.preventDefault();
    
    let auxApolices = [ ...apolices ],
        auxApolice = { 
          ...apoliceSelecionada,
          diasAteOVencimento: calcularDiasDoVencimento(apoliceSelecionada),
          status: renderizarStatus(apoliceSelecionada)
        };
    
    auxApolices = auxApolices.filter(c => { return c.id !== auxApolice.id });

    if (apolicesFiltroOn.length) {
      let auxApolicesFiltroOn = [ ...apolicesFiltroOn ];
      auxApolicesFiltroOn = auxApolicesFiltroOn.filter(c => { return c.id !== auxApolice.id });
      setApolicesFiltroOn([ ...auxApolicesFiltroOn, auxApolice ]);
    }

    setApolices([ ...auxApolices, auxApolice ]);
    resetarApoliceSelecionada();
    setExibirModalEditarApolice(false);
    toast.success("Apólice editada com sucesso!");
  }

  function handleClickExcluirApolice() {
    let auxApolices = [ ...apolices ];
    
    auxApolices = auxApolices.filter(c => { return c.id !== apoliceSelecionada.id });

    setApolices(auxApolices);
    setExibirModalExcluirApolice(false);
    setExibirModalEditarApolice(false);
    resetarApoliceSelecionada();
    toast.success("Apólice excluída com sucesso!");
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
              <Button type="button" color="success" style={{ marginBottom: 15 }} onClick={() => setExibirModalCriarApolice(true)}> <FaPlus size={12} /> Nova apolice</Button>
              { 
                apolices.length ?
                  <div>
                    <Row>
                      <Col xs="12" sm={{ size: 6, offset: 6 }} md={{ size: 3, offset: 9 }} lg={{ size: 2, offset: 10 }}>
                        <FormGroup>
                          <InputGroup>
                            <Input type="text" placeholder="Número" value={filtroNumero} onChange={(e) => setFiltroNumero(e.target.value)} />
                            {
                              apolicesFiltroOn.length ?
                                <InputGroupAddon addonType="append"><Button color="danger" onClick={() => handleClickFecharFiltro()}><FaTimes /></Button></InputGroupAddon>
                              : <InputGroupAddon addonType="append"><Button color="primary" onClick={() => handleClickFiltrarNumero()}><FaSearch /></Button></InputGroupAddon>

                            }
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
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
                              <td style={{ verticalAlign: 'middle' }}>{apolice.apoliceNumero}</td>
                              <td style={{ verticalAlign: 'middle' }}>{apolice.placa}</td>
                              <td style={{ verticalAlign: 'middle' }}>{renderizarData(apolice.vigenciaInicio)} até {renderizarData(apolice.vigenciaFim)}</td>
                              <td style={{ verticalAlign: 'middle' }}>{apolice.diasAteOVencimento} <Badge color={apolice.status === "VENCIDA" ? "danger" : "success"}>{apolice.status}</Badge></td>
                              <td style={{ verticalAlign: 'middle' }}>R${renderizarValor(apolice.valor)}</td>
                              <td style={{ verticalAlign: 'middle' }}>
                                <Button color="link" onClick={() => handleClickEditarApolice(apolice)}><FaPen size={14} /> Editar</Button>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </Table>
                  </div>
                : <p style={{ marginBottom: 0 }} className="d-flex align-items-center"> <FaExclamationCircle style={{ marginRight: 5 }} /> Ainda não existem apolices cadastradas.</p>
              }
            </div>
          }
        </div>
      </Col>
      <Modal isOpen={exibirModalCriarApolice}>
        <ModalHeader toggle={() => handleClickFecharModalCadastrarApolice()}>Nova apólice</ModalHeader>
        <Form onSubmit={handleSubmitCadastrarApolice}>
          <ModalBody>
            <Row>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="input-apoliceNumero"><span className="span-obrigatorio">*</span> Número</Label>
                  <Input type="number" id="input-apoliceNumero" value={novaApolice.apoliceNumero} onChange={e => setNovaApolice({ ...novaApolice, apoliceNumero: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="8">
                <FormGroup>
                  <Label for="input-placa"><span className="span-obrigatorio">*</span> Placa</Label>
                  <Input type="text" id="input-placa" value={novaApolice.placa} onChange={e => setNovaApolice({ ...novaApolice, placa: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-vigenciaInicio"><span className="span-obrigatorio">*</span> Início da vigência</Label>
                  <Input type="date" id="input-vigenciaInicio" value={novaApolice.vigenciaInicio} onChange={e => setNovaApolice({ ...novaApolice, vigenciaInicio: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-vigenciaFim"><span className="span-obrigatorio">*</span> Fim da vigência</Label>
                  <Input type="date" id="input-vigenciaFim" value={novaApolice.vigenciaFim} onChange={e => setNovaApolice({ ...novaApolice, vigenciaFim: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-valor"><span className="span-obrigatorio">*</span> Valor</Label>
                  <Input type="text" id="input-valor" value={novaApolice.valor} onChange={e => setNovaApolice({ ...novaApolice, valor: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="button" outline color="secondary" onClick={() => handleClickFecharModalCadastrarApolice()}>Cancelar</Button>{' '}
            <Button type="submit" color="success">Cadastrar</Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Modal isOpen={exibirModalEditarApolice}>
        <ModalHeader toggle={() => handleClickFecharModalEditarApolice()}>Editar apólice</ModalHeader>
        <Form onSubmit={handleSubmitEditarApolice}>
          <ModalBody>
            <Row>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="input-apoliceNumero"><span className="span-obrigatorio">*</span> Número</Label>
                  <Input type="number" id="input-apoliceNumero" value={apoliceSelecionada.apoliceNumero} onChange={e => setApoliceSelecionada({ ...apoliceSelecionada, apoliceNumero: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="8">
                <FormGroup>
                  <Label for="input-placa"><span className="span-obrigatorio">*</span> Placa</Label>
                  <Input type="text" id="input-placa" value={apoliceSelecionada.placa} onChange={e => setApoliceSelecionada({ ...apoliceSelecionada, placa: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-vigenciaInicio"><span className="span-obrigatorio">*</span> Início da vigência</Label>
                  <Input type="date" id="input-vigenciaInicio" value={apoliceSelecionada.vigenciaInicio} onChange={e => setApoliceSelecionada({ ...apoliceSelecionada, vigenciaInicio: e.target.value })} required />
                </FormGroup>
              </Col>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-vigenciaFim"><span className="span-obrigatorio">*</span> Fim da vigência</Label>
                  <Input type="date" id="input-vigenciaFim" value={apoliceSelecionada.vigenciaFim} onChange={e => setApoliceSelecionada({ ...apoliceSelecionada, vigenciaFim: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <Label for="input-valor"><span className="span-obrigatorio">*</span> Valor</Label>
                  <Input type="text" id="input-valor" value={apoliceSelecionada.valor} onChange={e => setApoliceSelecionada({ ...apoliceSelecionada, valor: e.target.value })} required />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <Button tyle="button" color="danger" onClick={() => setExibirModalExcluirApolice(true)}>Excluir</Button>
            <div>
              <Button type="button" outline color="secondary" onClick={() => handleClickFecharModalEditarApolice()}>Cancelar</Button>{' '}
              <Button type="submit" color="success">Editar</Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
      <Modal isOpen={exibirModalExcluirApolice}>
        <ModalHeader toggle={() => setExibirModalExcluirApolice(false)}>Excluir apólice</ModalHeader>
        <ModalBody>
          <p style={{ marginBottom: 0 }}>Você tem certeza que deseja excluir a apólice {apoliceSelecionada.apoliceNumero}? Cuidado, essa ação não poderá ser desfeita!</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button type="button" outline color="secondary" onClick={() => setExibirModalExcluirApolice(false)}>Cancelar</Button>{' '}
          <Button type="submit" color="danger" onClick={() => handleClickExcluirApolice()}>Excluir</Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
}

export default Apolices;