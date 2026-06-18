import { Container, Row, Col, Badge } from 'react-bootstrap';
import Login from '../components/Login';

const Inicio = () => {
    return (
        <Container className="mt-4">

            <h2>
                <Badge bg="success">Inicio</Badge>
            </h2>
            <h5>
                Bienvenido al área de inicio, por favor ingrese su nombre y sector en la empresa 
            </h5>

            <Row>
                <Row>
                    <Col md={6}>
                        <FormAdmin />
                    </Col>
                </Row>
            </Row>

        </Container >
    );
};

export default Inicio;