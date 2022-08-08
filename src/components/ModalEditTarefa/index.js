import React, { useState } from 'react';

import { Button,Modal,ModalBody,ModalFooter,ModalHeader,FormGroup} from 'reactstrap'; 
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

import {IoAddCircle } from "react-icons/io5";

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
    

    const customStyles = {
    
      option: (provided, state) => ({
        ...provided,
        border:'0.5px solid #A9A9A9',
        color :state.isFocused? 'white':'black',
        backgroundColor :state.isSelected?'#0275d8' :'#white',
        backgroundColor :state.isFocused?'#0275d8' :'#white',
        borderColor: state.isFocused?'#0275d8':'#A9A9A9'
        
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor : '#F5F5F5',
      })
    };
    const Select1 = styled(AsyncSelect)`
    
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
const ContainerAdd = styled.button`{

  vertical-align: top;
  margin-bottom:10px;
      display: inline-block;
      font-size: 20px;
      color:white;
      border: 2px solid #4f5659;
      font-weight: bold;
      vertical-align: top;
      width: 170px;
      height: 150px;
      border: none;
      transition: transform .2s;

      background:#1a1a1a;
      border-Radius: 10px;
      border: 2px solid #4f5659;
      
      text-decoration: none;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
      :hover{
        box-shadow: rgba(0, 0, 0, 0.3) 1px 2px 6px, rgba(0, 0, 0, 0.5) 0px 2px 4px;
      }
      svg{
        height: 60px;
        width: 60px;
        color:#4f5659;
      }
    }`;
    


const BotaoEditTarefa = ({id_tarefa}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  
  const [selectTecnico, setselectTecnico] = useState('');
  const [selectTipo, setselectTipo] = useState('');

  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [abertura, setAbertura] = useState('');

  const setValues = (infos) => (
    setHora(infos.hora)
  );

  async function getInfos(value) {
    const infos = await fetch(`http://localhost:8080/tarefa/2`)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    return infos;
  }
  
  
  const mapTipos = (tipos) => ({
    value: tipos.id,
    label: tipos.nome_atendimento,
  });

  async function callTipos(value) {
    const tipos = await fetch(`http://localhost:8080/tiposatendimentos`)
      .then((response) => response.json())
      .then((response) => response.map(mapTipos))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    return tipos;
  }

  const mapTecnicos = (usuarios) => ({
    value: usuarios.id,
    label: usuarios.nome,
  });

  async function callTecnicos(value) {
    const usuarios = await fetch(`http://localhost:8080/selectusuarios`)
      .then((response) => response.json())
      .then((response) => response.map(mapTecnicos))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    return usuarios;
  }

  function Submit(event){
    var usuario= selectTecnico.value;
    var servico=selectTipo.value;
                
    const datafunc = {
    
    servico,
    usuario,
    data,
    hora,
    prioridade,
    abertura
      
    }
    
    console.log(datafunc);
    
    const Info = {
      method: 'POST',
      body: JSON.stringify(datafunc),
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
  };
   //{axios.post('/tarefa/insert',datafunc);}
   console.log(datafunc)
    window.location.reload(1);

  
  }

 
  return (
    <>
     
      <ContainerAdd onClick={toggle}>
      Editar
       <IoAddCircle  />
        </ContainerAdd>
      <form onSubmit={Submit}>
      <Modal  centered
    size="lg"
    
    scrollable isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
        
          Editar Tarefa</ModalHeader>
        
        <ModalBody style={{ height: "50vh" }}>
          
                   
                    

                    <FormGroup >
                     <Label1 for="endereco">Tipo Atendimento:</Label1>
                        <AsyncSelect
                            styles = { customStyles }
                            placeholder={"Selecione o tipo de atendimento"}
                            id='tipo_atendimento'
                            cacheOptions
                            loadOptions={callTipos}
                            onChange={(tipos) => {
                              setselectTipo(tipos);
                            }}
                            defaultOptions
                        />
                    </FormGroup>
                    
                    
                    
                    <FormGroup >
                    <Label1 for="endereco">Técnico:</Label1>
                    <AsyncSelect
                            styles = { customStyles }
                            placeholder={"Selecione o tipo de atendimento"}
                            id='tecnico'
                            cacheOptions
                            loadOptions={callTecnicos}
                            onChange={(usuarios) => {
                              setselectTecnico(usuarios);
                            }}
                            defaultOptions
                        />
                    
                    </FormGroup>
                    <div className="row">
                    <FormGroup className="col-md-6" >
                    <Label1 for="endereco">Data:</Label1>
                        <Input1 type={"date"}
                            onChange={e => setData(e.target.value)} value={data}
                        />

                    </FormGroup>
                    <FormGroup className="col-md-6" >
                    <Label1 for="endereco">Hora:</Label1>
                        <Input1 type={"time"}
                        onChange={e => setHora(e.target.value)} value={hora}
                            
                        />

                    </FormGroup>
                    
                    </div>
                    <FormGroup>
                    <Label1>
                      <input type="checkbox" onChange={e => setPrioridade (e.target.checked)} checked={prioridade}/> Prioridade </Label1>
                    </FormGroup>
                    <FormGroup >
                        <Label1 for="endereco">Abertura</Label1>
                        <Text1 type="text-area" id="endereco"  onChange={e => setAbertura (e.target.value)} value={abertura} required="required" placeholder="Informe a abertura" />
                    </FormGroup>
                    

                  
             
                   
                    
        </ModalBody>
        <ModalFooter style={{justifyContent:'space-evenly' }}>
          
          <Button style={{width:'35%' }} color="danger" onClick={toggle}> Cancelar </Button>
          <Button style={{width:'35%' }} color="success"onClick={Submit} type=''> Adicionar usuario </Button>
          

        </ModalFooter>
        
      </Modal>
      </form>
    </>
  );

  };

export default BotaoEditTarefa ;
