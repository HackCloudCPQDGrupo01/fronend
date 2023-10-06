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
                preco:'',
                restaurantes: []
            }

            axios.get(constants.URI_CADASTRO_RESTAURANTE)
            .then(res => {
             
              this.setState({ restaurantes:  res.data.items });
      
            });

            this.verificaModoEdicao();

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
            //alert(JSON.stringify(this.state.id));

            if (this.state.id){

                const response = axios.put(constants.URI_CADASTRO_PRATO+ `${this.state.id}`, this.state).then(res => {
                    alert('Registro inserido com sucesso');
                    console.log(res.data);
                    window.location.href = "/home";
                })
                .catch((error) => {
                    alert('Falha ao realizar a alteração do registro: \n\n'+  error);
                }); 

            }else{

                const response = axios.post(constants.URI_CADASTRO_PRATO, this.state).then(res => {
                    alert('Registro inserido com sucesso');
                    console.log(res.data);
                    window.location.href = "/home";
                })
                .catch((error) => {
                    alert('Falha ao realizar ao inserir o registro: \n\n'+  error);
                });  

            }
            
        }


        verificaModoEdicao() {
            // Verifique se há um parâmetro 'id' na URL e, se houver, carregue os dados do prato para edição
            
            // Acessa a query string completa
            const queryString = this.props.location.search;

            // Use URLSearchParams para analisar a query string
            const params = new URLSearchParams(queryString);

            // Recupera o valor de um parâmetro específico (substitua 'paramName' pelo nome do seu parâmetro)
            const id = params.get('id');
            
//            alert(JSON.stringify(id));
            if (id) {
                
              // Faça uma requisição para obter os dados do prato com o ID especificado
              axios.get(constants.URI_CADASTRO_PRATO + `${id}`)
                .then((res) => {
                  const prato = res.data;

                  // Atualize o estado com os dados do prato para edição
                  this.setState({
                    id: id,
                    nome: prato.nome,
                    descricao: prato.descricao,
                    restaurante: prato.restaurante,
                    tempoparapreparo: prato.tempoparapreparo,
                    acompanhamento: prato.acompanhamento,
                    preco: prato.preco,
                    url: prato.url,
                  });
                })
                .catch((error) => {
                  alert('Falha ao buscar os dados do id da URL');
                  console.error('Erro ao obter dados do prato:', error);
                });
            }
          }    


          goBack() {
            window.history.back(); // Navegar para a página anterior
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
                            <Form.Control  className="font-forms" type="text" placeholder="Nome do prato" value={this.state.nome} onChange={this.changeField.bind(this,'nome')} />
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

     
                        </Form.Row>
                        <br/>
                        <Button variant="secondary" onClick={this.goBack.bind(this)} style={{width: '20rem', height: '5rem', fontSize: '16px', marginTop:'20px'}}>Voltar</Button>
                            &nbsp;
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
