import { Navigate } from 'react-router-dom';
import { useAdmin } from '../hook/useAdmin';

const RutaProtegida = ({ children }) => {
    const { adminActivo } = useAdmin();

    if (!adminActivo) return <Navigate to="/" replace />;

    return children;
};

export default RutaProtegida;