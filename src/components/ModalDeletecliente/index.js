import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from '../../api/axios';



const BotaoDelete = ({ id }) => {
  const [modaldl, setModaldl] = useState(false);
  const toggledl = () => setModaldl(!modaldl);


  function handleDelete(id) {
    axios.delete(`/cliente/${id}`).then((response) => {
      // Aqui você pode verificar a resposta e tomar alguma ação específica, se necessário
      setModaldl(false);
      window.location.reload(1);  // Recarrega a página após a conclusão da requisição
    })
      .catch((error) => {
        console.error("Houve um erro ao editar o atendimento:", error);
        // Aqui você pode adicionar alguma lógica para tratar erros, se necessário
      });

  }

  return (
    <>

      <Button color="danger" size="sm" style={{ marginLeft: '10px' }} onClick={toggledl}>Excluir</Button>
      <Modal centered

        scrollable isOpen={modaldl} toggle={toggledl}>
        <ModalHeader toggle={toggledl}>Deletar cliente</ModalHeader>

        <ModalBody style={{}}>

          <p>
            Deseja realmente excluir este cliente permanentemente?
          </p>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-evenly' }}>

          <Button style={{ width: '35%' }} color="secondary" onClick={toggledl}>
            Cancelar
          </Button>
          <Button style={{ width: '35%' }} color="danger" onClick={() => handleDelete(id)}>
            Excluir
          </Button>
        </ModalFooter>

      </Modal>
    </>
  );
};

export default BotaoDelete;