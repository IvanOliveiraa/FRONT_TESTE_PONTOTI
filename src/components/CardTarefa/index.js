import React from 'react';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import {IoReceiptSharp,IoTrashBinSharp } from "react-icons/io5";
import BotaoDeleteTarefa from '../ModalDeleteTarefa';
import BotaoConcluir from '../ModalConcluir';
import moment from 'moment';


const ContainerCard = styled.li`{
  display: inline-block;
  vertical-align: top;
  margin-bottom:10px;
  width: 170px;
  height: 150px;
  transition: transform .2s;
  border: 5px solid #1a1a1a;
  color: ${(props)=>(props.status=="aguardando"?"#fce6b1":props.status=="concluido"?"#cff9cc":props.status=="revisado"?"#c4eefd":"white")};
  
  text-decoration: none;
  border-radius: 5px;
  background: ${(props)=>(props.prioridade?"#1a1a1a":"#1a1a1a")};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  :hover{
    box-shadow: rgba(0, 0, 0, 0.3) 1px 2px 6px, rgba(0, 0, 0, 0.5) 0px 2px 4px;
    
  }
  
}`;
const HeaderCard = styled.div`{
  font-size:16px;
  width:100%;
  text-align:center;
  justify: center;
  font-weight: bold;
  
    padding: 0px 2px ;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    hover:{

    }
    
  
  
}`;
const Bodycard = styled.div`{
  text-align:center;
  height: 70px;
  border-radius: 5px;
  font-size:11px;
  width:100%;
  text-align:left;
  background:#292c2e;
  color:#A9A9A9;
  & p{
    padding: 0px 0px 0px 4px;
    
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

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
      background: ${(props)=>(props.cor==="vermelho"?"#ff1925":props.cor==="verde"?"#4CAF50":"#292c2a")};
      
    }
  
}`;


const CardTarefa = ({titulo,id_atendimento,id_tarefa, servico, status_tarefa, nome_cliente, nome_usuario,data, hora, prioridade,horario_conclusao1,conclusao1,revisada }) =>{ 
 
  const {nivel}=useAuth();
if (nivel==="administrador") {
  return (
    <ContainerCard status={status_tarefa} prioridade={prioridade} > 
        <HeaderCard status={status_tarefa} >
     {nome_usuario} 
        </HeaderCard>
        <Bodycard>
        
        <p>
        
        {servico} <br/>
        {moment(data).format(' DD / MM / YYYY')}<br/>
        {hora.substr(0, 5)}<br/>
        
        
        {status_tarefa} <br/>
        </p>
        </Bodycard>
        <Footercard>
        
          
          <BotaoFooter>
            <IoReceiptSharp/>
          </BotaoFooter>
          
          <BotaoDeleteTarefa id={id_tarefa}/>
          <BotaoConcluir  id1={id_tarefa} horario_conclusao2={horario_conclusao1} conclusao2={conclusao1} nivel={"administrador"} />

        </Footercard>
        
    </ContainerCard>
) 
}
else if (nivel==="administrativo") {
  return (
    <ContainerCard status={status_tarefa} prioridade={prioridade} > 
        <HeaderCard status={status_tarefa} >
     {nome_usuario} 
        </HeaderCard>
        <Bodycard>
        
        <p>
        
        {servico} <br/>
        {moment(data).format(' DD / MM / YYYY')}<br/>
        {hora.substr(0, 5)}<br/>
        
        
        {status_tarefa} <br/>
        </p>
        </Bodycard>
        <Footercard>
        
          
          <BotaoFooter>
            <IoReceiptSharp/>
          </BotaoFooter>
          
          <BotaoFooter>
            <IoTrashBinSharp/>
          </BotaoFooter>
          <BotaoConcluir  id1={id_tarefa} horario_conclusao2={horario_conclusao1} conclusao2={conclusao1} nivel={"administrativo"} />

        </Footercard>
        
    </ContainerCard>
) 
}
  };

export default CardTarefa;


