import Menu from './menu.js';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/cpedido.css';
import '../css/index.css';
import React,{Component} from 'react';
import axios from "axios";
import { format } from 'date-fns';
import * as constants from './constants';
import { Redirect } from 'react-router-dom';


    const idUsuarioCorrente = localStorage.getItem('idLoggedUser');
    //const apiUrlOrder = 'https://oic-dev-grr34oevd4ye-gr.integration.sa-saopaulo-1.ocp.oraclecloud.com/ic/api/integration/v1/flows/rest/ORDERPLATE/1.0/orderPlate';
    const apiUrlOrder = constants.URI_REALIZAR_PEDIDO;
    const username = constants.USUARIO_REST_OIC;
    const password = constants.PASSWORD_REST_OIC;
    const basicAuth = btoa(`${username}:${password}`);

    const headers = {
        
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Basic ${basicAuth}`,
      };



export default class Restaurant extends Component {
    
    
    constructor(props){
        super(props);
            this.state ={
                pedido: [{}]
            }


        axios.get(constants.URI_PEDIDOS_CLIENTE+localStorage.getItem('idLoggedUser'), { headers })
        .then(res => {
            
            this.setState({ pedido:  res.data.items });
    
        }); 
        
   
        
    }




    submitPedido(e){
        e.preventDefault();
        alert(JSON.stringify(this.state.pedido[e.target.value].id));
        
         const novoObjetoJSON = {
            "idPedido": this.state.pedido[e.target.value].id+""
            
            
          };

          axios.post(constants.URI_CANCELA_PEDIDO, novoObjetoJSON, { headers })
            .then((response) => {
                console.log('Resposta da solicitação POST:', response.data);
               // alert('Pedido cancelado com sucesso.');
                window.location.href = "/home";
            })
            .catch((error) => {
                console.error('Erro na solicitação POST:', error);
            });   

    }


    
    render(){
  return (
<div className="center">
        <Menu/>
        <Container>
            <Row>
                <Col md={{ span: 12, offset: 0 }}>
                    {this.state.pedido.map((pedido,index) =>{
                        
                            return (
                                <Card key={index} className="mb-3">
                                <Card.Body>
                                  <Card.Title>Pedido: {pedido.id}</Card.Title>
                                  <Card.Text>
                                    <b>Restaurante:</b> {pedido.restaurante}
                                    <br />
                                    <b>Prato:</b> {pedido.nome}
                                    <br/>
                                    <b>Valor:</b> {pedido.preco}
                                    <br />
                                    <b>Data:</b> {pedido.data_prato}
                                    <br/>
                                    <b>Status:</b> {pedido.status}
                                  </Card.Text>
                                  <Card.Text>
                                    
                                    
                                  </Card.Text>

                                  {((pedido.status == "Aguardando análise") || pedido.status =='' ) && (
                                  <Button style={{backgroundColor:"#FF0000"}}
                                    variant="primary"
                                    
                                    value={index}
                                    onClick={this.submitPedido.bind(this)}
                                  >
                                    Cancelar Pedido
                                  </Button>

                                  
                                  )}
                                </Card.Body>
                              </Card>
             
                            )
                        } 
                    )}
                </Col>
            </Row>
        </Container>
</div>
  );
}
}
