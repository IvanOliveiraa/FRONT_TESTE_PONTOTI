import {  React } from 'react';
import {  Button } from 'reactstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container1 = styled.div`
    align-items: center;
    background: #1a1d1e;

    border-radius: 20px;
    padding:30px;
    width: 500px;
    height: 400px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
        `;

const Voltar = () => {
    

    let navigate= useNavigate();
        return (<>
        
            <Container1 style={{margin:'100px'}}>
            <div style={{ color:'white'}}>
    </div>
                <hr  className="my-3"/>
                
                <h1 style={{ color:'white'}}>
                    Pagina não autorizada
                </h1>
                <Button onClick={navigate("/")}> Voltar </Button>
            </Container1>
           
            </>);
    }
    export default Voltar
    