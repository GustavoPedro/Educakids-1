import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import { useHistory, Link } from 'react-router-dom';
import {logout, getRole} from '../../services/auth';

const menuItens = {
    "":  [],
    "Aluno": [["Inicio", "/"],["Perfil","/profile"]],
    "Professor": [["Inicio", "/"], ["Perfil","/profile"], ["Disciplinas", "/disciplines"]],
    "Adm": [["Inicio", "/"],["Perfil","/profile"],["Disciplinas", "/disciplines"],["Gerenciar usuários", "/admin"]]
}

export default function Menu() {
    const history = useHistory();
    const role = getRole();

    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        api.get('/api/Usuario')
        .then(resp => setUserInfo(resp.data))
        .catch(resp => logout());
    }, [])

    return (

    <div className="col-md-4 order-md-2 mb-4">
        <div className="card">
            <div className="card-body">
                <img src={userInfo.NomeSobrenome === "Gustavo Pedro de Souza" ? 
                    "https://cdn.discordapp.com/emojis/707013959915536414.png?v=1" 
                    : 
                    "https://image.flaticon.com/icons/svg/3011/3011297.svg"} 
                className="float-left rounded-circle mr-4" height="80" alt="Avatar"/>
                
                <div className="message">
                    <h5 className="card-title">{userInfo.NomeSobrenome}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{userInfo.TipoUsuario}</h6>
                    <p className="mt-5 card-text text-info">{userInfo.Escola}</p>
                </div>
            </div>
        </div>


        <div className="card mt-3">
            <ul className="list-group list-group-flush">
                {menuItens[role] && menuItens[role].map((menuItem, index) => 
                    history.location.pathname === menuItem[1] ? 
                    <div key={index} className="card-header">{menuItem[0]}</div>
                    :
                    <Link key={index} className="list-group-item" to={menuItem[1]}>{menuItem[0]}</Link> 
               )}
               <Link className="list-group-item text-danger" to="/in" onClick={e => {logout(); history.push('/in')}}>Sair</Link>
            </ul>
        </div>
    </div>
    )
}