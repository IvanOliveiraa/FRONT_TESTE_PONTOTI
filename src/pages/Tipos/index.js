import { React, useEffect } from 'react';
import { Table } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import BotaoAdd from '../../components/ModalAddTipo';
import BotaoDelete from '../../components/ModalDeleteTipo';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import BotaoEdit from '../../components/ModalEditTipo';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
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

const ContainerTop = styled.div`{
  margin: 5px 10px 5px 10px;
  grid-column: 1 / 6;
display: grid;

  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  
  padding: 1px 10px ;

`;



const Tipos = () => {

    let navigate = useNavigate();
    const { nivel } = useAuth();

    const { data } = useAxios('/tiposatendimentos');

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
    }, [navigate])

    if (nivel === 'administrador') {
        return (<>
            <Sidebar />

            <div style={{ flexDirection: "column", margin: '0px', padding: '0px', width: '100%' }}>

                <Topbar title="Tipos de Atendimento" />
                <ContainerTop>
                    <BotaoAdd />
                </ContainerTop>
                <ContainerGeral>


                    <hr my-3 />
                    <div table-responsive style={{ width: '100%', borderRadius: '6px', boxShadow: " #9E9E9E 0.30 0px 3px 5px" }}>
                        <Table dark bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Ações</th>

                                </tr>
                            </thead>
                            <tbody>

                                {data?.map((tipos) => {
                                    return (
                                        <tr key={tipos.id}>

                                            <td>{tipos.nome_atendimento}</td>
                                            <td style={{ alignItems: 'rigth', justifyContent: 'center' }} >

                                                { /* botao  para ir pra pagina de editar funcionario
                          <Button  color="primary"size="sm"style={{marginLeft:'10px'}} onClick={()=>navigate(`/editarfuncionario/${funcionarios.id}`)}> 
                         Editar
                         </Button> */}

                                                <BotaoDelete id={tipos.id} />

                                                <BotaoEdit id1={tipos.id}
                                                    nome1={tipos.nome_atendimento}
                                                />

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

                <Topbar title="Tipos de Atendimento" />
                <ContainerTop>
                    <BotaoAdd />
                </ContainerTop>
                <ContainerGeral>


                    <hr my-3 />
                    <div table-responsive style={{ width: '100%', borderRadius: '6px', boxShadow: " #9E9E9E 0.30 0px 3px 5px" }}>
                        <Table dark bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Ações</th>

                                </tr>
                            </thead>
                            <tbody>

                                {data?.map((tipos) => {
                                    return (
                                        <tr key={tipos.id}>

                                            <td>{tipos.nome_atendimento}</td>
                                            <td style={{ alignItems: 'rigth', justifyContent: 'center' }} >

                                                { /* botao  para ir pra pagina de editar funcionario
                          <Button  color="primary"size="sm"style={{marginLeft:'10px'}} onClick={()=>navigate(`/editarfuncionario/${funcionarios.id}`)}> 
                         Editar
                         </Button> */}


                                                <BotaoEdit id1={tipos.id}
                                                    nome1={tipos.nome_atendimento}
                                                />

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
export default Tipos