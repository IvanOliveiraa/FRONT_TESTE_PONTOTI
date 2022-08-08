import React from 'react';
import { ContainerCard, HeaderCard, Bodycard } from "./style";
import moment from 'moment';



const CardAtendimento = ({id, servico, data, status,status_tarefa, nome_cliente, nome_usuario, hora, prioridade }) => (
  
  
    <ContainerCard prioridade={prioridade}> 
        <HeaderCard prioridade={prioridade}>
          #{id} {nome_cliente}
        </HeaderCard>
        <Bodycard>
        <p>
        {servico} <br/>
        {nome_usuario}<br/>
        {hora.substr(0, 5)} -- {moment(data).format(' DD/MM/YYYY')}
         <br/>
        {status_tarefa} <br/>
        </p>
        </Bodycard>
    </ContainerCard>
);

export default CardAtendimento;