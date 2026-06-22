import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../views/Login";
import Clientes from "../views/Clientes";

import RutaProtegida from "../components/RutaProtegida";
import DetalleCliente from "../components/common/DetalleCliente";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 NOT FOUND</h1>,
    children: [
      {
        index: true,
        element: <Login />
      },

      {
        path: "clientes",
        element: (
          <RutaProtegida>
            <Clientes />
          </RutaProtegida>
        )
      },

      {
        path: "clientes/:id",
        element: (
          <RutaProtegida>
            <DetalleCliente />
          </RutaProtegida>
        )
      }
    ]
  }
]);

export default routes;