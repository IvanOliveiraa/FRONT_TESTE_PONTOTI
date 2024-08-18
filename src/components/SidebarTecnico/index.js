import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Botao = styled.button`{
  font-size: 16px;
  width: 100%;
  padding: 5px 5px 5px 20px;
  text-align:left;
  margin: 0px;
  background: #353534;
  border: none;
  text-decoration: none;
  :hover {
    background: #F38439;
    }
a{
  text-decoration: none;
  color: white;
}
}`;
const SidebarContainer = styled.div`
{
  background: #1a1a1a;
  width: 160px;
  height: 100vh ;
  
  text-decoration: none ;
}`



const SidebarTecnico = () => (

  <SidebarContainer >

    <div style={{ width: '160px' }} >
      <div>
        <img src={require('../../assets/logo.png')} style={{ width: '140px', margin: '10px 10px 10px 10px ' }}></img>
      </div>
      <Nav vertical>

        <Botao>
          <Link to="/">
            <NavItem>
              Minhas Tarefas
            </NavItem>
          </Link>
        </Botao>



      </Nav>

    </div>
  </SidebarContainer>
);

export default SidebarTecnico;