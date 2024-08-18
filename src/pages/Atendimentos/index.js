import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import CardAtendimento from '../../components/CardAtendimento';
import useAxios from '../../hooks/useAxios';
import BotaoAdd from '../../components/ModalAddAtendimento';

const BotaoAtendimento = styled.button`
  margin: 0px;
  padding: 0px;
  background: #292c2e;
  border: none;
`;

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
  padding: 10px;
`;

const ContainerConfirmacao = styled.div`
  margin: 10px;
  width: 90%;
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

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #575757;
    border-radius: 10px;
  }
`;

const ContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around ;
  border-radius: 10px;
  margin: auto;
  padding: 10px;
  width: 96%;
`;

const Input1 = styled.input`
  color: #d9d4cc;
  font-size: 1rem;
  width: 70%;
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

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  & > button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    background-color: #292c2e;
    color: #d9d4cc;
    border-radius: 5px;
    cursor: pointer;
  }

  & > span {
    margin: 0 10px;
    color: #d9d4cc;
  }
`;

export function Atendimentos() {
  const navigate = useNavigate();

  // Requisição para os atendimentos aguardando confirmação
  const { data: aguardandoData } = useAxios('/atendimentos/aguardando');
  const { data: allAtendimentos } = useAxios('/atendimentos');

  const itensPorPagina = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // Dados paginados para atendimentos gerais
  const paginatedData = useMemo(() => {
    const datas = Array.isArray(allAtendimentos?.atendimentos) ? allAtendimentos.atendimentos : [];
    const StartIndex = currentPage * itensPorPagina;
    const EndIndex = StartIndex + itensPorPagina;
    return datas.slice(StartIndex, EndIndex);
  }, [allAtendimentos, currentPage]);

  const totalPages = Math.ceil((allAtendimentos?.atendimentos?.length || 0) / itensPorPagina);

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
            {aguardandoData?.atendimentos?.map((atendimento) => (
              <BotaoAtendimento
                key={atendimento.id_tarefa}
                onClick={() => navigate(`/atendimento/${atendimento.id}`)}
              >
                <CardAtendimento
                  id={atendimento.id}
                  servico={atendimento.nome_atendimento}
                  status={atendimento.status}
                  status_tarefa={atendimento.status_tarefa}
                  nome_cliente={atendimento.nome_cliente}
                  nome_usuario={atendimento.nome}
                  hora={atendimento.hora}
                  data={atendimento.data}
                  prioridade={atendimento.prioridade}
                  pendente={atendimento.pendente}
                />
              </BotaoAtendimento>
            ))}
          </ContainerConfirmacao>

          <h6 style={{ margin: '10px 0px 0px 10px' }}>Atendimentos</h6>
          <ContainerAtendimentos>
            {paginatedData.map((atendimento) => (
              <BotaoAtendimento
                key={atendimento.id_tarefa}
                onClick={() => navigate(`/atendimento/${atendimento.id}`)}
              >
                <CardAtendimento
                  id={atendimento.id}
                  servico={atendimento.nome_atendimento}
                  status={atendimento.status}
                  status_tarefa={atendimento.status_tarefa}
                  nome_cliente={atendimento.nome_cliente}
                  nome_usuario={atendimento.nome}
                  hora={atendimento.hora}
                  prioridade={atendimento.prioridade}
                />
              </BotaoAtendimento>
            ))}
          </ContainerAtendimentos>

          <PaginationButtons>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
              Anterior
            </button>
            <span>
              Página {currentPage + 1} de {totalPages}
            </span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
              Próximo
            </button>
          </PaginationButtons>
        </ContainerGeral>
      </div>
    </>
  );
}

export default Atendimentos;
