import React from 'react';
import styled from 'styled-components';
import BotaoConcluir from '../ModalConcluir';
import ModalTarefasDetalhes from '../ModalTarefasDetalhes'; // Import the updated modal component
import moment from 'moment';

const ContainerCard = styled.li`
  display: inline-block;
  vertical-align: top;
  justify-content: space-around;
  margin-bottom: 10px;
  min-width: 200px;
  min-height: 170px;
  border: none;
  transition: transform .2s;
  border: 5px solid #1a1a1a;
  text-decoration: none;
  border-radius: 5px;
  background: ${(props) => (props.prioridade ? "#1a1a1a" : "#1a1a1a")};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const HeaderCard = styled.div`
  font-size: 16px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: white;
`;

const Bodycard = styled.div`
  text-align: left;
  height: 90px;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
  background: #292c2e;
  color: #A9A9A9;
  & p {
    padding: 0px 0px 0px 4px;
  }
`;

const Footercard = styled.div`
  font-weight: bold;
  margin-top: 5px;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
`;

const CardTarefaTecnico = ({ id_atendimento, id_tarefa, servico, status_tarefa, nome_cliente, nome_usuario, data, hora, prioridade, horario_conclusao1, conclusao1, pendencia, pendeciaDesc }) => {
  return (
    <ContainerCard prioridade={prioridade}>
      <HeaderCard>
        {id_tarefa} - {servico}
      </HeaderCard>
      <Bodycard>
        <p>
          #{id_atendimento}-{nome_cliente} <br />
          {moment(data).format(' DD / MM / YYYY')}<br />
          {hora.substr(0, 5)}<br />
          {status_tarefa} <br />
        </p>
      </Bodycard>
      <Footercard>
        <ModalTarefasDetalhes id_tarefa={id_tarefa} />
        <BotaoConcluir
          id1={id_tarefa}
          horario_conclusao2={horario_conclusao1}
          conclusao2={conclusao1} nivel={"tecnico"}
          pendencia={pendencia}
          pendeciaDesc={pendeciaDesc} />
      </Footercard>
    </ContainerCard>
  );
};

export default CardTarefaTecnico;
