import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Menu from '../../components/Menu';

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [userModify, setUserModify] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [modifyStatus, setStatus] = useState('');

  useEffect(() => {
    api.get('/api/UsuariosLista')
    .then(resp => setUsuarios(resp.data))
    .catch(resp => setUsuarios([]))
  }, [])

  async function saveChanges(event) {
      event.preventDefault();

      await api.put(`api/Usuarios/Cargo/${userModify.Cpf}`, {
        'TipoUsuario': userRole
      })
      .then(resp => setStatus('success'))
      .catch(resp => setStatus('error'))
  }

  //async function deleteUser(event) {
  //  await api.delete('/api/Usuarios', {
  //    'email': userModify.email}
  //  )
  //  .then(resp => {
  //    setUsuarios(usuarios.filter(item => item.id !== userModify.id))
  //  })
  //}
 
  return (
  <div className="container">
    <div className="row">
      <Menu />
      
      <div className="modal fade" id="userModify" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modificar usuário</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            
            {modifyStatus && 
              <div className={modifyStatus === 'success' ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                  {modifyStatus === 'success' ? 'O usuário foi atualizado com sucesso!' : 
                  'Houve um problema ao atualizar as informações, tente novamente.'}
              </div>
            }

            <form onSubmit={saveChanges}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Usuário</label>
                <input type="text" className="form-control" id="recipient-name" placeholder={userModify.NomeSobrenome} disabled/>
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">Cargo</label>
                <select className="form-control" value={userRole} onChange={e => setUserRole(e.target.value)}>
                  <option value="Aluno">Aluno</option>
                  <option value="Professor">Professor</option>
                  <option value="Adm">Administrador</option>
                </select>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
              <button type="submit" className="btn btn-primary">Salvar</button>
            </div>
            </form>

            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8 order-md-1">
        <div className="card">
            <div className="card-header">
                Alterar usuários
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                  {usuarios.map((usuario, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{usuario.NomeSobrenome}</div>
                    <button 
                      type="button" 
                      data-target="#userModify"
                      onClick={event => {
                          setStatus('');
                          setUserModify(usuario);
                          setUserRole(usuario.TipoUsuario);
                      }}
                      className="btn btn-primary btn-sm" 
                      data-toggle="modal">Modificar</button>
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