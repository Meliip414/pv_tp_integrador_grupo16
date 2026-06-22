import { Container, Row, Col, Badge, Spinner, Alert, Form } from 'react-bootstrap';
import Navegacion from "../components/layout/Nav";
import ListaClientes from '../components/common/ListaClientes';
import { useEffect, useState } from 'react';
import clientesService from '../services/clientesService';
import FormCliente from '../components/common/FormCliente';
import RegistroActividad from '../components/common/RegistroActividad';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const Clientes = () => {
    const { adminActivo } = useContext(AdminContext);
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

            const clientesLocales =
                JSON.parse(localStorage.getItem("clientesAgregados")) || [];

            const eliminados =
                JSON.parse(localStorage.getItem("clientesEliminados")) || [];

            const clientesApiFiltrados =
                datos.filter(cliente => !eliminados.includes(cliente.id));
            setClientes([
                ...clientesApiFiltrados,
                ...clientesLocales
            ]);

        } catch (error) {
            setError("Error al cargar clientes");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        cargarClientes();

    }, []);

    const borrarCliente = async (cliente) => {

        try {

            await clientesService.eliminarClientes(cliente.id);

            setClientes(
                clientes.filter(c => c.id !== cliente.id)
            );

            const eliminados =
                JSON.parse(localStorage.getItem("clientesEliminados")) || [];

            localStorage.setItem(
                "clientesEliminados",
                JSON.stringify([
                    ...eliminados,
                    cliente.id
                ])
            );

            const clientesLocales =
                JSON.parse(localStorage.getItem("clientesAgregados")) || [];

            const clientesLocalesActualizados =
                clientesLocales.filter(c => c.id !== cliente.id);

            localStorage.setItem(
                "clientesAgregados",
                JSON.stringify(clientesLocalesActualizados)
            );

            registrarActividad(
                `Cliente ${cliente.name.firstname} ${cliente.name.lastname} eliminado correctamente`
            );

        } catch (error) {

            setError(error.message);

        }

    };

    const buscarCliente = (texto) => {
        setBusqueda(texto);
    };

    const verDetalle = (id) => {
        console.log("Navegando a:", id);
        navigate('/clientes/' + id);
    };


    const registrarActividad = (mensaje) => {
        setMensajeActividad(mensaje);
        setActualizacion(new Date());
    };

    const manejarClienteCreado = (clienteCreado) => {

        setClientes(prev => [
            ...prev,
            clienteCreado
        ]);

        const clientesLocales =
            JSON.parse(localStorage.getItem("clientesAgregados")) || [];

        localStorage.setItem(
            "clientesAgregados",
            JSON.stringify([
                ...clientesLocales,
                clienteCreado
            ])
        );

        registrarActividad(
            "Cliente agregado correctamente"
        );
    };

    const clientesFiltrados = clientes.filter((cliente) => (
        cliente.name.lastname.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.address.city.toLowerCase().includes(busqueda.toLowerCase())
    ));

    return (
        <Container className="mt-4">
            <Navegacion />
            <h2>
                <Badge bg="success">Clientes</Badge>
            </h2>
            <h5>
                Bienvenido al área de clientes,
            </h5>
            <FormCliente onClienteCreado={manejarClienteCreado} />
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
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

            {loading ? (
                <div className="text-center my-4">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <ListaClientes
                    clientes={clientesFiltrados}
                    verDetalle={verDetalle}
                    borrarCliente={borrarCliente}
                    esGerente={adminActivo?.sector === "Gerencia"}
                />
            )}
            <RegistroActividad
                actualizacion={actualizacion}
                mensajeActividad={mensajeActividad}
            />



        </Container>
    );
};
export default Clientes;