import React, { useEffect, useState } from 'react';
import api from '../../services/api'

export default function HomeAdm(props) {

    const [disciplinas, setDisciplinas] = useState([])
    const [atividades, setAtividades] = useState([]);


    useEffect(() => {
        api.get('/api/Disciplinas/Professor')
        .then(resp => setDisciplinas(resp.data))

        api.get('/api/Atividades/Professor')
        .then(resp => setAtividades(resp.data))
    }, [])


    return (
    <>
        <div className="card">
            <div className="card-header">
                Disciplinas lecionadas
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {disciplinas && disciplinas.map((disciplina, index) => 
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {disciplina.Materia} 
                                <div className="text-secondary">{disciplina?.Descricao}</div>
                            </div>
                        </li>   
                    )}
                </ul>
            </div>
        </div>

        <div className="card mt-3">
            <div className="card-header">
                Atividades cadastradas
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {atividades && atividades.map((atividadeAluno, index) => 
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {atividadeAluno?.Atividade1} 
                                <div className="text-secondary">{atividadeAluno?.Descricao}</div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </>);
}
