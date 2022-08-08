import {  React } from 'react';
import {  Button } from 'reactstrap';
import styled from 'styled-components';


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
    

   
        return (<>
        
            <Container1 style={{margin:'100px'}}>
            <div style={{ }}>
    </div>
                <hr  className="my-3"/>
                
                <h1>
                    Pagina não autorizada
                </h1>
                <Button> Voltar </Button>
            </Container1>
           
            </>);
    }
    export default Voltar
    