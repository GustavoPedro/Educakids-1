import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import Menu from '../../../components/Menu';

export default function Details(props) {
    const [disciplinaID, setDisciplinaID] = useState(verifyPropsAndReturn('id', ''));
    const [descricao, setDescricao] = useState(verifyPropsAndReturn('descricao', ''));
    const [materia, setMateria] = useState(verifyPropsAndReturn('mateira', ''));
    const [turno, setTurno] = useState(verifyPropsAndReturn('turno', ''));
    const [professor, setProfessor] = useState(verifyPropsAndReturn('professorResponsavel', ''));
    const [alunos, setAlunos] = useState(verifyPropsAndReturn('UsuarioDisciplina', []))
    const [alunosList, setAlunosList] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchProfessores() {
            await api.get('/api/Professores')
            .then(resp => setProfessores(resp.data))
        }

        fetchProfessores();
    }, []);

    useEffect(() => {
        async function fetchAlunos() {
            await api.get('/api/Alunos')
            .then(resp => {
                setAlunosList(
                    resp.data.map((aluno) => {
                        return { ...aluno, checked: false }
                    }).filter((aluno) => {
                        return alunos.findIndex(al => al.Cpf === aluno.Cpf) < 0
                    }));
            })
        }
        fetchAlunos();
    }, [alunos])

    function verifyPropsAndReturn(item, defaultValue) {
        if (!props.location.state.id) 
            return defaultValue;

        if (item === 'professorResponsavel')
            return props.location.state[item].Cpf

        return props.location.state[item]
    }

    function addAlunoToList(aluno) {
        setAlunosList(alunosList.filter(item => item.Cpf !== aluno.Cpf))
        setAlunos([...alunos, aluno])
    }

    function removeAlunoFromList(aluno) {
        setAlunosList([...alunosList, aluno])
        setAlunos(alunos.filter(item => item.Cpf !== aluno.Cpf))
    }

    async function submitForm(event) {
        event.preventDefault();

        const submitData = {
            "cpf": professor,
            "descricao": descricao,
            "materia":  materia,
            "turno": turno,
            "usuarioDisciplina": [],
        }

        if (!disciplinaID) {
            const alunosData = [{"UsuarioCpf": professor}]
            alunos.map(aluno => 
                alunosData.push({"UsuarioCpf": aluno.Cpf}))

            submitData['usuarioDisciplina'] = alunosData
            await api.post('/api/Disciplina', submitData)
                .then(resp => {
                    setDisciplinaID(resp.data.IdDisciplina)
                    setMessage('success-new')
            })
        } else {
            const alunosData = [{"UsuarioCpf": professor, 
                "DisciplinaIdDisciplina": disciplinaID}]

            alunos.map(aluno => 
                alunosData.push({"UsuarioCpf": aluno.Cpf, 
                    "DisciplinaIdDisciplina": disciplinaID})
            )
            submitData['IdDisciplina'] = disciplinaID
            submitData['usuarioDisciplina'] = alunosData
            await api.put(`/api/Disciplina/${disciplinaID}`, submitData)
                .then(setMessage('success-edit'))
        }
    }

    return (
        <div className="container">
            <div className="row">
                <Menu />
                <div className="col-md-8 order-md-1">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Adicionar/Editar disciplina</h5>
                            {message && <div className="alert alert-success" role="alert">
                                {message === "success-new" ? "Disciplina adicionada com sucesso" 
                                :
                                "Disciplina editada com sucesso."}
                            </div>}
                            <div className="modal fade" id="apagarDisciplina" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="apagarDisciplina">Adicionar alunos</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <ul className="list-group">
                                                {alunosList.map((aluno, index) => 
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {aluno.NomeSobrenome}
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={e=> addAlunoToList(aluno)}>+</button>
                                                </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" data-dismiss="modal">Fechar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <label htmlFor="descricaoInput">Descrição</label>
                                    <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} className="form-control" id="descricaoInput" placeholder="Descrição" required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="materiaSelect">Matéria</label>
                                    <select value={materia} onChange={e => setMateria(e.target.value)} className="form-control" id="materiaSelect" required>
                                        <option value="" disabled>Selecione</option>
                                        <option value="Ensino Religioso">Ensino Religioso</option>
                                        <option value="Ética">Ética</option>
                                        <option value="Educação fisica">Educação fisica</option>
                                        <option value="História">História</option>
                                        <option value="Português">Português</option>
                                        <option value="Ciências">Ciências</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="turnoSelect">Turno</label>
                                    <select value={turno} onChange={e => setTurno(e.target.value)} className="form-control" id="turnoSelect" required>
                                        <option value="" disabled>Selecione</option>
                                        <option value="Manhã">Manhã</option>
                                        <option value="Tarde">Tarde</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="professorSelect">Professor responsável</label>
                                    <select value={professor} onChange={e => setProfessor(e.target.value)} className="form-control" id="professorSelect" required>
                                        <option key="-1" value="" disabled>Selecione</option>
                                        {professores && professores.map((info, index) => 
                                            <option key={index} value={info.Cpf}>{info.NomeSobrenome}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="professorSelect">Alunos</label>
                                    <ul className="list-group">
                                        {alunos && alunos.map((aluno, index) => 
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {aluno.NomeSobrenome}
                                                <button type="button" className="btn btn-danger btn-sm" onClick={e => removeAlunoFromList(aluno)}>-</button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <button type="button" className="float-right btn btn-secondary btn-sm mb-3" data-toggle="modal" data-target="#apagarDisciplina">Adicionar aluno</button>
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Salvar</button>
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
        </div>);
}
