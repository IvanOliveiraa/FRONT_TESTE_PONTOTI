import React from 'react';
import { Route, Routes } from 'react-router-dom';



import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Funcionarios from './pages/Funcionarios';
import Clientes from './pages/Clientes';
import AddFuncionario from './pages/Funcionarios/AddFuncionario';
import EditFuncionario from './pages/Funcionarios/EditFuncionario';
import AddCliente from './pages/Clientes/AddCliente';
import Atendimentos from './pages/Atendimentos';
import Tarefas from './pages/Atendimentos/Tarefas';
import Tipos from './pages/Tipos';
import ProtectedRoute from './auth';
import AtendimentosTecnico from './pages/AtendimentosTecnico';
import Voltar from './pages/naoautorizada';
import Orcamentos from './pages/orcamentos';
import AddOrcamento from './pages/orcamentos/Addorcamento';
import TarefasTecnico from './pages/TarefasTecnico';

export default function Rotas() {
    return (

        <Routes>
            <Route exact path="/funcionarios" element={<Funcionarios />} />
            <Route exact path="/novofuncionario" element={<AddFuncionario />} />
            <Route exact path="/tarefasfuncionario/:id" element={<EditFuncionario />} />
            <Route exact path="/editarfuncionario/:id" element={<EditFuncionario />} />

            <Route exact path="/orcamentos" element={<Orcamentos />} />
            <Route exact path="/novoorcamento" element={<AddOrcamento />} />

            <Route exact path="/clientes" element={<Clientes />} />
            <Route exact path="/novocliente" element={<AddCliente />} />

            <Route element={<ProtectedRoute />}>

                <Route exact path="/atendimentos" element={<Atendimentos />} />
                <Route exact path="/atendimentostecnico" element={<AtendimentosTecnico />} />
                <Route exact path="/atendimento/:id" element={<Tarefas />} />

            </Route>
            <Route exact path="/tarefastecnico/:id" element={<TarefasTecnico />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/" element={<Login />} />

            <Route exact path="/voltar" element={<Voltar />} />

            <Route exact path="/tipos" element={<Tipos />} />

            <Route path="*" element={<Login />} />
        </Routes>

    );
}