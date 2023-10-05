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


    const idUsuarioCorrente = localStorage.getItem('idLoggedUser');
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


        axios.get(constants.URI_PEDIDOS_RESTAURANTE+localStorage.getItem('idLoggedUser'), { headers })
        .then(res => {
            
            this.setState({ pedido:  res.data.items });
    
        });    
            
    }


    rejeitarPedido(e){
        e.preventDefault();
        //alert(JSON.stringify(this.state.pedido[e.target.value].id));
        
         const novoObjetoJSON = {
            "idPedido": this.state.pedido[e.target.value].id+"",
            "status": "Pedido Rejeitado"
            
          };

          axios.post(constants.URI_APROVA_OU_REJEITA, novoObjetoJSON, { headers })
            .then((response) => {
                console.log('Resposta da solicitação POST:', response.data);
                alert('Pedido rejeitado com sucesso.');
                window.location.href = "/home";
            })
            .catch((error) => {
                console.error('Erro na solicitação POST:', error);
            });   

    }

    aprovarPedido(e){
      e.preventDefault();
      //alert(JSON.stringify(this.state.pedido[e.target.value].id));
      
       const novoObjetoJSON = {
          "idPedido": this.state.pedido[e.target.value].id+"",
          "status": "Pedido Aprovado"
          
        };

        axios.post(constants.URI_APROVA_OU_REJEITA, novoObjetoJSON, { headers })
          .then((response) => {
              console.log('Resposta da solicitação POST:', response.data);
              alert('Pedido aprovado com sucesso.');
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
                                    <b>Cliente:</b> {pedido.nomecliente}
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
                                    onClick={this.rejeitarPedido.bind(this)}
                                  >
                                    Rejeitar Pedido
                                  </Button>

                                  
                                  )}
                                    {((pedido.status == "Aguardando análise") || pedido.status =='' ) && (
                                  <Button style={{backgroundColor:"#008000"}}
                                    variant="primary"
                                    
                                    value={index}
                                    onClick={this.aprovarPedido.bind(this)}
                                  >
                                    Aprovar
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
