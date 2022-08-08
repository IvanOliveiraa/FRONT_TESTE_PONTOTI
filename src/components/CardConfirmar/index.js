import React from 'react';
import styled from 'styled-components';


const ContainerCard = styled.div`{
  font-size: 18px;
  width: 150px;
  height: 60px;
  border: none;
  transition: transform .2s;
  
  text-decoration: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  cursor: pointer;
}`;
const HeaderCard = styled.div`{
  font-size:13px;
  width:100%;
  text-align:center;
  justify: center;
  background:#A9A9A9;
  color:white;

}`;
const Bodycard = styled.div`{
  font-size:10px;
  width:100%;
  text-align:left;
  background:white;
  color:#A9A9A9;

}`;

const CardConfirmar = () => (
    <ContainerCard>
        <HeaderCard>
          #500 JUNIOR SUN
        </HeaderCard>
        <Bodycard>
        <p style ={{padding: "0px 0px 0px 10px"}}>
        Manutenção impressora <br/>
        João da silva<br/>
        </p>
        </Bodycard>
    </ContainerCard>
);

export default CardConfirmar;