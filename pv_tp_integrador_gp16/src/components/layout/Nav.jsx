import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hook/useAdmin';



function Navegacion() {
   const { cerrarSesion } = useAdmin();
  const navigate = useNavigate();

  const logout = () => {
    cerrarSesion();
    navigate('/');
  };
  return (
    <Navbar expand="lg" bg="light">
      <Container>

        <Navbar.Brand as={Link} to="/">
          Corporación Acme
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link
              as={Link}
              to="/"
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/clientes"
            >
              Clientes
            </Nav.Link>

             <Nav.Link
              onClick={logout}>
             Cerrar Sesión

             </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Navegacion;