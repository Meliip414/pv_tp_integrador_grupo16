import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const FormCliente = ({ onClienteCreado }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ciudad, setCiudad] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);
    const [erroresAtributo, setErroresAtributo] = useState({});

    useEffect(() => {
        if (!exito) return;

        const timer = window.setTimeout(() => {
            setExito(null);
        }, 3000);

        return () => window.clearTimeout(timer);
    }, [exito]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre') setNombre(value);
        if (name === 'apellido') setApellido(value);
        if (name === 'email') setEmail(value);
        if (name === 'telefono') setTelefono(value);
        if (name === 'ciudad') setCiudad(value);


        if (erroresAtributo[name]) {
            setErroresAtributo(prev => ({ ...prev, [name]: null }));
        }
    };

    const ValidarFormulario = () => {
        const errores = {};

        if (!nombre.trim()) errores.nombre = "Es obligatorio ingresar su nombre";
        if (!apellido.trim()) errores.apellido = "Es obligatorio ingresar su apellido";
        if (!email.trim()) errores.email = "Es obligatorio ingresar su email";
        if (!telefono.trim()) {
            errores.telefono = "Es obligatorio ingresar su teléfono";
        } else if (telefono.length < 10) {
            errores.telefono = "El número de teléfono debe tener al menos 10 dígitos";
        }
        if (!ciudad.trim()) errores.ciudad = "Es obligatorio ingresar su ciudad";


        return errores;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setExito(null);

        const errores = ValidarFormulario();
        if (Object.keys(errores).length > 0) {
            setErroresAtributo(errores);
            return;
        }

        setLoading(true);

        try {

            const nuevoCliente = {
                email: email,
                username: nombre.toLowerCase(),
                password: 'mypassword123',
                name: {
                    firstname: nombre,
                    lastname: apellido
                },
                address: {
                    city: ciudad,
                    street: 'Calle Falsa',
                    number: 123,
                    zipcode: '12345',
                    geolocation: { lat: '-37.3159', long: '81.1496' }
                },
                phone: telefono
            };

            const respuesta = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoCliente)
            });

            const datosDevueltos = await respuesta.json();
            if (respuesta.ok) {

                setExito(`Cliente creado con éxito. ID: ${datosDevueltos.id}`);

                const clientesLocales =
                    JSON.parse(localStorage.getItem("clientesAgregados")) || [];

                const maxIdApi = 10; // FakeStoreAPI tiene usuarios del 1 al 10

                const maxIdLocal =
                    clientesLocales.length > 0
                        ? Math.max(...clientesLocales.map(c => c.id))
                        : maxIdApi;

                const nuevoId = maxIdLocal + 1;
                onClienteCreado({
                    ...nuevoCliente,
                    id: datosDevueltos.id
                });

                setNombre('');
                setApellido('');
                setEmail('');
                setTelefono('');
                setCiudad('');
            }

        } catch (err) {
            setError("Hubo un problema al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <h2>Registrar Nuevo Cliente</h2>

                    {exito && (
                        <Alert variant="success" className="mt-3" role="alert">
                            {exito}
                        </Alert>
                    )}

                    {error && (

                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={manejarCambio}
                            />
                            {erroresAtributo.nombre && (
                                <p style={{ color: 'red', fontSize: '0.875em' }}>
                                    {erroresAtributo.nombre}
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                value={apellido}
                                onChange={manejarCambio}
                            />
                            {erroresAtributo.apellido && (
                                <p style={{ color: 'red', fontSize: '0.875em' }}>
                                    {erroresAtributo.apellido}
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={manejarCambio}
                            />
                            {erroresAtributo.email && (
                                <p style={{ color: 'red', fontSize: '0.875em' }}>
                                    {erroresAtributo.email}
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="number"
                                name="telefono"
                                value={telefono}
                                onChange={manejarCambio}
                            />
                            {erroresAtributo.telefono && (
                                <p style={{ color: 'red', fontSize: '0.875em' }}>
                                    {erroresAtributo.telefono}
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                type="text"
                                name="ciudad"
                                value={ciudad}
                                onChange={manejarCambio}
                            />
                            {erroresAtributo.ciudad && (
                                <p style={{ color: 'red', fontSize: '0.875em' }}>
                                    {erroresAtributo.ciudad}
                                </p>
                            )}
                        </Form.Group>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cliente'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );

};

export default FormCliente;
