import React, {useState, useEffect} from 'react';
import api from '../../../services/api';

export default function Personal() {
    const [status, setStatus] = useState('');

    const [NomeSobrenome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        api.get('/api/Usuario')
        .then((resp => {
            setNome(resp.data.NomeSobrenome);
            setCpf(resp.data.Cpf);
            setEmail(resp.data.Email);
            setTelefone(resp.data.Telefone);
        }))
    }, [])


    async function submitForm(event) {
        event.preventDefault();

        await api.put('/api/Usuarios', {NomeSobrenome, telefone, email, cpf})
        .then(e => setStatus('success'))
        .catch(e => setStatus('fail'))
    }
    

    return (
        <div className="card">
            <h5 className="card-header">Editar dados</h5>
            <div className="card-body">
                {status === 'success' && 
                    <div className="alert alert-success" role="alert">
                        Informações atualizadas com sucesso.
                    </div>
                }
                {status === 'fail' && 
                    <div className="alert alert-danger" role="alert">
                        Erro ao atualizar os dados.
                    </div>
                }
                <form onSubmit={submitForm}>
                    <input type="text" 
                        required
                        minLength="10"
                        onChange={e => setNome(e.target.value)}
                        className="form-control mb-2" value={NomeSobrenome} />
                    <input 
                        required
                        onChange={e => setEmail(e.target.value)}
                        type="text" className="form-control mb-2" value={email} />
                    <input type="text" 
                        maxLength="15"
                        onChange={e => setTelefone(formatTel(e.target.value))}
                        className="form-control mb-2" value={telefone} />
                <button type="submit" className="btn btn-primary w-100">Salvar</button>
                </form>
            </div>
        </div>
    )
}

function formatTel(value) {
    return value
      .replace(/\D/g, '') 
      .replace(/^(\d{2})(\d)/g, '($1) $2') 
      .replace(/(\d)(\d{4})$/,'$1-$2')
}