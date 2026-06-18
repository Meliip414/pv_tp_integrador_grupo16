import { Container, Form, Button, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import { AdminContext } from '../context/AdminContext';

const Login = () => {
    const { guardarSesion } = useContext(AdminContext);

    const [admin, setAdmin] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [erroresAtributo, setErroresAtributo] = useState({});

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        if (name === 'admin') {
            setAdmin(value);
        }

        if (name === 'rol') {
            setRol(value);
        }

        if (erroresAtributo[name]) {
            setErroresAtributo(prev => ({ ...prev, [name]: null }));
        }
    };

    const ValidarFormulario = ({admin, rol}) => {
        const errores = {};

        if (!admin.trim()){
            errores.admin = "Es obligatorio ingresar su nombre";
        } 

        if (!rol.trim()){
            errores.rol = "Es obligatorio seleccionar un rol";
        }

        return errores;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const errores = ValidarFormulario({admin, rol});
        if (Object.keys(errores).length > 0) {
            setErroresAtributo(errores);
            return;
        }

        setLoading(true);
        
        try {
            const encontrado = await adminService.login(admin, rol);
            guardarSesion(encontrado);
            navigate('/inicio');
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);

        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <h2>Iniciar Sesion</h2>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                name="admin"
                                value={admin}
                                onChange={manejarCambio}
                            />
                            {erroresAtributo.admin && (
                                <p style={{color: 'red', fontSize: '0.875em'}}>
                                    {erroresAtributo.admin}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                name="rol"
                                value={rol}
                                onChange={manejarCambio}
                            >
                                <option value="">Seleccione un rol</option>
                                <option value="Soporte">Soporte</option>
                                <option value="Gerencia">Gerencia</option>
                            </Form.Select>
                            {erroresAtributo.rol && (
                                <p style={{color: 'red', fontSize: '0.875em'}}>
                                    {erroresAtributo.rol}
                                </p>
                            )}
                        </Form.Group>
                        <Button
                            type="submit"
                        >
                            Ingresar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;