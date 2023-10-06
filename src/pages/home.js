
import '../css/home.css';
import Menu from './menu.js';
import * as constants from './constants';

export default function Home() {


  const mostrarCadastroRestaurante = localStorage.getItem('logginType') === 'RESTAURANTE';
  const mostrarCadastroCliente = localStorage.getItem('logginType') === 'CLIENTE';
  const mostrarAdministrador = localStorage.getItem('logginType') === 'ADMINISTRADOR';



  return (
      <div className="center">
        
          <Menu/>
            <div style={{width:'80%',height:800, margin: '5%', fontSize: '20px'}}>
            {mostrarCadastroCliente && (    
            <b>Acompanhe os principais pratos que a comunidade esta pedindo :D</b>
            )}
            
            {mostrarCadastroCliente && (       
            <oracle-dv project-path="/@Catalog/users/hackacloudcpqdteam01@gmail.com/Analytics"></oracle-dv>
            )}
            
            
            </div>
              
      </div>
      
  );
}
