import '../css/menu.css';
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'


export default function Menu() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const mostrarCadastroRestaurante = localStorage.getItem('logginType') === 'RESTAURANTE';
  const mostrarCadastroCliente = localStorage.getItem('logginType') === 'CLIENTE';
  const mostrarAdministrador = localStorage.getItem('logginType') === 'ADMINISTRADOR';

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="menu" >
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{height:100}}>
          <Navbar.Brand href="home" id="brand-name" >
          <Image className="image-details" src="https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/31IdzhZcCLEo3ydugFKdlSllHz0icpJA2WYaSS4K1RrblJpQv63k9LC2W_AJPh7J/n/gro465m12zbx/b/bucket-20231005-0813/o/testelogo.png" rounded style={{margin:0, marginTop:-15}} />
          
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" rounded  />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {mostrarAdministrador && (
                <Nav.Link href="crestaurante" className="detail-menu">Cadastro Restaurante | </Nav.Link>
                )}
              {mostrarCadastroRestaurante && (
                <Nav.Link href="cpratos" className="detail-menu">Cadastro Pratos | </Nav.Link>
              )}

              {mostrarCadastroRestaurante && (
                <Nav.Link href="listapratos" className="detail-menu">Listar Pratos Cadastrados | </Nav.Link>
              )}

              {mostrarCadastroRestaurante && (
              <Nav.Link href="listapedidosdorestaurante" className="detail-menu">Pedidos Recebidos | </Nav.Link>
              )}              
              

              {mostrarCadastroCliente && (    
                <Nav.Link href="fpedido" className="detail-menu">Fazer Pedido | </Nav.Link>
              )}  


              {mostrarAdministrador && (
                <Nav.Link href="cusuario" className="detail-menu">Cadastro Usuário | </Nav.Link>
              )}

              {mostrarCadastroCliente && (    
                <Nav.Link href="listapedidosdocliente" className="detail-menu">Pedidos Realizados | </Nav.Link>
                )}  

            </Nav>
            <Nav>
              <Nav.Link href="login" className="detail-menu">SAIR</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
