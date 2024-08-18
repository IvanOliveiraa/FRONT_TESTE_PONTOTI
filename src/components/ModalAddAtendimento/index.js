import React, { useState } from 'react';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import Config from '../../config';


const BotaoNovo = styled.button`
background: #F38439;
border: none;
float: left;
border-Radius: 3px;
padding: 7px 15px;
font-Weight: bold ;
color: white;
&:hover {
    background: #f27018; 
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
      }
    `;


const customStyles = {

  option: (provided, state) => ({
    ...provided,
    border: '0.5px solid #A9A9A9',
    color: state.isSelected ? 'white' : state.isFocused ? '#0275d8' : 'black',
    backgroundColor: state.isSelected ? '#0275d8' : '#white',
    borderColor: state.isFocused ? '#0275d8' : '#A9A9A9'

  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#F5F5F5',
  })
};
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



const BotaoAdd = () => {
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { register, handleSubmit, formState: { erros } } = useForm()


  const [selectCliente, setSelectCliente] = useState('');
  const [selectTecnico, setselectTecnico] = useState('');
  const [selectTipo, setselectTipo] = useState('');

  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [abertura, setAbertura] = useState('');



  const mapTipos = (tipos) => ({
    value: tipos.id,
    label: tipos.nome_atendimento,
  });

  async function callTipos(value) {
    const tipos = await fetch(`${Config.backend}/tiposatendimentos`)
      .then((response) => response.json())
      .then((response) => response.map(mapTipos))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    return tipos;
  }

  const mapClientes = (clientes) => ({
    value: clientes.id,
    label: clientes.nome_cliente,
  });

  async function callClientes(value) {
    const clientes = await fetch(`${Config.backend}/selectclientes`)
      .then((response) => response.json())
      .then((response) => response.map(mapClientes))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    return clientes;
  }
  const mapTecnicos = (usuarios) => ({
    value: usuarios.id,
    label: usuarios.nome,
  });

  async function callTecnicos(value) {
    const usuarios = await fetch(`${Config.backend}/selectusuarios`)
      .then((response) => response.json())
      .then((response) => response.map(mapTecnicos))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );
    return usuarios;
  }

  function Submit(event) {
    var cliente = selectCliente.value;
    var usuario = selectTecnico.value;
    var servico = selectTipo.value;

    const datafunc = {
      cliente,
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
    axios.post('/atendimento/insert', datafunc);
    window.location.reload(1)


  }


  return (
    <div style={{ textAlign: "center" }}>

      <BotaoNovo onClick={toggle}>Novo Atendimento</BotaoNovo>
      <form onSubmit={Submit}>
        <Modal centered
          size="lg"
          scrollable isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Novo Atendimento</ModalHeader>

          <ModalBody style={{ height: "75vh" }}>



            <FormGroup >
              <Label1 for="endereco">Cliente:</Label1>
              <AsyncSelect
                id='cliente'
                placeholder={"Selecione o cliente"}
                loadOptions={callClientes}
                styles={customStyles}
                onChange={(clientes) => {
                  setSelectCliente(clientes);
                  console.log(selectCliente);
                }}
                defaultOptions
              />

            </FormGroup>

            <FormGroup >
              <Label1 for="endereco">Tipo Atendimento:</Label1>
              <AsyncSelect
                styles={customStyles}
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
                styles={customStyles}
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
            <div class="row">
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
                <input type="checkbox" onChange={e => setPrioridade(e.target.checked)} checked={prioridade} /> Prioridade </Label1>
            </FormGroup>
            <FormGroup >
              <Label1 for="endereco">Abertura</Label1>
              <Text1 type="text-area" id="endereco" onChange={e => setAbertura(e.target.value)} value={abertura} required="required" placeholder="Informe a abertura" />
            </FormGroup>






          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-evenly' }}>

            <Button style={{ width: '35%' }} color="danger" onClick={toggle}> Cancelar </Button>
            <Button style={{ width: '35%' }} color="success" onClick={Submit} type=''> Adicionar Atendimento </Button>

          </ModalFooter>

        </Modal>
      </form>
    </div>
  );

};

export default BotaoAdd;
