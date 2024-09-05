import { React, useEffect } from 'react';
import { Table } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import BotaoDelete from '../../components/ModalDeletecliente';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BotaoEdit from '../../components/ModalEditCliente';
import styled from 'styled-components';
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



const Clientes = () => {

    let navigate = useNavigate();

    const { data } = useAxios('/clientes');
    const { nivel } = useAuth();

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

                <Topbar title="Clientes" />
                <ContainerGeral>
                    <div style={{ flexDirection: "row", display: 'flex', alignItems: "center", margin: '0px 5%' }}>

                        <BotaoNovo style={{}} onClick={() => navigate("/novocliente")}>
                            Novo Cliente</BotaoNovo>

                    </div>

                    <hr my-3 />
                    <div table-responsive style={{ width: '100%', borderRadius: '6px', boxShadow: " #9E9E9E 0.30 0px 3px 5px" }}>
                        <Table dark bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>responsavel</th>
                                    <th>telefone</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((clientes) => {
                                    return (<>
                                        <tr key={clientes.id}>
                                            <td>{clientes.nome_cliente}</td>
                                            <td>{clientes.responsavel}</td>
                                            <td>{clientes.telefone_cliente}</td>
                                            <td style={{ alignItems: 'rigth', justifyContent: 'center' }} >


                                                <BotaoDelete id={clientes.id} />
                                                <BotaoEdit id1={clientes.id}
                                                    email1={clientes.email_cliente}
                                                    nome1={clientes.nome_cliente}
                                                    responsavel1={clientes.responsavel}
                                                    telefone1={clientes.telefone_cliente}
                                                    endereco1={clientes.endereco}
                                                />

                                            </td>
                                        </tr>
                                    </>);
                                })

                                }

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

                <Topbar title="Clientes" />
                <ContainerGeral>
                    <div style={{ flexDirection: "row", display: 'flex', alignItems: "center", margin: '0px 5%' }}>

                        <BotaoNovo style={{}} onClick={() => navigate("/novocliente")}>
                            Novo Cliente</BotaoNovo>

                    </div>

                    <hr my-3 />
                    <div table-responsive style={{ width: '100%', borderRadius: '6px', boxShadow: " #9E9E9E 0.30 0px 3px 5px" }}>
                        <Table dark bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>responsavel</th>
                                    <th>telefone</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((clientes) => {
                                    return (<>
                                        <tr key={clientes.id}>
                                            <td>{clientes.nome_cliente}</td>
                                            <td>{clientes.responsavel}</td>
                                            <td>{clientes.telefone_cliente}</td>
                                            <td style={{ alignItems: 'rigth', justifyContent: 'center' }} >


                                                <BotaoEdit id1={clientes.id}
                                                    email1={clientes.email_cliente}
                                                    nome1={clientes.nome_cliente}
                                                    responsavel1={clientes.responsavel}
                                                    telefone1={clientes.telefone_cliente}
                                                    endereco1={clientes.endereco}
                                                />

                                            </td>
                                        </tr>
                                    </>);
                                })

                                }

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
export default Clientes