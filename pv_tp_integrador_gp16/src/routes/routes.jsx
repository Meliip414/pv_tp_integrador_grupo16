import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import App from "../App";
import Clientes from "../views/Clientes";
import RutaProtegida from '../components/RutaProtegida';
import DetalleCliente from "../components/common/DetalleCliente";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1>404 NOT FOUND</h1>,
        children: [
            { index: true, element: <Login /> },
            {
                path: 'Clientes',
                element: (<RutaProtegida><Clientes /></RutaProtegida>),
                children: [
                    { path: ':id', element: <DetalleCliente /> },
                ],
            },
        ],
    },




]);

export default routes;