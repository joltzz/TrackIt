import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Input from "../Styled/Input";
import Button from "../Styled/Button";
import Container from "../Styled/Container";
import FormLogin from "../Styled/FormLogin";
import StyledLink from "../Styled/StyledLink";

import logo from "../../assets/images/logo.png";
import loading from "../../assets/images/loading.svg";

function SignUp({enabled, setEnabled}){
    
    const URL_SIGN_UP='https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up'

    const navigate=useNavigate();

    const [formData, setFormData]=useState(
        {
            email:'',
            name:'',
            image:'',
            password:''
        }
    )

    function handleSingUp(e){
        e.preventDefault();

        if(!formData.email || !formData.name || !formData.image || !formData.password){
            alert('Preencha todos os campos corretamente e tente novamente!');
        }
        else{
            setEnabled(false);

            const promise=axios.post(URL_SIGN_UP, {
                ...formData
            })

            promise.then(response=>{
                setEnabled(true);
                console.log(response)
                navigate('/');
            })

            promise.catch(error=>{
                setEnabled(true);
                console.log(error)
                alert('Algo de errado aconteceu! Tente novamente.');
            })
        }
    }

    function handleInputChange(e){
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    return(
        <>
            <Container>
                <img src={logo} alt="trackit"/>
                <FormLogin>
                    <form onSubmit={handleSingUp}>
                        <Input type='email'
                        placeholder="email"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        disabled={!enabled}
                        />

                        <Input type='password'
                        placeholder="senha"
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password}
                        disabled={!enabled}
                        />

                        <Input type='text'
                        placeholder="nome"
                        name="name"
                        onChange={handleInputChange}
                        value={formData.name}
                        disabled={!enabled}
                        />

                        <Input type='text' 
                        placeholder="imagem"
                        name="image"
                        onChange={handleInputChange}
                        value={formData.image}
                        disabled={!enabled}
                        />
                        <Button type="submit" disabled={!enabled}>
                            {enabled ? 'Cadastrar' : <img src={loading} alt=""/>}
                        </Button>
                    </form>
                </FormLogin>
                <StyledLink to="/" ><TextoLink>J?? possu?? uma conta? Fa??a login aqui!</TextoLink></StyledLink>
            </Container>
        </>
    )
}

const TextoLink=styled.p`
    font-family: Lexend Deca;
    font-size: 14px;
    line-height: 17.5px;
`

export default SignUp;
