import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import Menu from '../../../components/Menu';

export default function List(props) {
    const [disciplinas, setDisciplinas] = useState('');
    const [modifyDisciplina, setModifyDisciplina] = useState('');
    
    useEffect(() => {
        fetchDisciplinas();
    }, [])

    async function fetchDisciplinas() {
        try {
            const response = await api.get('/api/Disciplina')
            if (response.status === 200) {
                setDisciplinas(response.data)
            }
        } catch (response) {
            console.log(response)
        }
    }

    async function deleteDisciplina(event) {
        await api.delete(`/api/Disciplina/${modifyDisciplina.id}`)
            .then(response => {
                setDisciplinas(disciplinas.filter(item => item.id !== modifyDisciplina.id))
            })
    }

    return (
    <div className="container">
        <div className="row">
            <Menu />
            <div className="col-md-8 order-md-1">
                <div className="modal fade" id="apagarDisciplina" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="apagarDisciplina">Confirma a exclusão da disciplina?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => deleteDisciplina()}>Apagar</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Selecione uma disciplina</h5>
                        <ul className="list-group list-group-flush">
                            {disciplinas && disciplinas.map((disciplina, index) => 
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {disciplina.mateira} 
                                    <div className="text-secondary">
                                        {disciplina.descricao}
                                    </div>
                                </div>

                                <div className="btn-group">
                                    <button type="button" 
                                        onClick={() => props.history.push('/activities', { disciplina })}
                                        className="btn btn-primary">
                                            Atividades
                                    </button>
                                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu">
                                        <div 
                                            onClick={e => props.history.push('/disciplines/details', { ...disciplina, action: 'Change' })}
                                            className="dropdown-item">
                                                Editar disciplina</div>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={e => setModifyDisciplina(disciplina)}
                                            data-toggle="modal" data-target="#apagarDisciplina">
                                                Apagar disciplina
                                        </button>
                                    </div>
                                </div>
                            </li>   
                            )}
                        </ul>
                        <button onClick={e => props.history.push('/disciplines/details', { action: 'Add' })} type="button" className="btn btn-primary btn-lg btn-block mt-3">Cadastrar nova disciplina</button>

                    </div> 
                </div>
            </div>
        </div>
    </div>);
}