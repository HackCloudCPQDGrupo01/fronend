import Menu from './menu.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import '../css/cprato.css';
import '../css/index.css';
import React,{Component} from 'react';
import axios from "axios";
import * as constants from './constants';

export default class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pratos: [],
    };


        // Faça uma requisição para obter os dados dos pratos cadastrados
        axios.get(constants.URI_CADASTRO_PRATO)
        .then((res) => {
          this.setState({ pratos: res.data.items });
        })
        .catch((error) => {
          console.error('Erro ao obter dados dos pratos:', error);
        });
  
    
  }


  render() {
    const { pratos } = this.state;

    return (

      <div className="center">



        <Menu/>
        <center>
      <div>
        <h1>Lista de Pratos</h1>
        <br/>
        <table style={{fontSize: '16px'}}>
          <thead>
            <tr>
              <th style={{width:'250px'}}>Nome</th>
              <th style={{width:'220px'}}>Descrição</th>
              <th style={{width:'70px'}}>Preço</th>
              <th style={{width:'250px'}}>Tempo para Preparo</th>
              <th style={{ width: '70px' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {pratos.map((prato) => (
               prato.restaurante == localStorage.getItem('idLoggedUser') && (
              <tr key={prato.id}>
                <td>{prato.nome}</td>
                <td>{prato.descricao}</td>
                <td>R${prato.preco}</td>
                <td>{prato.tempoparapreparo} minutos</td>
                <td>
                        <Link to={`/cpratos?id=${prato.id}`}>Editar</Link>
                </td>
              </tr>
              )
              ))}
          </tbody>
        </table>
      </div>
      </center>
      </div>
    );
  }
}
