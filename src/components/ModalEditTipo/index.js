import React, { useState } from 'react';
import InputMask from "react-input-mask";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
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

const BotaoEdit = ({ id1, nome1 }) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [nome, setNome] = useState(nome1);



  function handleSubmit(event) {
    const datafunc = {
      nome
    }

    const Info = {
      method: 'put',
      body: JSON.stringify(datafunc),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    axios.put(`/tipoatendimento/update/${id1}`, datafunc)
      .then((response) => {
        // Aqui você pode verificar a resposta e tomar alguma ação específica, se necessário
        setModal(false);
        window.location.reload(1);  // Recarrega a página após a conclusão da requisição
      })
      .catch((error) => {
        console.error("Houve um erro ao editar o atendimento:", error);
        // Aqui você pode adicionar alguma lógica para tratar erros, se necessário
      });

  }

  return (
    <>

      <Button color="primary" size="sm" style={{ marginLeft: '10px' }} onClick={toggle}>Editar</Button>
      <Form onSubmit={handleSubmit}>
        <Modal centered
          fullscreen="lg"
          scrollable isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Editar Tipo de Atendimento</ModalHeader>

          <ModalBody style={{}}>

            <FormGroup>
              <Label1 for="Nome">Nome</Label1>
              <Input1 type="text" id="nome" onChange={e => setNome(e.target.value)} value={nome} required="required" placeholder="Informe o nome" />
            </FormGroup>


          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-evenly' }}>

            <Button style={{ width: '35%' }} color="danger" onClick={toggle}>
              Cancelar
            </Button>
            <Button style={{ width: '35%' }} color="success" onClick={handleSubmit}>
              Salvar
            </Button>
          </ModalFooter>

        </Modal>
      </Form>
    </>
  );
};

export default BotaoEdit;