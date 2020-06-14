import React from 'react';

import logo from '../../assets/logo.png';
import { useHistory } from 'react-router-dom';

const routes = {
    "/": "Início",
    "/disciplines": "Disciplinas",
    "/in": "Login",
    "/up": "Cadastro",
    "/activities": "Atividades",
    "/activities/details": "Detalhes da atividade",
    "/disciplines/details": "Detalhes da disciplina",
    "/profile": "Perfil",
    "/admin": "Painel de controle"
}

export default function Header() {
    const history = useHistory();

    return (
        <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src={logo} alt="Educa Kids" height="120"/>
        <h2 className="text-muted">{routes[history.location.pathname]}</h2>
      </div>

    )
}