import React, {useEffect, useState} from 'react';
import { BsTrashFill, BsFillEyeFill } from 'react-icons/bs';
import api from '../../../services/api';
import Menu from '../../../components/Menu';

export default function List(props) {
    const disciplinaID = props.location.state.disciplina.id
    
    const [atividadeID, setAtividadeID] = useState('');
    const [atividades, setAtividades] = useState('');
    const [modifyAtividade, setModifyAtividade] = useState('');
    const [atividade, setAtividade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tema, setTema] = useState('');
    const [premio, setPremio] = useState('');
    const [moral, setMoral] = useState('');
    const [status, setStatus] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [valor, setValor] = useState('');
    const [alunos, setAlunos] = useState('')
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        fetchAtividades();
    }, [])

    async function fetchAtividades() {
        await api.get('/api/Atividades')
        .then(resp => setAtividades(resp.data))
    }

    async function deleteDisciplina(event) {
        await api.delete(`/api/Atividades/${modifyAtividade.IdAtividade}`)
        .then(response => {
            setAtividades(atividades.filter(item => item.IdAtividade !== modifyAtividade.IdAtividade))
        })
    }

    function setStates(state) {
        setAtividadeID(state ? state.IdAtividade: "");
        setAtividade(state ? state.Atividade1 : "");
        setDescricao(state ? state.Descricao : "");
        setTema(state ? state.TipoAtividade : "");
        setPremio(state ? state.Premiacao : "");
        setMoral(state ? state.MoralAtividade : "");
        setStatus(state ? state.StatusAtividade : "");
        setDataEntrega(state ? new Date(state.DataEntrega).toISOString().substr(0,10) : "");
        setValor(state ? state.Valor : "");
        setAlunos(state ? state.AtividadeUsuarioDisciplina : "");
        setMessage("");
    }

    async function submit(event) {
        event.preventDefault();

        const submitData = {
            'Atividade1': atividade,
            'DataEntrega': dataEntrega,
            'Descricao': descricao,
            'IdDisciplina': disciplinaID,
            'MoralAtividade': moral,
            'Premiacao': premio,
            'StatusAtividade': status,
            'TipoAtividade': tema,
            'Valor': valor
        }

        if (!atividadeID) {
            await api.post('/api/Atividades', submitData)
                .then(resp => {
                    setMessage('success')
                    setAtividadeID(resp.data.IdAtividade)
                    setAlunos(resp.data.AtividadeUsuarioDisciplina)
                    setAtividades([...atividades, resp.data])
            })
        } else {
            submitData['IdAtividade'] = atividadeID
            await api.put(`api/Atividades/${atividadeID}`, submitData)
                .then(resp => {
                    setMessage('success');
                    fetchAtividades();
            })
        }
    }

    return (
    <div className="container">
        <div className="row">
            <Menu />
            <div className="col-md-8 order-md-1">
                <div className="modal fade bd-example-modal-lg" id="adicionarAtividade" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="apagarDisciplina">{atividadeID ? "Editar atividade" : "Adicionar atividade"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {message && <div className="alert alert-success" role="alert">
                                    Dados salvos com sucesso.
                                </div>}
                                <form onSubmit={submit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="formGroup">Atividade</label>
                                            <input required value={atividade} onChange={e => setAtividade(e.target.value)} type="text" className="form-control" placeholder="Atividade"/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="formGroup">Descrição</label>
                                            <input value={descricao} onChange={e => setDescricao(e.target.value)} type="text" className="form-control" placeholder="Descrição"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="formGroup">Tema da atividade</label>
                                            <select value={tema} onChange={e => setTema(e.target.value)} className="form-control" id="materiaSelect" required>
                                                <option value="" disabled>Selecione</option>
                                                <option value="Ensino Religioso">Ensino Religioso</option>
                                                <option value="Ética">Ética</option>
                                                <option value="Educação fisica">Educação fisica</option>
                                                <option value="História">História</option>
                                                <option value="Português">Português</option>
                                                <option value="Ciências">Ciências</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="formGroup">Premiação</label>
                                            <input value={premio} onChange={e => setPremio(e.target.value)} type="text" className="form-control" placeholder="Premiação"/>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="formGroup">Moral</label>
                                            <input required value={moral} onChange={e => setMoral(e.target.value)} type="text" className="form-control" placeholder="Moral"/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="formGroup">Status</label>
                                            <select value={status} onChange={e => setStatus(e.target.value)} className="form-control" id="materiaSelect" required>
                                                <option value="" disabled>Selecione</option>
                                                <option value="Pendente">Pendente</option>
                                                <option value="Em andamento">Em andamento</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="formGroup">Data de entrega</label>
                                            <input required value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} type="date" className="form-control"/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="formGroup">Valor</label>
                                            <input value={valor} onChange={e => setValor(e.target.value)} type="number" className="form-control" placeholder="Valor"/>
                                        </div>
                                    </div>
                                    {alunos &&
                                    <div className="form-group">
                                        <label htmlFor="professorSelect">Alunos</label>
                                        <ul className="list-group">
                                            {alunos.map(aluno =>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                {aluno.NomeSobrenome}
                                            </li>)}
                                        </ul>
                                    </div>
                                    }
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Salvar</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-sm" id="apagarDisciplina" tabIndex="-1" role="dialog" aria-hidden="true">
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
                    <div className="card-header">Atividades</div>
                        {atividades.length > 0 &&
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Atividade</th>
                                        <th>Descrição</th>
                                        <th>Status</th>
                                        <th>Entrega</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                {atividades && atividades.map((atividade, index) =>
                                <tbody key={index}>
                                    <tr>
                                        <td>{atividade.Atividade1}</td>
                                        <td>{atividade.Descricao}</td>
                                        <td>{atividade.StatusAtividade}</td>
                                        <td>{new Date(atividade.DataEntrega).toLocaleDateString()}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button 
                                                    type="button" 
                                                    data-toggle="modal" data-target=".bd-example-modal-sm"
                                                    onClick={() => setModifyAtividade(atividade)}
                                                    className="btn btn-danger space-between mr-2"><BsTrashFill /></button>
                                                <button 
                                                    type="button" 
                                                    onClick={e => setStates(atividade)}
                                                    data-toggle="modal" data-target="#adicionarAtividade"
                                                    className="btn btn-primary"><BsFillEyeFill /></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                )}
                            </table>
                        </div>}
                    <div className="card-footer">
                        <button onClick={() => setStates(false)} type="button" data-toggle="modal" data-target="#adicionarAtividade" className="btn btn-primary btn-lg btn-block">Adicionar atividade</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}