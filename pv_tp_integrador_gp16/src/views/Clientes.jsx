import { Container, Row, Col, Badge, Spinner, Alert, Form } from 'react-bootstrap';
import Navegacion from "../components/layout/Nav";
import ListaClientes from '../components/common/ListaClientes';
import { useEffect, useState } from 'react';
import clientesService from '../services/clientesService';
import FormCliente from '../components/common/FormCliente';
import RegistroActividad from '../components/common/RegistroActividad';
import { useNavigate } from 'react-router-dom';

const Clientes = () => {
     const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
     const [mensajeActividad, setMensajeActividad] = useState("");
    const [actualizacion, setActualizacion] = useState(null);
    const navigate = useNavigate();
    
  const cargarClientes = async () => {
            try {
                setLoading(true);
                setError(null);

                const datos = await clientesService.listarTodosClientes();
                setClientes(datos);

            } catch (error) {
                setError("Error al cargar clientes");
            } finally {
                setLoading(false);
            }
        };
    useEffect(() => {
   
        cargarClientes();

    }, []);

    const buscarCliente = (texto) => {
        setBusqueda(texto);
    };

    const verDetalle = (id) => {
    navigate('/clientes/' + id);
};
   

      const registrarActividad = (mensaje) => {
        setMensajeActividad(mensaje);
        setActualizacion(new Date());
    };

    const manejarClienteCreado = (clienteCreado) => {
        registrarActividad(`Cliente ${clienteCreado.name.firstname} ${clienteCreado.name.lastname} agregado correctamente`);
        cargarClientes();};

    const clientesFiltrados = clientes.filter((cliente) => (
        cliente.name.lastname.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.address.city.toLowerCase().includes(busqueda.toLowerCase())
    ));

    return (
        <Container className="mt-4">
            <h2>
                <Badge bg="success">Clientes</Badge>
            </h2>
            <h5>
                Bienvenido al área de clientes,
            </h5>
              <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por apellido o ciudad"
                        value={busqueda}
                        onChange={(e) => buscarCliente(e.target.value)}
                    />
                </Col>
            </Row>
                <FormCliente onClienteCreado={manejarClienteCreado} />
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {loading ? (
                <div className="text-center my-4">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <ListaClientes
                    clientes={clientesFiltrados}
                    verDetalle={verDetalle}
                />
            )}
            <RegistroActividad
                actualizacion={actualizacion}
                mensajeActividad={mensajeActividad}
            />

            {/* falta detalle */}

        </Container>
    );
};
export default Clientes;