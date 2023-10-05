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


        axios.get(constants.URI_REALIZAR_PEDIDO_PRATOS, { headers })
        .then(res => {
            
            this.setState({ pedido:  res.data.items });
    
        });    
            
    }


    submitPedido(e){
        e.preventDefault();
        //alert(JSON.stringify(this.state.pedido[e.target.value].id));
        
        const novoObjetoJSON = {
            "id_prato": this.state.pedido[e.target.value].id+"",
            "id_user": idUsuarioCorrente,
            "data": format(new Date(), 'dd/MM/yyyy HH:mm:ss')+" teste"
          };

          //alert(JSON.stringify(novoObjetoJSON));  

          axios.post(apiUrlOrder, novoObjetoJSON, { headers })
            .then((response) => {
                console.log('Resposta da solicitação POST:', response.data);
                alert('Pedido realizado com sucesso!\n\nNúmero do pedido: '+response.data.idPedido+'. \n\n Aguarde aprovação do restaurante.');
                //alert(JSON.stringify(response.data.idPedido));  
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
                        <center>
                    {this.state.pedido.map((pedido,index) =>{
                        
                            return (
                                <Row>
                                <Row>
                                    <Col md={{ span: 3, offset: 0 }}>
                                        <Card style={{ width: '100rem' }}>

                                            <Card.Body>
                                                <Card.Title className="tile-card">{pedido.restaurante}</Card.Title>
                                                
                                                <Card.Text className="card-text">
                                                    <strong>{pedido.nome}</strong>
                                                </Card.Text>
                                                
                                                <Row className="details-card-restaurant">
                                                    <Col md={{ span: 6, offset: 0 }}>
                                                        <Card.Text as={Col} className="card-text details-card">
                                                        <center>{pedido.descricao}</center>
                                                        </Card.Text>
                                                    </Col>
                                                    <Col md={{ span: 6, offset: 0 }}>
                                                        <Card.Text as={Col} className="card-text">
                                                            <strong>{pedido.tempoparapreparo} minutos</strong>
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Card.Text as={Col} className="price">
                                                    R${pedido.preco}
                                                </Card.Text>
                                                <Button variant="danger" className="btn-danger-pedido" value={index} onClick={this.submitPedido.bind(this)}>Fazer Pedido</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                    <Col style={{ height: '30rem' }}>
                                    
                                        
                                    
                                    </Col>
                                </Row>
             
                            )
                        } 
                    )}
                    </center>
                </Col>
            </Row>
        </Container>
</div>
  );
}
}
