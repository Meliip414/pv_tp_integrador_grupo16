import { Container, Row, Col, Badge } from 'react-bootstrap';
import Navegacion from "../components/layout/Nav";

const Clientes = () => {
    return (
        <Container className="mt-4">

            <h2>
                <Badge bg="success">Clientes</Badge>
            </h2>
            <h5>
                Bienvenido al área de clientes,
            </h5>
            <Navegacion />

        </Container >
    );
};

export default Clientes;