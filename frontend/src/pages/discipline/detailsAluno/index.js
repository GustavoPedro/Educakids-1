import React, { useEffect, useState } from 'react';
import api from '../../../services/api'
import { getToken } from '../../../services/auth';
import jwt_decode from 'jwt-decode';

import Menu from '../../../components/Menu';

export default function DetalhesDaDisciplinaAluno(props) {
    const email = jwt_decode(getToken()).email
    const disciplina = props.history.location.state
    const [ranking, setRanking] = useState([])
    const [premiacoes, setPremiacoes] = useState([])
    const [atividades, setAtividades] = useState([])

    useEffect(() => {
        async function fetchInformacoes() {
            await api.get(`api/Ranking/${disciplina.IdDisciplina}`)
            .then(response => {
                let i = 0
                setRanking(response.data.Ranking.map(e => {
                    e.Posicao = `${++i}º`
                    return e
                }))
                setAtividades(response.data.Atividades)
                setPremiacoes(response.data.Premiacao)
            })
        }
        fetchInformacoes()
    }, [disciplina.IdDisciplina])


    return (
    <div className="container">
        <div className="row">
          <Menu />
            <div className="col-md-8 order-md-1">
                <div className="card">
                    <div className="card-header">
                        Atividades
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {atividades && atividades.map((atividade, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between bg-light">
                                <div className={atividade.Status === "Concluído" ? "text-success" : "text-dark"}>
                                    <h6 className="my-0">{atividade.IdAtividadeNavigation.Atividade1}</h6>
                                    <small>{atividade.IdAtividadeNavigation.Descricao}</small>
                                </div>
                                <span className="text-info">{atividade.IdAtividadeNavigation.Valor} pts</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        Prêmios do mês 
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {premiacoes && premiacoes.map((premiacao, index) => (
                            <li key={index} className="list-group-item">
                                {premiacao.Aluno}
                                <div className="text-muted">{premiacao.Premiacao}</div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        Ranking
                    </div>
                    <div className="card-body">
                    <h6 className="card-title text-muted">Você está na {ranking.filter(ativ => ativ.Email === email)[0]?.Posicao} posição!</h6>
                        <ul className="list-group list-group-flush">
                            {ranking && ranking.map((aluno, index) => (
                            <li key={index} className="list-group-item">
                                <span className="text-muted">#{aluno.Posicao}</span>
                                <span className="ml-3 text-active">{aluno.Nome}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}