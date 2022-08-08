import React from 'react';
import styled from 'styled-components';
import { IoReceiptSharp } from "react-icons/io5";
import BotaoConcluir from '../ModalConcluir';
import moment from 'moment';


const ContainerCard = styled.li`{
  display: inline-block;
  vertical-align: top;
  margin-bottom:10px;
  width: 170px;
  height: 170px;
  border: none;
  transition: transform .2s;
  border: 5px solid #1a1a1a;
  
  text-decoration: none;
  border-radius: 5px;
  background: ${(props)=>(props.prioridade?"#1a1a1a":"#1a1a1a")};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  
  
}`;
const HeaderCard = styled.div`{
  font-size:16px;
  width:100%;
  text-align:center;
  justify: center;
  font-weight: bold;
  color:white;

}`;
const Bodycard = styled.div`{
  text-align:center;
  height: 90px;
  border-radius: 5px;
  font-size:11px;
  width:100%;
  text-align:left;
  background:#292c2e;
  color:#A9A9A9;
  & p{
    padding: 0px 0px 0px 4px;
  }

}`;
const Footercard = styled.div`{
  font-weight: bold;
  margin-top:5px;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  border: 1px solid transparent;
  text-align:center;
  color:#A9A9A9;
  display:flex;
  justify-content: space-evenly;
  & p{
    padding: 0px 0px 0px 0px;
  }

}`;
const BotaoFooter=styled.button`{
  border:none;
  background:#292c2e;
  cursor: pointer;
  border-radius: 5px;
  transition: opacity 0.2 ease-out;
  
  svg{
    height: 25px;
    width: 25px;
    color:#d9d4cc;
  }
  
    :hover{
      background:#0057cc;
      box-shadow: rgba(173, 216, 230, 0.2) 1px 2px 6px, rgba(173, 216, 230, 0.2) 0px 2px 4px;
      
    }
  
}`;
const BotaoFooter2=styled.button`{
  border:none;
  width:90%;
  border-radius: 5px;
  background:#4BB543;
  cursor: pointer;
  transition: opacity 0.2 ease-out;
  color:white;
  font-weight: bold;
  
  svg{
    height: 25px;
    width: 25px;
    color:#A9A9A9;
  }
  :hover{
    background:#4CAF50;
  }
}`;


const CardTarefaTecnico = ({id_atendimento,id_tarefa, servico, status_tarefa, nome_cliente, nome_usuario,data, hora, prioridade, horario_conclusao1,conclusao1,revisada }) => {


  
  return(
    <ContainerCard  prioridade={prioridade} > 
        <HeaderCard>
       {servico}
        </HeaderCard>
        <Bodycard>
        <p>
        
        #{id_atendimento}-{nome_cliente} <br/>
        {moment(data).format(' DD / MM / YYYY')}<br/>
        {hora.substr(0, 5)}<br/>
        
        {status_tarefa} <br/>
        </p>
        </Bodycard>
        <Footercard>
          
        <BotaoFooter>
            <IoReceiptSharp/>
          </BotaoFooter>
        <BotaoConcluir id1={id_tarefa}  horario_conclusao2={horario_conclusao1} conclusao2={conclusao1} nivel={"tecnico"}/>
        </Footercard>
        
    </ContainerCard>
)};

export default CardTarefaTecnico;


