import styled from "styled-components"

import Menu from "../Menu"
import Topbar from "../Topbar"

 function History() {
    return (
        <>
            <Topbar />
            <Warning>
                <h1>
                    Histórico
                </h1>
                <Container><span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span></Container>
            </Warning>

            <Menu />
        </>
    )
}

export default History;

const Warning = styled.div`
    padding: 22px 17px;
    font-family: 'Lexend Deca';

    h1 {
        font-size: 20px;
        color: #126BA5;
    }
`
const Container=styled.div`
    padding: 17px 0px;

    span{
        margin-top: 17px;
        height: 100;
        font-size: 18px;
        color: #666666;
    }
`
