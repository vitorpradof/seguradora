import { useState, useEffect } from 'react';

import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';

function Inicio() {

  const [clientes, setClientes] = useState([]);
  const [apolices, setApolices] = useState([]);
  const [statusApolices, setStatusApolices] = useState({ abertas: 0, vencidas: 0 });

  useEffect(() => {
    let auxClientes = JSON.parse(localStorage.getItem("clientes")),
        auxApolices = JSON.parse(localStorage.getItem("apolices")),
        auxStatusApolices = { abertas: 0, vencidas: 0 };

    auxApolices.map(a => {
      if (a.diasAteOVencimento > 0) auxStatusApolices.abertas++;
      else auxStatusApolices.vencidas++;
      return 0;
    });

    setClientes(auxClientes ? auxClientes : []);
    setApolices(auxApolices ? auxApolices : []);
    setStatusApolices(auxStatusApolices);

  }, []);

  return (
    <>
      <p>Clientes</p>
      <Row>
        <Col sm="6" md="3">
          <Card style={{ padding: 15 }}>
            <CardTitle>{clientes.length}</CardTitle>
            <CardText>Clientes cadastrados</CardText>
          </Card>
        </Col>
      </Row>
      <p>Apólices</p>
      <Row>
        <Col sm="6" md="3">
          <Card style={{ padding: 15 }}>
            <CardTitle>{apolices.length}</CardTitle>
            <CardText>Apólices cadastradas</CardText>
          </Card>
        </Col>
        <Col sm="6" md="3">
          <Card style={{ padding: 15 }}>
            <CardTitle>{statusApolices.abertas}</CardTitle>
            <CardText>Apólices abertas</CardText>
          </Card>
        </Col>
        <Col sm="6" md="3">
          <Card style={{ padding: 15 }}>
            <CardTitle>{statusApolices.vencidas}</CardTitle>
            <CardText>Apólices vencidas</CardText>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Inicio;