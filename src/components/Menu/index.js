import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../Context/UserContext";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Menu(){

    const navigate = useNavigate();
    const { percentDone } = useContext(UserContext);

    return (
        <>
            <Container>
                <span className="pointer" onClick={() => navigate('/habitos')}>Hábitos</span>

                <TodayProgress className="pointer" onClick={() => navigate('/hoje')}>
                    <div>
                        <CircularProgressbar value={percentDone} text={`Hoje`}
                            styles={buildStyles({
                                textColor: '#fff',
                                textSize: '25px',
                                trailColor: '#52b6ff',
                                pathColor: '#fff',
                            })} />
                    </div>
                </TodayProgress>

                <span className="pointer" onClick={() => navigate('/historico')}>Histórico</span>


            </Container>
        </>
    )
}

export default Menu;

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-family: 'Lexend Deca';
    line-height: 22px;
    text-align: center;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);

    span {
        color: #52b6ff;
    }
`

const TodayProgress = styled.div`
    width: 91px;
    height: 91px;
    border-radius: 50%;
    background-color: #52b6ff;
    position: relative;
    top: -35px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    div {
        width: 80%;
    }
`
