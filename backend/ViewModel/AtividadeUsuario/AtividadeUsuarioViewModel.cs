﻿using BackEnd.ViewModel.Atividade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.ViewModel.AtividadeUsuarioDisciplina
{
    public class AtividadeUsuarioViewModel
    {
        public int IdAtividade { get; set; }
        public int IdUsuarioDisciplina { get; set; }
        public string Status { get; set; }
        public double Total { get; set; }

    }
}
