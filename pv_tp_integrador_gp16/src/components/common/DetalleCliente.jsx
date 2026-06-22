import { Card, Alert, Spinner, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetalleCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDetalle = async () => {
            try {
                setLoading(true);
                setError(null);
                const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
                
                if (!respuesta.ok) {
                    throw new Error('No se pudo obtener la información.');
                }
                
                const datos = await respuesta.json();
                setCliente(datos);
            } catch (err) {
                setError(err.message || 'Hubo un problema de conexión.');
            } finally {
                setLoading(false);
            }
        };

        obtenerDetalle();
    }, [id]);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" variant="primary" size="sm" />
                <p className="mt-2 text-muted small">Cargando detalles...</p>
            </div>
        );
    }

    if (error || !cliente) {
        return (
            <div className="p-3">
                <Alert variant="danger" className="small">
                    {error || 'Usuario no encontrado.'}
                </Alert>
                <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
                    Cerrar
                </Button>
            </div>
        );
    }

    return (
    <Card className="border-0 bg-light p-3" style={{ minWidth: '280px' }}>
        <Card.Body className="p-2">
            <p className="mb-2"><strong>ID:</strong> {cliente.id}</p>
            <p className="mb-2"><strong>Nombre:</strong> {cliente.name?.firstname}</p>
            <p className="mb-2"><strong>Apellido:</strong> {cliente.name?.lastname}</p>
            <p className="mb-2"><strong>Email:</strong> {cliente.email}</p>
            <p className="mb-2"><strong>Teléfono:</strong> {cliente.phone}</p>
            
            <p className="mb-2"><strong>Ciudad:</strong> {cliente.address?.city}</p>
            <p className="mb-2"><strong>Calle:</strong> {cliente.address?.street}</p>
            <p className="mb-2"><strong>Número:</strong> {cliente.address?.number}</p>
            <p className="mb-3"><strong>Código Postal:</strong> {cliente.address?.zipcode}</p>

            <p className="mb-3"><strong>Contraseña:</strong> {cliente.password ? cliente.password.replace(/./g, '*') : ''}</p>


            <Button
                variant="outline-secondary"
                size="sm"
                type="button"
                onClick={() => navigate(-1)}
            >
                Cerrar
            </Button>
        </Card.Body>
    </Card>
    );

};

export default DetalleCliente;
