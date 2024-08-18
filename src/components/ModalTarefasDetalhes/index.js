import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import styled from 'styled-components';
import { IoInformationCircleOutline } from "react-icons/io5";
import useAxios from '../../hooks/useAxios';
import moment from 'moment';

const BotaoDetalhes = styled.button`
  border: none;
  background: #292c2e;
  cursor: pointer;
  width:33%;
  border-radius: 5px;
  transition: opacity 0.2s ease-out;
  
  svg {
    height: 25px;
    width: 25px;
    color: #d9d4cc;
  }
  
  :hover {
    background: #0057cc;
  }
`;

const ModalTarefasDetalhes = ({ id_tarefa }) => {
  const [modal, setModal] = useState(false);

  // Fetching task details using useAxios
  const { data: detalhesArray, loading, error } = useAxios(modal ? `/tarefa/detalhes/${id_tarefa}` : null);

  const toggle = () => setModal(!modal);

  // Extracting the task details from the array
  const detalhes = detalhesArray && detalhesArray.length > 0 ? detalhesArray[0] : null;

  return (
    <>
      <BotaoDetalhes onClick={toggle}>
        <IoInformationCircleOutline />
      </BotaoDetalhes>
      <Modal centered fullscreen="lg" scrollable isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Detalhes da Tarefa
        </ModalHeader>
        <ModalBody>
          {loading && <p>Carregando detalhes...</p>}
          {error && <p>Erro ao carregar os detalhes.</p>}
          {detalhes ? (
            <>
              <p><strong>Serviço:</strong> {detalhes.servico || 'Não disponível'}</p>
              <p><strong>Cliente:</strong> {detalhes.nome_cliente || 'Não disponível'}</p>
              <p><strong>Responsável:</strong> {detalhes.responsavel || 'Não disponível'}</p>
              <p><strong>Telefone do Cliente:</strong> {detalhes.telefone_cliente || 'Não disponível'}</p>

              <p><strong>Endereço:</strong> {detalhes.endereco || 'Não disponível'}</p>
              <p><strong>Data da Tarefa:</strong> {detalhes.data ? moment(detalhes.data).format('DD/MM/YYYY') : 'Não disponível'}</p>
              <p><strong>Hora da Tarefa:</strong> {detalhes.hora || 'Não disponível'}</p>
              <p><strong>Status:</strong> {detalhes.status_tarefa || 'Não disponível'}</p>
              <p><strong>Abertura:</strong> {detalhes.abertura || 'Não disponível'}</p>
            </>
          ) : (
            <p>Detalhes não encontrados.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Fechar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalTarefasDetalhes;
