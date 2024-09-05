import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap';
import axios from '../../api/axios';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import Config from '../../config';

const BotaoNovo = styled.button`
background: #F38439;
border: none;
margin: 1% 2% 1% 2%;
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
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  const [selectCliente, setSelectCliente] = useState('');
  const [selectTipo, setselectTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

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

  function Submit(event) {
    var cliente = selectCliente.value;
    var servico = selectTipo.value;

    const dataOrcamento = {
      cliente,
      servico,
      descricao,
      valor
    };

    axios.post('/orcamento/insert', dataOrcamento).then((response) => {
      // Aqui você pode verificar a resposta e tomar alguma ação específica, se necessário
      setModal(false);
      window.location.reload(1);  // Recarrega a página após a conclusão da requisição
    })
      .catch((error) => {
        console.error("Houve um erro ao adicionar orcamento:", error);
        // Aqui você pode adicionar alguma lógica para tratar erros, se necessário
      });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <BotaoNovo onClick={toggle}> Orçamento</BotaoNovo>
      <form onSubmit={Submit}>
        <Modal centered
          size="lg"
          scrollable isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Novo Orçamento</ModalHeader>

          <ModalBody style={{ height: "75vh" }}>
            <FormGroup >
              <Label1 for="cliente">Cliente:</Label1>
              <AsyncSelect
                id='cliente'
                placeholder={"Selecione o cliente"}
                loadOptions={callClientes}
                styles={customStyles}
                onChange={(clientes) => setSelectCliente(clientes)}
                defaultOptions
              />
            </FormGroup>

            <FormGroup >
              <Label1 for="tipo_atendimento">Tipo de Serviço:</Label1>
              <AsyncSelect
                styles={customStyles}
                placeholder={"Selecione o tipo de serviço"}
                id='tipo_atendimento'
                cacheOptions
                loadOptions={callTipos}
                onChange={(tipos) => setselectTipo(tipos)}
                defaultOptions
              />
            </FormGroup>

            <FormGroup >
              <Label1 for="descricao">Descrição:</Label1>
              <Text1 type="textarea" id="descricao" onChange={e => setDescricao(e.target.value)} value={descricao} placeholder="Descreva o serviço" required />
            </FormGroup>

            <FormGroup >
              <Label1 for="valor">Valor:</Label1>
              <Input1 type="number" id="valor" onChange={e => setValor(e.target.value)} value={valor} placeholder="Informe o valor" required />
            </FormGroup>
          </ModalBody>

          <ModalFooter style={{ justifyContent: 'space-evenly' }}>
            <Button style={{ width: '35%' }} color="danger" onClick={toggle}>Cancelar</Button>
            <Button style={{ width: '35%' }} color="success" onClick={Submit} type='submit'>Adicionar Orçamento</Button>
          </ModalFooter>
        </Modal>
      </form>
    </div>
  );
};

export default BotaoAdd;
