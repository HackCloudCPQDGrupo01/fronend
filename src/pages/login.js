import Menu from './menu.js';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/index.css';
import '../css/login.css';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props){
        super(props);
            this.state ={
                email: '',
                password: '',
                redirect: false,
                tipo: ''
            }
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('logginType', '');
            localStorage.setItem('idLoggedUser', '');
            
        }

        changeField(field,event){
            let _filed = event.target.value;
            this.setState(prevState => {
                let nextState = Object.assign({},prevState);
                nextState[field] = _filed;
                return nextState;
            })
        }

        submitForm(e){

            //alert(JSON.stringify(this.state.tipo));
            //alert(this.state.tipo);

            if (this.state.tipo == ''){

            } else if (this.state.tipo == ''){

            }

            


            if(this.state.password == '12345'){

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('logginType', this.state.tipo);
                localStorage.setItem('idLoggedUser', '2');
                
                this.setState(prevState => {
                    let nextState = Object.assign({},prevState);
                    nextState.redirect = true;
                    return nextState;
                })
            }
        }
    
render(){
    if(this.state.redirect){
        return <Redirect to="/home"/>
    } else{
            return(
                <div className="center">
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                        <Image className="image-details" src="https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/31IdzhZcCLEo3ydugFKdlSllHz0icpJA2WYaSS4K1RrblJpQv63k9LC2W_AJPh7J/n/gro465m12zbx/b/bucket-20231005-0813/o/testelogo.png" rounded />
                        <Form onSubmit={this.submitForm.bind(this)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="details-form" >Email</Form.Label>
                                    <Form.Control type="email" className="font-forms" placeholder="Informe o email" value={this.state.email} onChange={this.changeField.bind(this,'email')}/>
                                        <Form.Text className="text-muted">
                                            Informe seu e-mail pessoal
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label className="details-form">Password</Form.Label>
                                    <Form.Control type="password" className="font-forms" placeholder="Password"  value={this.state.password} onChange={this.changeField.bind(this,'password')}/>
                                </Form.Group>

                                
                                
                                <Form.Group controlId="formBasicType">
                                <Form.Label className="details-form">Tipo de Login</Form.Label>
                                    <Form.Control  as="select"  className="font-forms select-forms" placeholder="Informe o endereço" value={this.state.tipo} onChange={this.changeField.bind(this,'tipo')} >
                                        <option>Selecione</option>
                                        <option key="RESTAURANTE" value="RESTAURANTE">Restaurante</option>
                                        <option key="CLIENTE" value="CLIENTE">Cliente</option>
                                
                                    </Form.Control>
                                </Form.Group>    
                                <Button variant="danger" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            )  
        }

        }
}
