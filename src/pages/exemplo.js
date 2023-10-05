import React, { Component } from 'react';
import axios from "axios";

const  api = axios.create({
    baseURL: "https://g43e2fb20cc5755-databasename.adb.sa-saopaulo-1.oraclecloudapps.com/ords/appuser/"
})

class MeuFormulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opcoes: [  { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }], // Substitua isso pelas suas opções reais
      valorSelecionado: '', // Estado para armazenar a opção selecionada
      restaurantes: []
    };

    axios.get('https://g43e2fb20cc5755-databasename.adb.sa-saopaulo-1.oraclecloudapps.com/ords/appuser/restaurantesObject/')
      .then(res => {
       
        this.setState({ opcoes:  res.data.items });

      });
  }



  handleChange = (event) => {
    this.setState({ valorSelecionado: event.target.value });
  }


  listRestaurantes() {
    
  }

  render() { 
    return (
      <div>
        <form>
          <label>
            Selecione uma opção:
            <select value={this.state.valorSelecionado} onChange={this.handleChange}>
              <option value="">Selecione...</option>
              {this.state.opcoes.map((opcao) => (
                <option key={opcao.id} value={opcao.nome}>
                  {opcao.nome}
                </option>
              ))}
            </select>
          </label>
        </form>
        <p>Opção selecionada: {this.state.valorSelecionado}</p>
      </div>
    );
  }
}

export default MeuFormulario;
