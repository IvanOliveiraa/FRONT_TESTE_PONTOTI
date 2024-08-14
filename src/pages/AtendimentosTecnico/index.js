import React, { Component, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SidebarTecnico from '../../components/SidebarTecnico';
import Topbar from '../../components/Topbar';

import styled from 'styled-components';
import CardAtendimento from '../../components/CardAtendimento';
import CardConfirmar from '../../components/CardConfirmar';
import useAxios from '../../hooks/useAxios';
import BotaoAdd from '../../components/ModalAddAtendimento';
import CardTarefa from '../../components/CardTarefa';
import useAuth from '../../hooks/useAuth';
import CardTarefaTecnico from '../../components/CardTarefaTecnico';

const ContainerGeral = styled.div`

display: grid;
grid-template-columns: auto auto auto auto auto;
border-Radius: 10px;
background: #1a1a1a;
margin: 20px auto;
padding: 10px ;
width :96%;
color:#d9d4cc;
justify-Content:"center";
box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
`;

const BotaoAtendimento = styled.button`{
  margin: 0px;
  padding: 0px ;
  background:#292c2e;
  border: none;

}`;
const ContainerAtendimentos = styled.ul`{
margin: 10px;
grid-column: 1 / 6;
display: grid;
background:#292c2e;
border-Radius: 10px;
border: 2px dashed #4f5659;

  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  
  padding: 10px;
}
`;
const ContainerConfirmacao = styled.ul`{
  margin: 10px;
  grid-column: 1 / 6;
display: grid;
background:#292c2e;
border-Radius: 10px;
border: 2px dashed #4f5659;

  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  
  padding: 10px ;

& h5{

  font-size:14px;
}
}
`;
const BotaoNovo = styled.button`
background: #F38439;
border: none;
margin:0px;
border-Radius: 3px;
padding: 7px 15px;
font-Weight: bold ;
color: white;
&:hover {
    background: #f27018; 
}
`;
const ContainerTop = styled.div`{
  margin: 5px 10px 5px 10px;
  grid-column: 1 / 6;
display: grid;

  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  
  padding: 1px 10px ;

`;

const Input1 = styled.input`{
  float:right;
color:#d9d4cc;
font-size: 1rem;
width: 100%;
padding: 5px 0px 5px 10px;
margin: 0px;
background: #212324;
border-radius: 3px;
border: 0.5px solid #4f5659;
&:focus {
outline: none;
border-color: #0275d8;
box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
}
::placeholder {
  color: #3b3b3b;
}
  }
`;




export function AtendimentosTecnico() {


  let navigate = useNavigate();

  const { iduser } = useAuth();


  const { data, mutate } = useAxios(`/tarefashoje/${iduser}`);

  const datas = useMemo(() => {
    return data || [];
  }, [data])

  const aguardando = useMemo(() => {
    return datas.filter((tarefas) => tarefas.status_tarefa == "aguardando" || tarefas.status_tarefa == "revisado");
  }, [data])

  const naoconcluido = useMemo(() => {
    return datas.filter((tarefas) => tarefas.status_tarefa != "concluido" | tarefas.status_tarefa != "aguardando" || tarefas.status_tarefa != "revisado");
  }, [data])



  return (
    <>
      <SidebarTecnico />
      <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>

        <Topbar title="Minhas Tarefas" />
        <ContainerTop>
          {/*  <BotaoNovo onClick={()=>navigate("/novoatendimento")}> Novo Atendimento</BotaoNovo>*/}
          <BotaoAdd />
          <Input1 placeholder='pesquisar' />
        </ContainerTop>
        <ContainerGeral>


          <h6 style={{ margin: "10px 0px 0px 10px" }}>Aguardando confirmação</h6>

          <ContainerConfirmacao>


            {aguardando?.map((tarefas) => {
              return (

                <CardAtendimento key={tarefas.id_tarefa} id_tarefa={tarefas.id_tarefa} id={tarefas.id_atendimento} servico={tarefas.nome_atendimento} status_tarefa={tarefas.status_tarefa} nome_cliente={tarefas.nome_cliente} nome_usuario={tarefas.nome} data={tarefas.data} hora={tarefas.hora} prioridade={tarefas.prioridade} />
              );
            })}

          </ContainerConfirmacao>
          <h6 style={{ margin: "10px 0px 0px 10px" }}>Marcados</h6>
          <ContainerAtendimentos>
            {naoconcluido?.map((atendimentos) => {
              return (
                <CardTarefaTecnico key={atendimentos.id_tarefa} id_tarefa={atendimentos.id_tarefa} id_atendimento={atendimentos.id_atendimento} servico={atendimentos.nome_atendimento} status_tarefa={atendimentos.status_tarefa} nome_cliente={atendimentos.nome_cliente} nome_usuario={atendimentos.nome} hora={atendimentos.hora} data={atendimentos.data} prioridade={atendimentos.prioridade} revisada={atendimentos.revisada} horario_conclusao1={atendimentos.horario_conclusao} conclusao1={atendimentos.conclusao} />
              );
            })}
          </ContainerAtendimentos>



        </ContainerGeral>

      </div>


    </>
  );
}
export default AtendimentosTecnico