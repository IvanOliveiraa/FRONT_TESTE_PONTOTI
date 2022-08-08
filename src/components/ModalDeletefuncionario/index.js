import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,Modal,ModalBody,ModalFooter,ModalHeader, Form,FormGroup,Label,Input } from 'reactstrap'; 
import axios from '../../api/axios';



const BotaoDelete = ({id}) => {
  let navigate = useNavigate();
  const [modaldl, setModaldl] = useState(false);
  const toggledl = () => setModaldl(!modaldl);


  function handleDelete(id){
    axios.delete(`/usuario/${id}`)
    setModaldl(false);
    window.location.reload(1)
  
  }
 
  return (
    <>
      
      <Button color="danger" size="sm" style={{marginLeft:'10px'}}onClick={toggledl}>Excluir</Button>
      <Modal  centered
    
    scrollable isOpen={modaldl} toggle={toggledl}>
        <ModalHeader toggle={toggledl}>Novo Usuario</ModalHeader>
        
        <ModalBody style={{  }}>
                              
        <p>
          Deseja realmente excluir este usuario permanentemente?
          </p>     
        </ModalBody>
        <ModalFooter style={{justifyContent:'space-evenly' }}>
          
          <Button style={{width:'35%' }} color="secondary" onClick={toggledl}>
            Cancelar
          </Button>
          <Button style={{width:'35%' }} color="danger" onClick={()=>handleDelete(id)}>
           Excluir usuario
          </Button>
        </ModalFooter>
        
      </Modal>
    </>
  );
  };

export default BotaoDelete ;