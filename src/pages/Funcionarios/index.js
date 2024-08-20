import { React, useEffect } from 'react';
import { Table } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import BotaoDelete from '../../components/ModalDeletefuncionario';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import BotaoEdit from '../../components/ModalEditFuncionario';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Button from 'reactstrap';
import Voltar from '../naoautorizada';


const ContainerGeral = styled.div`
border-Radius: 10px;
background: #1a1a1a;
flex-Direction: column;
margin: 20px auto;
padding:10px 10px 40px 10px;
width :96%;
justify-Content:"center";
box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
`;
const BotaoNovo = styled.button`
background: #F38439;
border: none;
margin:0px;
border-Radius: 3px;
padding: 7px 15px;
font-Weight: bold ;
color: white;
&:hover {
    background: #f27018; 
}
`;

const BotaoTarefas = styled.button`{
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
  
      }`;


const Funcionarios = () => {
    /* const [funcionarios,setFuncionarios]=useState ([]);
        useEffect(()=>{
            axios.get("/usuarios").then(({data})=>{
            setFuncionarios(data);
            })
            console.log(funcionarios)
        },[]);*/
    let navigate = useNavigate();
    const { nivel } = useAuth();

    const { data, mutate } = useAxios('/usuarios');

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
    if (nivel === 'administrador') {
        return (<>
            <Sidebar />

            <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>

                <Topbar title="Usuários" />
                <ContainerGeral>
                    <div style={{ flexDirection: "row", display: 'flex', alignItems: "center", margin: '0px 5%' }}>

                        <BotaoNovo onClick={() => navigate("/novofuncionario")}>
                            Novo Usuario</BotaoNovo>
                    </div>

                    <hr my-3 />
                    <div table-responsive style={{ width: '100%', borderRadius: '6px', boxShadow: " #9E9E9E 0.30 0px 3px 5px" }}>
                        <Table dark bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>cpf</th>
                                    <th>Tipo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((funcionarios) => {
                                    return (
                                        <tr key={funcionarios.id}>

                                            <td>{funcionarios.nome}</td>
                                            <td>{funcionarios.cpf}</td>
                                            <td>{funcionarios.nivel}</td>
                                            <td style={{ alignItems: 'rigth', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }} >

                                                { /* botao  para ir pra pagina de editar funcionario
                                  <Button  color="primary"size="sm"style={{marginLeft:'10px'}} onClick={()=>navigate(`/editarfuncionario/${funcionarios.id}`)}> 
                                 Editar
                                 </Button> */}
                                                <BotaoDelete id={funcionarios.id} />
                                                <BotaoEdit id1={funcionarios.id} email1={funcionarios.email} nome1={funcionarios.nome} cpf1={funcionarios.cpf} telefone1={funcionarios.telefone} senha1={funcionarios.senha} nivel1={funcionarios.nivel} />
                                                <BotaoTarefas style={{ marginLeft: '10px' }} color="primary" onClick={() => navigate(`/tarefastecnico/${funcionarios.id}`)}>ver tarefas</BotaoTarefas>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </Table>
                    </div>

                </ContainerGeral>
            </div>


        </>
        );

    } else if (nivel === 'administrativo') {
        return (<>
            <Sidebar />

            <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>

                <Topbar title="Usuários" />
                <ContainerGeral>
                    <div style={{ flexDirection: "row", display: 'flex', alignItems: "center", margin: '0px 5%' }}>

                        <BotaoNovo onClick={() => navigate("/novofuncionario")}>
                            Novo Usuario</BotaoNovo>
                    </div>

                    <hr my-3 />
                    <div table-responsive style={{ width: '100%', borderRadius: '6px', boxShadow: " #9E9E9E 0.30 0px 3px 5px" }}>
                        <Table dark bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>cpf</th>
                                    <th>Tipo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((funcionarios) => {
                                    return (
                                        <tr key={funcionarios.id}>

                                            <td>{funcionarios.nome}</td>
                                            <td>{funcionarios.cpf}</td>
                                            <td>{funcionarios.nivel}</td>
                                            <td style={{ alignItems: 'rigth', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }} >
                                                { /* botao  para ir pra pagina de editar funcionario
                                  <Button  color="primary"size="sm"style={{marginLeft:'10px'}} onClick={()=>navigate(`/editarfuncionario/${funcionarios.id}`)}> 
                                 Editar
                                 </Button> */}
                                                <BotaoEdit id1={funcionarios.id} email1={funcionarios.email} nome1={funcionarios.nome} cpf1={funcionarios.cpf} telefone1={funcionarios.telefone} senha1={funcionarios.senha} nivel1={funcionarios.nivel} />
                                                <BotaoTarefas style={{ marginLeft: '10px' }} color="primary" onClick={() => navigate(`/tarefastecnico/${funcionarios.id}`)}>ver tarefas</BotaoTarefas>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </Table>
                    </div>

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
export default Funcionarios