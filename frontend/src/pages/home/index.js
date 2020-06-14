import React from 'react';
import { getRole } from '../../services/auth';

import Menu from '../../components/Menu';
import HomeAluno from './aluno';
import HomeAdm from './adm';
import HomeProfessor from './professor';

export default function Home() {
  const cargo = getRole();
 
  return (
  <div className="container">
    <div className="row">
      <Menu />
      <div className="col-md-8 order-md-1">
        {cargo === "Aluno" && HomeAluno()}
        {cargo === "Adm" && HomeAdm()}
        {cargo === "Professor" && HomeProfessor()}
      </div>
    </div>
  </div>
  )
}