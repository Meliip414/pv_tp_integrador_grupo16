import Alert from 'react-bootstrap/Alert';

const RegistroActividad = ({ actualizacion, mensajeActividad }) => {
    if (actualizacion === null && mensajeActividad === "") {
        return null;
    }

    const dia = actualizacion?.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const hora = actualizacion?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <Alert variant="info">
            {mensajeActividad && (
                <div>{mensajeActividad}</div>
            )}

            {actualizacion && (
                <div>
                    Última actualización de la lista: {dia} a las {hora} hs.
                </div>
            )}
        </Alert>
    );
};

export default RegistroActividad;