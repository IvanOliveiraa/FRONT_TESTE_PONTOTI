import {  useState, useEffect } from 'react';
import { Form, FormGroup, Button, Alert } from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Config from '../../config';



const Container1 = styled.div`
    align-items: center;
    background: #1a1d1e;

    border-radius: 20px;
    padding:30px;
    width: 500px;
    height: 400px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px
        `;
const Label1 = styled.label`
color: #d9d4cc;
font-size: 16px;
    `;

    const Input1 = styled.input`
    color:#d9d4cc;
    font-size: 1rem;
    width: 100%;
    padding: 5px 0px 5px 10px;
    margin: 0px;
    background: #212324;
    border-radius: 3px;
    border: 0.5px solid #4f5659;
  &:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: rgba(2, 117, 216, 0.25) 0px 2px 5px -1px, rgba(2, 117, 216, 0.3) 0px 1px 3px -1px;
  }
    ::placeholder {
      color: #3b3b3b;
    }
      }
    `;

const Login = () => {
    let navigate = useNavigate();
    const[email, setEmail]= useState('');
    const[senha, setSenha]= useState('');
    const [errMsg, setErrMsg] = useState('');
    const[erro, SetErro]= useState('');



    useEffect(()=>{
            if(localStorage.getItem('token') != null) {
                console.log("redirecionou") ;
                var nivel = localStorage.getItem('nivel');

                if(nivel === 'administrador'){
                navigate("/atendimentos");
                }
                else if(nivel === 'administrativo'){
                    navigate("/atendimentos");
                    }
                else if(nivel === 'tecnico'){
                    navigate("/atendimentostecnico");
                    }
                
            }else{
                
                console.log("não redirecionou") ;
            }
            },[])
   
  const  signIn =async(e) => {
       
    
    

        const data = { email, senha };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        await fetch(`${Config.backend}/login`, requestInfo)
        .then(response => {
            if(response.ok) {
                var result = response.json();
                return result;     
            }
            
            throw new Error("Falha na autenticação");
        })
        .then(token => {       
            var accessToken = token.token;
            localStorage.setItem('token', accessToken);
            var nivel = token.nivel;
            localStorage.setItem('nivel', nivel);
            var id = token.id;
            localStorage.setItem('id_usuario', id);
                     
             return;
    
        })
        .catch(message => {
            setEmail('');
            setSenha('');
            SetErro ({ message });
            
                }); 
    }

   
        return (<>
        
            <Container1 style={{margin:'100px'}}>
            <div style={{ }}>
     <img src={require('../../assets/logo.png')}style={{display:'block',margin:'0px auto 0px auto', width:'60%',}}></img>
     </div>
                <hr  className="my-3"/>
                {
                    erro !== '' ? (
                        <Alert color="danger" className="text-center"> {erro} </Alert>
                    ) : ''
                }
                <Form onSubmit={signIn}>
                    <FormGroup>
                        <Label1 for="email">Email</Label1>
                        <Input1 type="text" id="email" onChange={e => setEmail (e.target.value)} value={email}placeholder="Informe seu e-mail" />
                    </FormGroup>
                    <FormGroup>
                        <Label1 for="password">Senha</Label1>
                        <Input1 type="password" id="senha" onChange={e => setSenha (e.target.value)} value={senha}placeholder="Informe a senha" />
                    </FormGroup>
                    <Button color="primary" block > Entrar </Button>
                </Form>
            </Container1>
           
            </>);
    }
    export default Login