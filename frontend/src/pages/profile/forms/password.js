import React, {useState} from 'react';
import api from '../../../services/api';

export default function PasswordForm(props) {
    const [senha, setSenha] = useState('');
    const [status, setStatus] = useState('');

    async function submitForm(event) {
        event.preventDefault();
        setStatus('');

        await api.post('/api/Usuarios/Senha', {senha})
        .then(e => setStatus('success'))
        .catch(e => setStatus('fail'))
    }

    return (

    <div className="card my-3">
        <h5 className="card-header">Trocar senha</h5>
        <div className="card-body">
             {status === 'success' && 
                <div className="alert alert-success" role="alert">
                    Senha alterada com sucesso.
                </div>
            }
            {status === 'fail' && 
                <div className="alert alert-danger" role="alert">
                    Por favor, escolha outra senha.
                </div>
            }
            <form onSubmit={submitForm}>
                <input 
                type="password" 
                className="form-control mb-2" 
                placeholder='Nova senha' value={senha} required
                minLength="3" maxLength="10"
                onChange={e => setSenha(e.target.value)} />
            <button type="submit" className="btn btn-primary w-100">Salvar</button>
            </form>
      </div>
    </div>
    )
}