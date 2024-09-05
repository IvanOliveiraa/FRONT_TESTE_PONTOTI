import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Top = styled.div`{
    width:100%;
    height:70px;
    display: flex;
  align-items: center;
  justify-content: center;
    color: white;
    background: #D0D0D0;
    }
    `;
const Sair = styled.button`{
        position: fixed;
    right: 2%;
        }
        `;
const Header = styled.header`
    `;




const Topbar = ({ title }) => {
    let navigate = useNavigate();

    const { sair } = useAuth();

    return (<>
        <Top className='Topbar' style={{ backgroundColor: "#101010", width: "100%", height: "70px" }}>

            <Header>
                <h1 className="text-center " style={{ fontWeight: 'bold' }}>{title}</h1>
            </Header>
            <Sair className="btn btn-outline-secondary" onClick={() => [sair(),
            navigate("/")]}>
                Sair

            </Sair>

        </Top>

    </>
    )
};

export default Topbar;