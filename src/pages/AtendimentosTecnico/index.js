import React, { useMemo } from 'react';
import Topbar from '../../components/Topbar';

import styled from 'styled-components';
import CardAtendimento from '../../components/CardAtendimento';
import useAxios from '../../hooks/useAxios';
import BotaoAdd from '../../components/ModalAddAtendimento';
import useAuth from '../../hooks/useAuth';
import CardTarefaTecnico from '../../components/CardTarefaTecnico';

const ContainerGeral = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #1a1a1a;
  margin: 20px auto;
  padding: 0px;
  width: 96%;
  color: #d9d4cc;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px;
`;


const ContainerAtendimentos = styled.div`
  margin: 10px;
  width: 90%;
  display: grid;
  background: #292c2e;
  border-radius: 10px;
  border: 2px dashed #4f5659;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px; /* Espaçamento entre os cards */
  padding: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 card por linha em telas pequenas */
  }
`;

const ContainerConfirmacao = styled.ul`
  margin: 10px;
  grid-column: 1 / 6;
  display: grid;
  background: #292c2e;
  border-radius: 10px;
  border: 2px dashed #4f5659;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px; /* Espaçamento entre os cards */
  padding: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 card por linha em telas pequenas */
  }

  & h5 {
    font-size: 14px;
  }
`;

const ContainerTop = styled.div`{
  margin: 5px 10px 5px 10px;
  grid-column: 1 / 6;
display: grid;

  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  
  padding: 1px 10px ;

`;





export function AtendimentosTecnico() {



  const { iduser } = useAuth();


  const { data, mutate } = useAxios(`/tarefashoje/${iduser}`);

  const datas = useMemo(() => {
    return data || [];
  }, [data])

  const aguardando = useMemo(() => {
    return datas.filter((tarefas) => tarefas.status_tarefa === "aguardando" || tarefas.status_tarefa === "revisado");
  }, [data])

  const naoconcluido = useMemo(() => {
    return datas.filter((tarefas) => tarefas.status_tarefa !== "concluido" | tarefas.status_tarefa !== "aguardando" || tarefas.status_tarefa !== "revisado");
  }, [data])



  return (
    <>
      <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>

        <Topbar title="Minhas Tarefas" />
        <ContainerTop>

          <BotaoAdd />
        </ContainerTop>
        <ContainerGeral>


          <h6 style={{ margin: "10px 0px 0px 10px" }}>Marcados</h6>
          <ContainerAtendimentos>
            {naoconcluido?.map((atendimentos) => {
              return (
                <CardTarefaTecnico
                  key={atendimentos.id_tarefa}
                  id_tarefa={atendimentos.id_tarefa}
                  id_atendimento={atendimentos.id_atendimento}
                  servico={atendimentos.nome_atendimento}
                  status_tarefa={atendimentos.status_tarefa}
                  nome_cliente={atendimentos.nome_cliente}
                  nome_usuario={atendimentos.nome}
                  hora={atendimentos.hora}
                  data={atendimentos.data}
                  prioridade={atendimentos.prioridade}
                  revisada={atendimentos.revisada}
                  horario_conclusao1={atendimentos.horario_conclusao}
                  conclusao1={atendimentos.conclusao}
                  pendencia={atendimentos.pendencia}
                  pendeciaDesc={atendimentos.pendenciaDescricao} />
              );
            })}
          </ContainerAtendimentos>

          <h6 style={{ margin: "10px 0px 0px 10px" }}>Aguardando confirmação</h6>
          <ContainerConfirmacao>


            {aguardando?.map((tarefas) => {
              return (

                <CardAtendimento key={tarefas.id_tarefa} id_tarefa={tarefas.id_tarefa} id={tarefas.id_atendimento} servico={tarefas.nome_atendimento} status_tarefa={tarefas.status_tarefa} nome_cliente={tarefas.nome_cliente} nome_usuario={tarefas.nome} data={tarefas.data} hora={tarefas.hora} prioridade={tarefas.prioridade} />
              );
            })}

          </ContainerConfirmacao>



        </ContainerGeral>

      </div>


    </>
  );
}
export default AtendimentosTecnico