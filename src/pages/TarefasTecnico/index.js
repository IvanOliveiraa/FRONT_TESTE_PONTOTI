import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';
import CardTarefa from '../../components/CardTarefa';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Voltar from '../naoautorizada';


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

const MensagemSemTarefas = styled.h1`
  color: #d9d4cc;
  text-align: center;
  margin: 20px 0;
`;

export function TarefasTecnico() {
  const { id } = useParams();
  const { data, loading, error } = useAxios(`/tarefas/${id}`);
  let navigate = useNavigate();
  const { nivel } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('nivel') == null) {
      navigate("/");
    } else {
      var nivel2 = localStorage.getItem('nivel');
      if (nivel2 === 'tecnico') {
        navigate("/atendimentostecnico");
      }
    }
  }, [navigate]);

  if (nivel !== 'administrador' && nivel !== 'administrativo') {
    return <Voltar />;
  }

  return (
    <>
      <Sidebar />
      <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>
        <Topbar title="Tarefas do Técnico" />
        <ContainerGeral>
          {loading ? (
            <MensagemSemTarefas>Carregando tarefas...</MensagemSemTarefas>
          ) : error ? (
            <MensagemSemTarefas>Erro ao carregar tarefas. Por favor, tente novamente.</MensagemSemTarefas>
          ) : data && data.length > 0 ? (
            <ContainerAtendimentos>
              {data.map((tarefas) => (
                <CardTarefa
                  key={tarefas.id_tarefa}
                  nivel={nivel}
                  id_tarefa={tarefas.id_tarefa}
                  id_atendimento={tarefas.id_atendimento}
                  servico={tarefas.nome_atendimento}
                  data={tarefas.data}
                  status_tarefa={tarefas.status_tarefa}
                  nome_cliente={tarefas.nome_cliente}
                  nome_usuario={tarefas.nome}
                  hora={tarefas.hora}
                  prioridade={tarefas.prioridade}
                  revisada={tarefas.revisada}
                  horario_conclusao1={tarefas.horario_conclusao}
                  conclusao1={tarefas.conclusao}
                  pendencia={tarefas.pendencia}
                  pendeciaDesc={tarefas.pendenciaDescricao}
                />
              ))}
            </ContainerAtendimentos>
          ) : (
            <MensagemSemTarefas>Este usuário não tem tarefas</MensagemSemTarefas>
          )}
        </ContainerGeral>
      </div>
    </>
  );
}
export default TarefasTecnico