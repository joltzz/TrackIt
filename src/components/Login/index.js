import styled from "styled-components";
import axios from "axios";
import {useState,useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import { createContext } from "react";

import Input from "../Styled/Input";
import Button from "../Styled/Button";

import logo from "../../assets/images/logo.png"
import loading from "../../assets/images/loading.svg";


function Login([enabled, setEnabled]){

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    const {setUser, setToken}=useContext(userContext);
    const userContext = createContext();

    const navigate=useNavigate();
    

    function handleLogin(e){
        e.preventDefault();
    }

    if(!email || !password){
        alert('Preencha os dados corretamente e tente novamente!')
    }
    else{
        setEnabled(false)

        const promise=axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",{
            email,
            password
        });

        promise.then(response=>{
            setEnabled(true);
            setUser(response.data);
            setToken(response.data.token);
            navigate('/hoje');
        })

        promise.catch(err=>{
            alert('Email ou senha inválido(s)! Tente novamente!');
            setEnabled(true);
            setEmail('');
            setPassword('');
        })
    }
    

    return (
        <>
            <Container>

                <img src={logo} alt="Trackit" />

                <FormLogin>

                    <form onSubmit={handleLogin}>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            disabled={!enabled}
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="senha"
                            disabled={!enabled}
                        />
                        <Button type="submit" disabled={!enabled} >
                            {enabled ? "Entrar" : <img src={loading}/>}
                        </Button>
                    </form>

                </FormLogin>

                <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>

            </Container>
        </>
    )
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 667px;
    padding: 68px 36px 0 36px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    img {
        width: 180px;
        height: 179px;
        margin-bottom: 32px;
    } 
`

const FormLogin = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    height: auto;
`

const StyledLink = styled(Link)`
    margin-top: 25px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #52B6FF;
`
