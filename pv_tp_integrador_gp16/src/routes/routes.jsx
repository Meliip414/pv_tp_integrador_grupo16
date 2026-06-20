import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import App from "../App";
import Clientes from "../views/Clientes";
import RutaProtegida from '../components/RutaProtegida';



const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1>404 NOT FOUND</h1>,
        children: [
            { index: true, element: <Login /> },
            children: [
                {
                path:'Clientes',
              {  element: (<RutaProtegida><Clientes /></RutaProtegida>)},
            ]
 ] },
        
            
        
    
]);

export default routes;