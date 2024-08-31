import React, { useState } from 'react';
import InputMask from "react-input-mask";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BotaoNovo = styled.button`
background: #F38439;
border: none;
margin: 1% 2% 0% 2%;
float: left;
border-Radius: 3px;
padding: 7px 15px;
font-Weight: bold ;
color: white;
&:hover {
    background: #f27018; 
}
`;



const BotaoAdd = () => {
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [nome, setNome] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const datafunc = {
      nome
    }

    const Info = {
      method: 'POST',
      body: JSON.stringify(datafunc),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    axios.post('/tiposatendimentos/insert', datafunc)
      .then((response) => {
        // Aqui você pode verificar a resposta e tomar alguma ação específica, se necessário
        setModal(false);
        window.location.reload(1);  // Recarrega a página após a conclusão da requisição
      })
      .catch((error) => {
        console.error("Houve um erro ao adicionar o atendimento:", error);
        // Aqui você pode adicionar alguma lógica para tratar erros, se necessário
      });


  }

  return (
    <div style={{ textAlign: "center" }}>

      <BotaoNovo onClick={toggle}>Novo Atendimento</BotaoNovo>
      <Form onSubmit={handleSubmit}>
        <Modal centered
          size="lg"
          scrollable isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Novo Atendimento</ModalHeader>

          <ModalBody style={{ height: "20vh" }}>

            <FormGroup>
              <Label for="Nome">Nome</Label>
              <Input type="text" id="nome" onChange={e => setNome(e.target.value)} value={nome} required="required" placeholder="Informe o nome" />
            </FormGroup>



          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-evenly' }}>

            <Button style={{ width: '35%' }} color="danger" onClick={toggle}>
              Cancelar
            </Button>
            <Button style={{ width: '35%' }} color="success" onClick={handleSubmit}>
              Adicionar
            </Button>
          </ModalFooter>

        </Modal>
      </Form>
    </div>
  );

};

export default BotaoAdd;