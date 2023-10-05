import '../css/menu.css';
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default function Menu() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const mostrarCadastroRestaurante = localStorage.getItem('logginType') === 'RESTAURANTE';
  const mostrarCadastroCliente = localStorage.getItem('logginType') === 'CLIENTE';

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="menu">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="home" id="brand-name" className="details-menu-color">YOUHUNGRY - HOME</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {mostrarCadastroRestaurante && (
                <Nav.Link href="crestaurante" className="detail-menu">Cadastro Restaurante</Nav.Link>
                )}
              {mostrarCadastroRestaurante && (
                <Nav.Link href="cpratos" className="detail-menu">Cadastro Pratos</Nav.Link>
              )}
              
              {mostrarCadastroRestaurante && (
                <Nav.Link href="cusuario" className="detail-menu">Cadastro Usuário</Nav.Link>
              )}

              {mostrarCadastroCliente && (    
                <Nav.Link href="fpedido" className="detail-menu">Fazer Pedido</Nav.Link>
                )}  

            </Nav>
            <Nav>
              <Nav.Link href="login" className="detail-menu">Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
