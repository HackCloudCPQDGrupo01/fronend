import { BrowserRouter, Route,Redirect } from 'react-router-dom';
import React from 'react';
import Home from '../pages/home.js';
import User from '../pages/cadastroUsuario.js'
import Login from '../pages/login.js'
import Restaurant from '../pages/cadastroRestaurante.js';
import Prato from '../pages/cadastroPratro.js';
import Pedido from '../pages/pedidos.js';
import Exemplo from '../pages/exemplo.js';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path='/' exact  component={Login}/>
            <Route path='/home' exact  component={Home}/>
            <Route path='/login' exact  component={Login}/>
            <Route path='/crestaurante' exact  component={Restaurant}/>
            <Route path='/cpratos' exact  component={Prato}/>
            <Route path='/exemplo' exact  component={Exemplo}/>
            <Route path='/cusuario' exact  component={User}/> 
            <Route path='/fpedido' exact  component={Pedido}/>
        </BrowserRouter>
    )
}