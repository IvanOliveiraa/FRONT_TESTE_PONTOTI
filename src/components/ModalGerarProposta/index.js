import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';
import axios from '../../api/axios';
import styled from 'styled-components';
import { IoTrashBin } from "react-icons/io5";

const BotaoDeletar = styled.button`{
  border:none;
  background:#166aa2;
   color:#d9d4cc;
  cursor: pointer;
  border-radius: 5px;
  transition: opacity 0.2 ease-out;
  
  svg{
    height: 25px;
    width: 25px;
    color:#d9d4cc;
  }
  
    :hover{
      background:#0a456d;

    }
  
}`;


const BotaoGerarProposta = ({ id }) => {
  const [modaldl, setModaldl] = useState(false);
  const toggledl = () => setModaldl(!modaldl);


  function geraProposta(id) {
    axios.delete(`/orcamento/gerarproposta/${id}`)
    setModaldl(false);
    window.location.reload(1)

  }

  return (
    <>

      <BotaoDeletar onClick={toggledl}>Gerar Doc</BotaoDeletar>
      <Modal centered

        scrollable isOpen={modaldl} toggle={toggledl}>
        <ModalHeader toggle={toggledl}>Gerar documento Google</ModalHeader>

        <ModalBody style={{}}>

          <p>
            Deseja realmente erar o documento  da proposta no google drive?
          </p>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-evenly' }}>

          <Button style={{ width: '35%' }} color="secondary" onClick={toggledl}>
            Cancelar
          </Button>
          <Button style={{ width: '35%' }} color="primary" onClick={() => geraProposta(id)}>
            Gerar Documento
          </Button>
        </ModalFooter>

      </Modal>
    </>
  );
};

export default BotaoGerarProposta;