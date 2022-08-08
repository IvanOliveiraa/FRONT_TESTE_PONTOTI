import React, { useState } from 'react';
import InputMask from "react-input-mask";

import { Button,Modal,ModalBody,ModalFooter,ModalHeader, Form,FormGroup,Label,Input } from 'reactstrap'; 
import styled from 'styled-components';
import axios from '../../api/axios';

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

const BotaoEdit = ({id1, email1, nome1, responsavel1, telefone1, endereco1 }) => {
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const[nome, setNome]= useState(nome1);
  const[email, setEmail]= useState(email1);
  const[telefone, setTelefone]= useState(telefone1);
  const[responsavel, setResponsavel]= useState(responsavel1);
  const[endereco, setEndereco]= useState(endereco1);
 

  
  function handleSubmit(event){
    const datafunc = {
      nome, email, responsavel, telefone, endereco 
    }
    const Info = {
      method: 'put',
      body: JSON.stringify(datafunc),
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
  };
    axios.put(`/cliente/update/${id1}`,datafunc);
    setModal(false);
    window.location.reload(1)
  
  }
 
  return (
    <>
      
      <Button  color="primary"size="sm"style={{marginLeft:'10px'}} onClick={toggle}>Editar</Button>
      <Form onSubmit={handleSubmit}>
      <Modal  centered
    fullscreen="lg"
    scrollable isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Cliente</ModalHeader>
        
        <ModalBody style={{  }}>
          
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
                    
                   
                    
        </ModalBody>
        <ModalFooter style={{justifyContent:'space-evenly' }}>
          
          <Button style={{width:'35%' }} color="danger" onClick={toggle}>
            Cancelar
          </Button>
          <Button style={{width:'35%' }} color="success" onClick={handleSubmit}>
           Salvar
          </Button>
        </ModalFooter>
        
      </Modal>
      </Form>
    </>
  );
  };

export default BotaoEdit ;