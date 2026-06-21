import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <Container>
      <Header />
      <main>
        <Outlet />
      </main>
    </Container>
  );

};

export default App;