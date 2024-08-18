import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import styled from 'styled-components';
import useAxios from '../../../hooks/useAxios';
import CardTarefa from '../../../components/CardTarefa';
import BotaoAddTarefa from '../../../components/ModalAddTarefa';
import Config from '../../../config';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Voltar from '../../naoautorizada';

const ContainerAdd = styled.button`{
  display: inline-block;
  font-size: 20px;
  color:white;
  border: 2px solid #4f5659;
  font-weight: bold;
  vertical-align: top;
  margin-bottom:10px;
  width: 170px;
  height: 100px;
  border: none;
  transition: transform .2s;
  
  text-decoration: none;
  border-radius: 5px;
  background: ${(props) => (props.prioridade ? "#1a1a1a" : "#1a1a1a")};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  :hover{
    box-shadow: rgba(0, 0, 0, 0.3) 1px 2px 6px, rgba(0, 0, 0, 0.5) 0px 2px 4px;
  }
  
}`;

const ContainerGeral = styled.div`
border-Radius: 10px;
background: #1a1a1a;
color:white;
flex-Direction: column;
margin: 20px auto;
padding:10px 40px 40px 40px;
width :90%;
justify-Content:"center";
box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
`;

const ContainerAtendimentos = styled.div`{
  margin: 10px;
  grid-column: 1 / 6;
  display: grid;
  background:#292c2e;
  border-Radius: 10px;
  border: 2px dashed #4f5659;
  
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    
    padding: 10px;
  }
  `;



const Tarefas = () => {
  const { id } = useParams();
  const { data } = useAxios(`/tarefasporatendimento/${id}`);
  let navigate = useNavigate();
  const { nivel } = useAuth();

  const [atendimento, setAtendimento] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${Config.backend}/atendimento/${id}`);
      const atendimentoData = await response.json();
      setAtendimento(atendimentoData);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('nivel') == null) {
      navigate("/");
    } else {
      var nivel2 = localStorage.getItem('nivel');

      if (nivel2 === 'tecnico') {
        navigate("/atendimentostecnico");
      }
      else {
        console.log("ok");
      }
    }
  }, [])

  if (nivel === 'administrador' || nivel === 'administrativo') {
    return (<>
      <Sidebar />

      <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>
        <Topbar title="Atendimento" />

        <ContainerGeral >
          {atendimento?.map((tarefas) => {
            return (<>
              <div >
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                    #{tarefas.id} {tarefas.nome_cliente}
                    <hr style={{ margin: "2px", color: "lightgray" }} />
                  </h4>
                </div>
                <p >
                  <strong>Servico: </strong> {tarefas.nome_atendimento}<br />
                  <strong>Status: </strong> {tarefas.status}<br />
                  <strong>Contato: </strong> {tarefas.telefone_cliente} - {tarefas.responsavel}<br />
                  <strong>Endereço: </strong> {tarefas.endereco}<br />
                  <Button >Concluir Atendimento</Button>
                  {/*<BotaoConcluirAtendimento/>*/}
                </p>

              </div>
            </>
            );
          })}
          <hr />
          <ContainerAtendimentos>
            {data?.map((tarefas) => {
              return (

                <CardTarefa
                  key={tarefas.id_tarefa}
                  id_tarefa={tarefas.id_tarefa}
                  id_atendimento={tarefas.id_atendimento}
                  servico={tarefas.nome_atendimento}
                  data={tarefas.data}
                  status_tarefa={tarefas.status_tarefa}
                  nome_cliente={tarefas.nome_cliente}
                  nome_usuario={tarefas.nome}
                  hora={tarefas.hora}
                  prioridade={tarefas.prioridade}
                  revisada={tarefas.revisada}
                  horario_conclusao1={tarefas.horario_conclusao}
                  conclusao1={tarefas.conclusao}
                  pendencia={tarefas.pendencia}
                  pendeciaDesc={tarefas.pendenciaDescricao} />
              );
            })}
            <BotaoAddTarefa atendimento={id} />
          </ContainerAtendimentos>

        </ContainerGeral>



      </div>

    </>
    );

  } else {
    return (
      <Voltar />
    )
  }

}
export default Tarefas