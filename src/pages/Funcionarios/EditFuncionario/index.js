import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';




export function EditFuncionario() {
  let navigate = useNavigate();
  const { id } = useParams();



  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [nivel, setNivel] = useState('');


  const [info, setInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/usuario/${id}`);
        console.log(data[0]);
        setInfo(data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Chama a função async dentro do useEffect
  }, [id]);  // Inclua 'id' no array de dependências

  console.log(info)

  function handleSubmit(event) {

    const datafunc = {
      nome, email, cpf, telefone, senha, nivel
    }

    const Info = {
      method: 'put',
      body: JSON.stringify(datafunc),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    axios.put(`/usuario/update/${id}`, Info);
    navigate("/funcionarios")
  }



  return (<>
    <Sidebar />

    <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>
      <Topbar />
      <Header title="Novo Usuário" />

      <hr className="my-3" />
      <div style={{ flexDirection: "column", margin: '0 auto', padding: '0px', width: '65%', justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>




          <FormGroup>
            <Label for="Nome">Nome</Label>
            <Input type="text" id="nome" onChange={e => setNome(e.target.value)} value={nome} required="required" placeholder="Informe o nome" />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" id="email" onChange={e => setEmail(e.target.value)} value={email} required="required" placeholder="Informe o e-mail" />
          </FormGroup>
          <div class="row">
            <FormGroup className="col-md-6">
              <Label for="cpf">CPF</Label>
              <Input type="text" id="cpf" onChange={e => setCpf(e.target.value)} value={cpf} required="required"

                mask="999.999.999-99" placeholder="Informe o cpf" />
            </FormGroup>

            <FormGroup className="col-md-6">
              <Label for="telefone">Telefone</Label>
              <Input type="text" id="telefone" onChange={e => setTelefone(e.target.value)} value={telefone} required="required" placeholder="Informe o telefone" />
            </FormGroup>
          </div>
          <FormGroup >
            <Label for="senha">Senha</Label>
            <Input type="text" id="senha" onChange={e => setSenha(e.target.value)} value={senha} required="required" placeholder="Informe a senha" />
          </FormGroup>
          <FormGroup>
            <Label> Nivel</Label>
            <Input type='text' id="nivel" onChange={e => setNivel(e.target.value)} value={nivel}>

            </Input>
          </FormGroup>




          <div style={{ flexDirection: "row", justifyContent: "space-between", display: 'flex', alignItems: "center" }}>

            <Button style={{ width: '35%' }} color="danger" onClick={() => navigate('/funcionarios')}>
              Cancelar
            </Button>
            <Button style={{ width: '35%' }} color="success" onClick={handleSubmit}>
              Adicionar usuario
            </Button>
          </div>

        </form>
      </div>


    </div>

  </>
  );
}
export default EditFuncionario