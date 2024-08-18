import { useState, useEffect } from 'react';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Config from '../../config';

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #1a1d1e;
  border-radius: 20px;
  padding: 30px;
  width: 500px;
  height: 500px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 10px;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    margin: 20px auto;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px;
  }
`;

const Label1 = styled.label`
  color: #d9d4cc;
  font-size: 16px;
`;

const Input1 = styled.input`
  color: #d9d4cc;
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
`;

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            var nivel = localStorage.getItem('nivel');

            if (nivel === 'administrador' || nivel === 'administrativo') {
                navigate("/atendimentos");
            } else if (nivel === 'tecnico') {
                navigate("/atendimentostecnico");
                window.location.reload();
            }
        }
    }, []);

    const signIn = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        const data = { email, senha };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        await fetch(`${Config.backend}/login`, requestInfo)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Falha na autenticação');
            })
            .then((token) => {
                localStorage.setItem('token', token.token);
                localStorage.setItem('nivel', token.nivel);
                localStorage.setItem('id_usuario', token.id);
                window.location.reload();
            })
            .catch((e) => {
                setErrMsg(e.message);
            });
    };

    return (
        <Container1>
            <div>
                <img
                    src={require('../../assets/logo.png')}
                    style={{ display: 'block', margin: '0px auto', width: '60%' }}
                    alt="Logo"
                />
            </div>
            <hr className="my-3" />
            {errMsg && <Alert color="danger" className="text-center">{errMsg}</Alert>}
            <Form onSubmit={signIn}>
                <FormGroup>
                    <Label1 for="email">Email</Label1>
                    <Input1
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Informe seu e-mail"
                    />
                </FormGroup>
                <FormGroup>
                    <Label1 for="password">Senha</Label1>
                    <Input1
                        type="password"
                        id="senha"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                        placeholder="Informe a senha"
                    />
                </FormGroup>
                <Button color="primary" type="submit" block>
                    Entrar
                </Button>
            </Form>
        </Container1>
    );
};

export default Login;
