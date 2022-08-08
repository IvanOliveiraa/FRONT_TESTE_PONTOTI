import React, { Component } from 'react';
import {  useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button,Modal,ModalBody,ModalFooter,ModalHeader, Form,FormGroup,Label,Input,Body,Footer } from 'reactstrap'; 
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import useAxios from '../../../hooks/useAxios';
import Config from '../../../config';

const ContainerGeral = styled.div`
border-Radius: 10px;
background: white;
flex-Direction: column;
margin: 20px auto;
padding:10px 40px 40px 40px;
width :90%;
justify-Content:"center";
box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
`;
/*
const Label1 = styled.label`
color: #303030;
font-size: 16px;
    `;

    const Input1 = styled.input`
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    background: #F5F5F5;
    border-radius: 3px;
    border: 0.5px solid #A9A9A9;
  &:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
  }
    ::placeholder {
      color: #A9A9A9;
    }
      }
    `;
    const Select1 = styled.select`
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    background: #F5F5F5;
    border-radius: 3px;
    border: 0.5px solid #A9A9A9;
    &:focus {
      outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
    }
      

  option {
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    background: #F5F5F5;
    border-radius: 3px;
    border: 0.5px solid #A9A9A9;
    &:focus {
      outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
    }
  }
`;
const Text1 = styled.textarea`
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    background: #F5F5F5;
    border-radius: 3px;
    border: 0.5px solid #A9A9A9;
    &:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
    }`;*/


export function Tarefas () {
  const{id}= useParams();
  const{data}= useAxios(`/`);
  
  const [atendimento, setAtendimento] = useState( [] );
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${Config.backend}/atendimento/${id}`);
      const atendimentoData = await response.json();
      setAtendimento(atendimentoData);
    };
    fetchPosts();
  }, []);


        return (<>
         <title>Ponto TI</title>
           <Sidebar/>      
            
       <div style={{ flexDirection: "column", margin:'0px',padding:'0px', width :'100%'}}>
                <Topbar title="Atendimento"/>
               
                <ContainerGeral >
                {atendimento?.map((tarefas)=>{
    return(<>
    <div >
      <div style={{textAlign: "center"}}>
      <h4 style={{textTransform: "uppercase",fontWeight:"bold"}}>
   #{tarefas.id} {tarefas.nome_cliente}
   <hr style={{margin: "2px",color:"lightgray"}}/>
    </h4>
      </div>
    <p >
    <strong>Servico: </strong> {tarefas.nome_atendimento}<br/>
    <strong>Status: </strong> {tarefas.status}<br/>
    <strong>Contato: </strong> {tarefas.telefone_cliente} - {tarefas.responsavel}<br/>
    <strong>Endereço: </strong> {tarefas.endereco}<br/>
    </p>

    </div>
    </>
    );
})}
                <hr my-3/>
                {id}
                </ContainerGeral>


                </div>
            
            </>
        );
    }
export default Tarefas