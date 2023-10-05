import Menu from './menu.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/cprato.css';
import '../css/index.css';
import React,{Component} from 'react';
import axios from "axios";
import * as constants from './constants';



export default class Food extends Component {
    
    

    constructor(props){
        super(props);
            this.state ={
                nome: '',
                descricao: '',
                restaurante:'',
                tempoparapreparo:'',
                acompanhamento:'',
                preco:'',
                url:'',
                restaurantes: []
            }

            axios.get(constants.URI_CADASTRO_RESTAURANTE)
            .then(res => {
             
              this.setState({ restaurantes:  res.data.items });
      
            });

        }

        changeField(field,event){
            let _filed = event.target.value;
            this.setState(prevState => {
                let nextState = Object.assign({},prevState);
                nextState[field] = _filed;
                return nextState;
            })
        }

        submitForm(e) {
            e.preventDefault();
            //alert(JSON.stringify(this.state));

            const response = axios.post(constants.URI_CADASTRO_PRATO, this.state).then(res => {
                alert('Registro inserido com sucesso');
                console.log(res.data);
                window.location.href = "/home";
            });
        }




    render(){
  return (
<div className="center">



        <Menu/>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={this.submitForm.bind(this)}>
                            <Form.Group controlId="formGridNome">
                            <Form.Label className="details-form">Nome do Prato</Form.Label>
                            <Form.Control  className="font-forms" type="text" placeholder="Informe o email" value={this.state.nome} onChange={this.changeField.bind(this,'nome')} />
                            </Form.Group>

                        <Form.Group controlId="formGridDescricao">
                            <Form.Label className="details-form">Descrição do prato</Form.Label>
                            <Form.Control  as="textarea" rows={3} className="font-forms" placeholder="Informe o descritivo do prato" value={this.state.descricao} onChange={this.changeField.bind(this,'descricao')} />
                        </Form.Group>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridendereco">
                            <Form.Label className="details-form">Restaurante</Form.Label>
                            <Form.Control  as="select"  className="font-forms select-forms" placeholder="Informe o endereço" value={this.state.restaurante} onChange={this.changeField.bind(this,'restaurante')} >
                                <option key="" value="">Selecione</option>
                                {this.state.restaurantes.map((data) => {
                                    if (data.id == localStorage.getItem('idLoggedUser')) {
                                    return (
                                    
                                    <option key={data.id} value={data.id}>
                                    {data.nome}
                                    </option>
                               );
                            }
                            return null; // Ignora outras opções
                          })}
                                
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPreco">
                            <Form.Label className="details-form">Preço do prato</Form.Label>
                            <Form.Control  className="font-forms" placeholder="Informe o preço do prato" value={this.state.preco} onChange={this.changeField.bind(this,'preco')} />
                        </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridtempoParaPreparo">
                            <Form.Label className="details-form">Tempo para preparo</Form.Label>
                            <Form.Control  className="font-forms" placeholder="Informe o tempo medio para preparar o pedido" value={this.state.tempoparapreparo} onChange={this.changeField.bind(this,'tempoparapreparo')} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAcompanhamento">
                            <Form.Label className="details-form">Acompanhamento</Form.Label>
                            <Form.Control className="font-forms select-forms" as="select"  placeholder="Selecione o acompanhamento" value={this.state.acompanhamento} onChange={this.changeField.bind(this,'acompanhamento')}  >
                                <option value={"1"}>Acompanhamento 1</option>
                                <option>Acompanhamento 2</option>
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridNome">
                            <Form.Label className="details-form">Imagem do prato (URL)</Form.Label>
                            <Form.Control  className="font-forms" type="text" placeholder="Informe a url da imagem (dica use o bucket)" value={this.state.url} onChange={this.changeField.bind(this,'url')} />
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Cadastrar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
</div>
  );
}
}
