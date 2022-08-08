import React, { useState } from 'react';
import InputMask from "react-input-mask";

import { Button,Modal,ModalBody,ModalFooter,ModalHeader, Form,FormGroup,Label,Input } from 'reactstrap'; 
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';



const BotaoAdd = () => {
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const[nome, setNome]= useState('');
  const[email, setEmail]= useState('');
  const[cpf, setCpf]= useState('');
  const[telefone, setTelefone]= useState('');
  const[senha, setSenha]= useState('');
  const[nivel, setNivel]= useState('');

  function handleSubmit(event){
    event.preventDefault();
    const datafunc = {
      nome, email, cpf, telefone, senha, nivel  
    }
    
    const Info = {
      method: 'POST',
      body: JSON.stringify(datafunc),
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
  };
    axios.post('/usuario/insert',datafunc);
    setModal(false);
    navigate("/funcionarios")
  
  }
 
  return (
    <div style={{ textAlign: "center" }}>
      
      <Form onSubmit={handleSubmit}>
        
      <Button onClick={toggle}>Novo usuario</Button>

      <Modal  centered
    fullscreen="lg"
    scrollable isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Novo Usuario</ModalHeader>
        
        <ModalBody style={{ height: "75vh" }}>
          
                    <FormGroup>
                        <Label for="Nome">Nome</Label>
                        <Input type="text" id="nome" onChange={e => setNome (e.target.value)} value={nome} required="required" placeholder="Informe o nome" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => setEmail (e.target.value)} value={email} required="required" placeholder="Informe o e-mail" />
                    </FormGroup>
                    <div class="row">
                    <FormGroup className="col-md-6">
                        <Label for="cpf">CPF</Label>
                        <Input type="text" id="cpf" onChange={e => setCpf (e.target.value)} value={cpf} required="required" as={InputMask}
         
                mask="999.999.999-99" placeholder="Informe o cpf" />
                    </FormGroup>
                    
                    <FormGroup className="col-md-6">
                        <Label for="telefone">Telefone</Label>
                        <Input type="text" id="telefone" onChange={e => setTelefone (e.target.value)} value={telefone} required="required" placeholder="Informe o telefone" />
                    </FormGroup>
                    </div>
                    <FormGroup >
                        <Label for="senha">Senha</Label>
                        <Input type="text" id="senha" onChange={e => setSenha (e.target.value)} value={senha} required="required" placeholder="Inform seu e-mail" />
                    </FormGroup>
                   <FormGroup>
                     <Label> Nivel</Label>
                     <Input type='select' id="nivel" onChange={e => setNivel (e.target.value)} value={nivel}>
                       <option >funcionario</option>
                       <option >administrador</option>
                     </Input>
                   </FormGroup>
                    
                   
                    
        </ModalBody>
        <ModalFooter style={{justifyContent:'space-evenly' }}>
          
          <Button style={{width:'35%' }} color="danger" onClick={toggle}>
            Cancelar
          </Button>
          <Button style={{width:'35%' }} color="success" onClick={handleSubmit}>
           Adicionar usuario
          </Button>
        </ModalFooter>
        
      </Modal>
      </Form>
    </div>
  );
  };

export default BotaoAdd ;