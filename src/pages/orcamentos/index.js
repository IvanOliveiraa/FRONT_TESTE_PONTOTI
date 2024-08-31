import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
//import BotaoDelete from '../../components/ModalDeleteOrcamento';
import moment from 'moment';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Voltar from '../naoautorizada';
import BotaoAdd from '../../components/ModalAddOrcamento';
import BotaoGerarProposta from '../../components/ModalGerarProposta';

const ContainerGeral = styled.div`
  border-radius: 10px;
  background: #1a1a1a;
  flex-direction: column;
  margin: 20px auto;
  padding: 10px 10px 40px 10px;
  width: 96%;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px;
`;

const BotaoNovo = styled.button`
  background: #f38439;
  border: none;
  margin: 0px;
  border-radius: 3px;
  padding: 7px 15px;
  font-weight: bold;
  color: white;
  &:hover {
    background: #f27018;
  }
`;

const Orcamentos = () => {
    let navigate = useNavigate();
    const { nivel } = useAuth();

    const { data, mutate } = useAxios('/orcamentos');

    useEffect(() => {
        if (localStorage.getItem('nivel') == null) {
            navigate('/');
        } else {
            const nivel2 = localStorage.getItem('nivel');

            if (nivel2 === 'tecnico') {
                navigate('/atendimentostecnico');
            } else {
                console.log('ok');
            }
        }
    }, [navigate]);

    if (nivel === 'administrador') {
        return (
            <>
                <Sidebar />
                <div style={{ flexDirection: 'column', margin: '0px', padding: '0px', width: '100%' }}>
                    <Topbar title="Orçamentos" />
                    <ContainerGeral>
                        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', margin: '0px 5%' }}>
                            <BotaoAdd />
                        </div>

                        <hr my-3 />
                        <div
                            className="table-responsive"
                            style={{
                                width: '100%',
                                borderRadius: '6px',
                                boxShadow: '#9E9E9E 0.30 0px 3px 5px',
                            }}
                        >
                            <Table dark bordered hover>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>tipo</th>
                                        <th>Valor</th>
                                        <th>Validade</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((orcamento) => {
                                        return (
                                            <tr key={orcamento.id}>
                                                <td>{orcamento.nome_cliente}</td>
                                                <td>{orcamento.nome_atendimento}</td>
                                                <td>{orcamento.valor}</td>
                                                <td>{moment(orcamento.data_validade).format('DD/MM/YYYY')}</td>
                                                <td>{orcamento.status}</td>
                                                <td style={{ alignItems: 'right', justifyContent: 'center' }}>
                                                    {
                                                        <BotaoGerarProposta id={orcamento.id} />
                                                    /*<BotaoDelete id={orcamento.id} />
                                                    <BotaoEdit
                                                        id={orcamento.id}
                                                        cliente={orcamento.cliente}
                                                        valor={orcamento.valor}
                                                        data={orcamento.data}
                                                        status={orcamento.status} 
                                                    />*/}
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
        return (
            <>
                <Sidebar />
                <div style={{ flexDirection: 'column', margin: '0px', padding: '0px', width: '100%' }}>
                    <Topbar title="Orçamentos" />
                    <ContainerGeral>
                        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', margin: '0px 5%' }}>
                            <BotaoNovo onClick={() => navigate('/novoOrcamento')}>Novo Orçamento</BotaoNovo>
                        </div>

                        <hr my-3 />
                        <div
                            className="table-responsive"
                            style={{
                                width: '100%',
                                borderRadius: '6px',
                                boxShadow: '#9E9E9E 0.30 0px 3px 5px',
                            }}
                        >
                            <Table dark bordered hover>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>tipo</th>
                                        <th>Valor</th>
                                        <th>Validade</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((orcamento) => {
                                        return (
                                            <tr key={orcamento.id}>
                                                <td>{orcamento.nome_cliente}</td>
                                                <td>{orcamento.nome_atendimento}</td>
                                                <td>{orcamento.valor}</td>
                                                <td>{orcamento.data_validade}</td>
                                                <td>{orcamento.status}</td>
                                                <td style={{ alignItems: 'right', justifyContent: 'center' }}>
                                                    {
                                                        <BotaoGerarProposta id={orcamento.id} />
                                                    /*<BotaoDelete id={orcamento.id} />
                                                    <BotaoEdit
                                                        id={orcamento.id}
                                                        cliente={orcamento.cliente}
                                                        valor={orcamento.valor}
                                                        data={orcamento.data}
                                                        status={orcamento.status} 
                                                    />*/}
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
        return <Voltar />;
    }
};

export default Orcamentos;
