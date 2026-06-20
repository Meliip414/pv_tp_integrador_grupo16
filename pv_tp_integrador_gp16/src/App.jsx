import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navegacion from "./components/layout/Nav";
const App = () => {
  return (
    <Container>
      <header className="mt-3">
        <h1>trabajo final</h1>
      </header>

      <Navegacion />

            <main>
                <Outlet />
            </main>
        </Container>
    );

};

export default App;