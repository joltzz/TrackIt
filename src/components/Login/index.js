import styled from "styled-components";
import axios from "axios";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

import UserContext from "../Context/UserContext";
import Input from "../Styled/Input";
import Button from "../Styled/Button";
import Container from "../Styled/Container";
import FormLogin from "../Styled/FormLogin";
import StyledLink from "../Styled/StyledLink";

import logo from "../../assets/images/logo.png"
import loading from "../../assets/images/loading.svg";


function Login({ enabled, setEnabled }) {

    const URL_LOGIN = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(UserContext);

    function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {

            alert("Preencha os dados corretamente e tente novamente");

        } else {

            setEnabled(false);

            const promisse = axios.post(URL_LOGIN, {
                email,
                password
            });

            promisse.then(response => {
                setEnabled(true);
                setUser(response.data);
                setToken(response.data.token);
                navigate('/hoje');

            });

            promisse.catch(error => {
                alert('Email ou senha inválido(s). Tente novamente.');
                setEnabled(true);
                setEmail('');
                setPassword('');

            })
        }
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
                            {enabled ? "Entrar" : <img src={loading} alt=""/>}
                        </Button>
                    </form>
                </FormLogin>
                <StyledLink to="/cadastro"><TextoLink>Não tem uma conta? Cadastre-se!</TextoLink></StyledLink>
            </Container>
        </>
    )

}

export default Login;

const TextoLink=styled.p`
    font-family: Lexend Deca;
    font-size: 14px;
    line-height: 17.5px;
`
