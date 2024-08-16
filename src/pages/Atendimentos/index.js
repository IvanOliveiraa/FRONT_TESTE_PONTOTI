import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import CardAtendimento from '../../components/CardAtendimento';
import useAxios from '../../hooks/useAxios';
import BotaoAdd from '../../components/ModalAddAtendimento';
import useAuth from '../../hooks/useAuth';

const ContainerGeral = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #1a1a1a;
  margin: 20px auto;
  padding: 10px;
  width: 96%;
  color: #d9d4cc;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px;
`;

const BotaoAtendimento = styled.button`
  margin: 0px;
  padding: 0px;
  background: #292c2e;
  border: none;
`;

const ContainerAtendimentos = styled.div`
  margin: 10px;
  width: 90%; /* Cobrir 90% da largura do elemento pai */
  display: grid;
  background: #292c2e;
  border-radius: 10px;
  border: 2px dashed #4f5659;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  padding: 10px;
`;

const ContainerConfirmacao = styled.div`
  margin: 10px;
  width: 90%; /* Cobrir 90% da largura do elemento pai */
  display: flex;
  overflow-x: auto;
  background: #292c2e;
  border-radius: 10px;
  border: 2px dashed #4f5659;
  padding: 10px;

  & > * {
    flex: 0 0 auto;
    margin-right: 10px;
  }

  /* Estiliza a barra de rolagem */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #575757;
    border-radius: 10px;
  }
`;

const ContainerTop = styled.div`
  margin: 5px 10px 5px 10px;
  width: 90%; /* Cobrir 90% da largura do elemento pai */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input1 = styled.input`
  color: #d9d4cc;
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
`;

export function Atendimentos() {
  let navigate = useNavigate();
  const { nivel } = useAuth();

  const { data } = useAxios('/atendimentos');

  // Acesse o array de atendimentos no JSON retornado
  const datas = useMemo(() => {
    return Array.isArray(data?.atendimentos) ? data.atendimentos : [];
  }, [data]);

  const itensPorPagina = 20;
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(datas.length / itensPorPagina);
  const StartIndex = currentPage * itensPorPagina;
  const EndIndex = StartIndex + itensPorPagina;

  const aguardando = useMemo(() => {
    return datas
      .filter(
        (tarefas) => tarefas.status_tarefa === 'aguardando' || tarefas.status_tarefa === 'revisado'
      )
      .slice(StartIndex, EndIndex);
  }, [datas, StartIndex, EndIndex]);

  return (
    <>
      <Sidebar />
      <div style={{ flexDirection: 'column', margin: '0px', padding: '0px', width: '100%' }}>
        <Topbar title="Atendimentos" />
        <ContainerTop>
          <BotaoAdd />
          <Input1 placeholder="pesquisar" />
        </ContainerTop>
        <ContainerGeral>
          <h6 style={{ margin: '10px 0px 0px 10px' }}>Aguardando confirmação</h6>
          <ContainerConfirmacao>
            {aguardando?.map((atendimentos) => (
              <BotaoAtendimento
                key={atendimentos.id_tarefa}
                onClick={() => navigate(`/atendimento/${atendimentos.id}`)}
              >
                <CardAtendimento
                  id={atendimentos.id}
                  servico={atendimentos.nome_atendimento}
                  status={atendimentos.status}
                  status_tarefa={atendimentos.status_tarefa}
                  nome_cliente={atendimentos.nome_cliente}
                  nome_usuario={atendimentos.nome}
                  hora={atendimentos.hora}
                  data={atendimentos.data}
                  prioridade={atendimentos.prioridade}
                />
              </BotaoAtendimento>
            ))}
          </ContainerConfirmacao>

          <h6 style={{ margin: '10px 0px 0px 10px' }}>Atendimentos</h6>
          <ContainerAtendimentos>
            {datas?.map((atendimentos) => (
              <BotaoAtendimento
                key={atendimentos.id_tarefa}
                onClick={() => navigate(`/atendimento/${atendimentos.id}`)}
              >
                <CardAtendimento
                  id={atendimentos.id}
                  servico={atendimentos.nome_atendimento}
                  status={atendimentos.status}
                  status_tarefa={atendimentos.status_tarefa}
                  nome_cliente={atendimentos.nome_cliente}
                  nome_usuario={atendimentos.nome}
                  hora={atendimentos.hora}
                  prioridade={atendimentos.prioridade}
                />
              </BotaoAtendimento>
            ))}
          </ContainerAtendimentos>
        </ContainerGeral>
      </div>
    </>
  );
}

export default Atendimentos;
