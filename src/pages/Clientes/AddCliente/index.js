import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { useState } from 'react';
import { Button,Modal,ModalBody,ModalFooter,ModalHeader, Form,FormGroup,Label,Input,Body,Footer } from 'reactstrap'; 
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const ContainerGeral = styled.div`
border-Radius: 10px;
background: #1a1d1e;
flex-Direction: column;
margin: 20px auto;
padding:10px 40px 40px 40px;
width :90%;
justify-Content:"center";
box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
`;

const Label1 = styled.label`
color: #d9d4cc;
font-size: 16px;
    `;

    const Input1 = styled.input`
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
    const Select1 = styled.select`
    color:#d9d4cc;
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    background: #212324;
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
background: #212324;
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    border-radius: 3px;
    border: 0.5px solid #A9A9A9;
    &:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
    }`;


export function AddCliente () {


  const[nome, setNome]= useState('');
  const[email, setEmail]= useState('');
  const[telefone, setTelefone]= useState('');
  const[responsavel, setResponsavel]= useState('');
  const[endereco, setEndereco]= useState('');

  function handleSubmit(){
    const datafunc = {
      nome, email, responsavel, telefone, endereco  
    }
    
    const Info = {
      method: 'POST',
      body: JSON.stringify(datafunc),
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
  };
    axios.post('/cliente/insert',datafunc);
    navigate("/clientes")
    window.location.reload(1)
  
  }

  let navigate = useNavigate();

        return (<>
           <Sidebar/>      
            
       <div style={{ flexDirection: "column", margin:'0px',padding:'0px', width :'100%'}}>
                <Topbar title="Novo Cliente"/>
               
                <ContainerGeral >
                <form onSubmit={handleSubmit}>
     
        
                <FormGroup>
                        <Label1 for="nome">Nome</Label1>
                        <Input1 type="text" id="nome" onChange={e => setNome (e.target.value)} value={nome} required="required" placeholder="Informe o nome" />
                    </FormGroup>
                    <FormGroup className="">
                        <Label1 for="responsavel">Responsavel</Label1>
                        <Input1 type="text" id="responsavel" onChange={e => setResponsavel (e.target.value)} value={responsavel} required="required" 
                mask="999.999.999-99" placeholder="Informe o responsavel" />
                    </FormGroup>
                   
                    <div class="row">
          
                    <FormGroup className="col-md-6" >
                        <Label1 for="email">Email</Label1>
                        <Input1 type="text" id="email" onChange={e => setEmail (e.target.value)} value={email} required="required" placeholder="Informe o e-mail" />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                        <Label1 for="telefone">Telefone</Label1>
                        <Input1 type="text" id="telefone" onChange={e => setTelefone (e.target.value)} value={telefone} required="required" placeholder="Informe o telefone" 
                        as={InputMask} mask="(99) 99999-9999"
                        />
                    </FormGroup>
                    </div>
                    <FormGroup >
                        <Label1 for="endereco">Endereço</Label1>
                        <Text1 type="text-area" id="endereco" onChange={e => setEndereco (e.target.value)} value={endereco} required="required" placeholder="Informe o endereço" />
                    </FormGroup>
          
                    
                   
                    
       
        <div style={{flexDirection: "row", justifyContent: "space-between",display:'flex', alignItems:"center"}}>
          
          <Button style={{width:'35%' }} color="danger" onClick={()=> navigate('/clientes')}>
            Cancelar
          </Button>
          <Button style={{width:'35%' }} color="success" onClick={handleSubmit}>
           Adicionar usuario
          </Button>
        </div>
    
      </form>
                </ContainerGeral>


                </div>
            
            </>
        );
    }
export default AddCliente