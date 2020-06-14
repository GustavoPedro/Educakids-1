import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import api from '../../services/api'
import { getEmail } from '../../services/auth'

export default function HomeAluno(props) {
    const [atividadesAluno, setAtividadesAluno] = useState([])
    const [disciplinas, setDisciplinas] = useState([])

    useEffect(() => {
        fetchAtividades();
    }, [])

    async function fetchAtividades() {
        await api.get(`api/AtividadeUsuarioEDisciplinas/${getEmail()}`)
        .then(resp => {
            setAtividadesAluno([...resp.data?.AtividadesUsuario])
            setDisciplinas([...resp?.data?.Disciplinas])
        })
    }


    return (
    <>
        <div className="card">
            <div className="card-header">
                Atividades
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {atividadesAluno && atividadesAluno.map((atividadeAluno, index) => 
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {atividadeAluno?.IdAtividadeNavigation?.Atividade1} 
                                <div className="text-secondary">
                                    {atividadeAluno?.IdAtividadeNavigation?.Descricao}
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>

        <div className="card mt-3">
            <div className="card-header">
                Disciplinas
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {disciplinas && disciplinas.map((disciplina, index) => 
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {disciplina.Materia} 
                                <div className="text-secondary">
                                    {disciplina?.Descricao}
                                </div>
                            </div>
                            <Link key={disciplina.IdDisciplina} className="badge badge-primary badge-pill" to={{ pathname: "/disciplinadetailsaluno", state: { ...disciplina } }}>Ver</Link>
                        </li>   
                    )}
                </ul>
            </div>
        </div>
    </>);
}
