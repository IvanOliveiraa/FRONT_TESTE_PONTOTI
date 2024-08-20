import React, { useState } from 'react';
import { Button, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import Config from '../../../config';
import axios from '../../../api/axios';

const ContainerGeral = styled.div`
  border-radius: 10px;
  background: #1a1d1e;
  flex-direction: column;
  margin: 20px auto;
  padding: 10px 40px 40px 40px;
  width: 90%;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px;
`;

const Label1 = styled.label`
  color: #d9d4cc;
  font-size: 16px;
`;

const Input1 = styled.input`
  color: #d9d4cc;
  font-size: 1rem;
  width: 100%;
  padding: 5px 0px 5px 10px;
  margin: 0px;
  background: #212324;
  border-radius: 3px;
  border: 0.5px solid #4f5659;
  &:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
  }
  ::placeholder {
    color: #3b3b3b;
  }
`;

const Text1 = styled.textarea`
  background: #212324;
  font-size: 1rem;
  width: 100%;
  color: #d9d4cc;
  padding: 5px 0px 5px 10px;
  margin: 0px;
  border-radius: 3px;
  border: 0.5px solid #a9a9a9;
  &:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
  }
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    border: '0.5px solid #a9a9a9',
    color: state.isSelected ? 'white' : state.isFocused ? '#0275d8' : 'black',
    backgroundColor: state.isSelected ? '#0275d8' : 'white',
    borderColor: state.isFocused ? '#0275d8' : '#a9a9a9',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#212324',
    color: '#d9d4cc',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#d9d4cc',
  }),
};

export function AddOrcamento() {
  const [selectCliente, setSelectCliente] = useState(null);
  const [selectTipo, setSelectTipo] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  let navigate = useNavigate();

  const mapTipos = (tipos) => ({
    value: tipos.id,
    label: tipos.nome_atendimento,
  });

  const mapClientes = (clientes) => ({
    value: clientes.id,
    label: clientes.nome_cliente,
  });

  const callTipos = async (inputValue) => {
    const response = await fetch(`${Config.backend}/tiposatendimentos`);
    const tipos = await response.json();
    return tipos.map(mapTipos).filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const callClientes = async (inputValue) => {
    const response = await fetch(`${Config.backend}/selectclientes`);
    const clientes = await response.json();
    return clientes.map(mapClientes).filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const Submit = (event) => {
    event.preventDefault();
    if (selectCliente && selectTipo) {
      const dadosOrcamento = {
        cliente: selectCliente.value,
        servico: selectTipo.value,
        descricao: descricao,
        valor: parseFloat(valor),
      };


      axios.post('/orcamento/insert', dadosOrcamento);
      navigate("/orcamentos");

    } else {
      alert('Por favor, selecione um cliente e um tipo de atendimento.');
    }
  };

  return (
    <>
      <Sidebar />
      <div style={{ flexDirection: 'column', margin: '0px', padding: '0px', width: '100%' }}>
        <Topbar title="Novo Orçamento" />
        <ContainerGeral>
          <form onSubmit={Submit}>
            <FormGroup>
              <Label1 for="cliente">Cliente</Label1>
              <AsyncSelect
                id='cliente'
                placeholder="Selecione o cliente"
                loadOptions={callClientes}
                styles={customStyles}
                onChange={setSelectCliente}
                defaultOptions
              />
            </FormGroup>
            <FormGroup>
              <Label1 for="servico">Tipo de Atendimento</Label1>
              <AsyncSelect
                id="servico"
                cacheOptions
                loadOptions={callTipos}
                onChange={setSelectTipo}
                styles={customStyles}
                defaultOptions
                placeholder="Selecione um tipo de atendimento"
              />
            </FormGroup>
            <FormGroup>
              <Label1 for="descricao">Descrição</Label1>
              <Text1 id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required placeholder="Descreva o serviço" />
            </FormGroup>
            <FormGroup>
              <Label1 for="valor">Valor</Label1>
              <Input1 type="number" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} required placeholder="Informe o valor" step="0.01" min="0" />
            </FormGroup>
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
              <Button style={{ width: '35%' }} color="danger" onClick={() => navigate('/orcamento')}>
                Cancelar
              </Button>
              <Button style={{ width: '35%' }} color="success" onClick={Submit} type="submit">
                Adicionar Orçamento
              </Button>
            </div>
          </form>
        </ContainerGeral>
      </div>
    </>
  );
}

export default AddOrcamento;
