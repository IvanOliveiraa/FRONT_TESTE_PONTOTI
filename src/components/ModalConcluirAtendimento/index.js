import React, { useState } from 'react';
import InputMask from "react-input-mask";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup } from 'reactstrap';
import styled from 'styled-components';
import axios from '../../api/axios';
import moment from 'moment';

import { IoCheckmarkCircle } from "react-icons/io5";

const BotaoConfirma = styled.button`{
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
      background: #4CAF50;

    }
  
}`;
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
    }`;

const BotaoConcluirAtendimento = ({ id1, nivel, horario_conclusao2, conclusao2 }) => {

  const [modal, setModal] = useState(false);


  let datacerto = (moment(horario_conclusao2).format('YYYY-MM-DD'))
  let timecerto = (moment(horario_conclusao2).format('HH:mm'))
  let datatimecerto = ((datacerto) + "T" + (timecerto))

  const [conclusao, setConclusao] = useState('');
  const [hora, setHora] = useState('');

  const toggle = () => {
    setModal(!modal)
    setConclusao(conclusao2);
    setHora(datatimecerto);
  };




  function handleSubmit(event) {
    const datafunc = {
      conclusao, hora, nivel
    }

    const Info = {
      method: 'put',
      body: JSON.stringify(datafunc),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    axios.put(`/atendimento/confirmar/${id1}`, datafunc);
    console.log(datafunc);
    console.log(event);
    setModal(false);
    window.location.reload(1);

  }


  return (
    <>

      <Button style={{ marginTop: "10px" }} onClick={toggle}>
        Concluir Atendimento
      </Button>
      <Form onSubmit={handleSubmit}>
        <Modal centered
          fullscreen="lg"
          scrollable isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Concluir Tarefa </ModalHeader>

          <ModalBody>
            <p>
              Deseja realmente Concluir todas as tarefas desse atendimento?
            </p>
            <FormGroup className="col" >
              <Label1 for="endereco">Hora:</Label1>
              <Input1 type={"datetime-local"}
                value={hora}
                onChange={e => setHora(e.target.value)}

              />

            </FormGroup>
            <FormGroup>
              <Label1 for="Nome">Conclusão:</Label1>
              <Text1 type="text-area" id="conclusao" onChange={e => setConclusao(e.target.value)} value={conclusao} required="required" placeholder="Digite a conslusão do serviço" />
            </FormGroup>


          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-evenly' }}>

            <Button style={{ width: '35%' }} color="danger" onClick={toggle}>
              Cancelar
            </Button>
            <Button style={{ width: '35%' }} color="success" onClick={handleSubmit}>
              Concluir
            </Button>
          </ModalFooter>

        </Modal>
      </Form>
    </>)
}

export default BotaoConcluirAtendimento;