import React, { useState, useEffect } from 'react';
import InputMask from "react-input-mask";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import axios from '../../api/axios';
import moment from 'moment';

import { IoCheckmarkCircle } from "react-icons/io5";

const BotaoConfirma = styled.button`
  border: none;
  background: #292c2e;
  cursor: pointer;
  border-radius: 5px;
  transition: opacity 0.2s ease-out;
  
  svg {
    height: 25px;
    width: 25px;
    color: #d9d4cc;
  }
  
  :hover {
    background: #4CAF50;
  }
`;

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
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BotaoConcluir = ({ id1, nivel, horario_conclusao2, conclusao2 }) => {
  const [modal, setModal] = useState(false);
  const [pendente, setPendente] = useState(false);
  const [pendenciaDescricao, setPendenciaDescricao] = useState('');

  useEffect(() => {
    // Simulação de recuperação de pendência existente
    if (conclusao2) {
      setPendente(true);
      setPendenciaDescricao(conclusao2.pendenciaDescricao || '');
    }
  }, [conclusao2]);

  let datacerto = moment(horario_conclusao2).format('YYYY-MM-DD');
  let timecerto = moment(horario_conclusao2).format('HH:mm');
  let datatimecerto = `${datacerto}T${timecerto}`;

  const [conclusao, setConclusao] = useState('');
  const [hora, setHora] = useState('');

  const toggle = () => {
    setModal(!modal);
    setConclusao(conclusao2);
    setHora(datatimecerto);
  };

  const handleSubmit = (event) => {
    if (!conclusao) {
      alert("A conclusão não pode estar vazia.");
      return;
    }

    const datafunc = { conclusao, hora, nivel, pendente, pendenciaDescricao };

    axios.put(`/tarefa/confirmar/${id1}`, datafunc)
      .then(() => {
        setModal(false);
        window.location.reload(1);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <BotaoConfirma onClick={toggle}>
        <IoCheckmarkCircle />
      </BotaoConfirma>
      <Form onSubmit={handleSubmit}>
        <Modal centered fullscreen="lg" scrollable isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {nivel === "administrativo" ? "Tarefa Concluída" : "Concluir Tarefa"}
          </ModalHeader>
          <ModalBody>
            <FormGroup className="col">
              <Label1 for="endereco">Hora:</Label1>
              <Input1
                type="datetime-local"
                value={hora}
                onChange={e => setHora(e.target.value)}
                readOnly={nivel === "administrativo"}
              />
            </FormGroup>
            <FormGroup>
              <Label1 for="conclusao">Conclusão:</Label1>
              <Text1
                id="conclusao"
                value={conclusao}
                onChange={e => setConclusao(e.target.value)}
                required={!nivel === "administrativo"}
                placeholder="Digite a conclusão do serviço"
                readOnly={nivel === "administrativo"}
              />
            </FormGroup>
            {nivel === "tecnico" && (
              <>
                <FormGroup>
                  <CheckboxContainer>
                    <input
                      type="checkbox"
                      onChange={e => setPendente(e.target.checked)}
                      checked={pendente}
                    />
                    <Label1 style={{ marginLeft: '8px' }}>Marcar como pendente</Label1>
                  </CheckboxContainer>
                </FormGroup>
                {pendente && (
                  <FormGroup>
                    <Label1 for="pendenciaDescricao">Descrição da Pendência:</Label1>
                    <Text1
                      id="pendenciaDescricao"
                      value={pendenciaDescricao}
                      onChange={e => setPendenciaDescricao(e.target.value)}
                      placeholder="Descreva as pendências"
                      required={pendente}
                    />
                  </FormGroup>
                )}
              </>
            )}
            {nivel === "administrativo" && pendente && (
              <FormGroup>
                <Label1 for="pendenciaDescricao">Pendência:</Label1>
                <Text1
                  id="pendenciaDescricao"
                  value={pendenciaDescricao}
                  readOnly
                />
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-evenly' }}>
            <Button style={{ width: '35%' }} color="danger" onClick={toggle}>
              {nivel === "administrativo" ? "Voltar" : "Cancelar"}
            </Button>
            {nivel !== "administrativo" && (
              <Button style={{ width: '35%' }} color="success" onClick={handleSubmit}>
                Concluir
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </Form>
    </>
  );
};

export default BotaoConcluir;
