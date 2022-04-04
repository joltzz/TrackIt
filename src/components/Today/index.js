import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';

import TopBar from "../Topbar";
import Menu from "../Menu";
import UserContext from "../Context/UserContext";
import CheckBoxToday from "../CheckBoxToday";

import loading from "../../assets/images/loading.svg"

function Today(){

    const [done, setDone] = useState(false);
    const [checked, setChecked] = useState(false);
    const { token, percentDone, setPercentDone } = useContext(UserContext);
    const [date, setDate] = useState(dayjs().format('dddd, DD/MM'));
    const [todaysHabits, setTodaysHabits] = useState([]);

    let counter = 0;

    useEffect(() => {
        const promisse = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        promisse.then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].done === true) {
                    counter++;
                    setDone(true);
                }
                if ((counter / response.data.length * 100) === 0) {
                    setDone(false);
                    setPercentDone(0);
                } else {
                    setPercentDone((counter / response.data.length * 100).toFixed(1));
                }
            }
            setTodaysHabits(response.data)
        });
        promisse.catch(error => console.log(error.response.data));
    }, [checked]);

    if (!todaysHabits) {
        return <img src={loading}/>
    }

     return (
        <>
            <Container>
                <TopBar />
                <TodayContent>
                    <Day>{date}</Day>
                    <Progress done={done} >{!done ? "Nenhum hábito concluído ainda" : `${percentDone}% dos hábitos concluídos`}</Progress>

                    <HabitList>
                        {todaysHabits.map((habit) =>
                            <Habit key={habit.id} isDone={habit.done} habit={habit}>
                                <div className="text">
                                    <Title>{habit.name}</Title>
                                    <div className="sequence"></div>
                                    <p>Sequência atual: <strong >{habit.currentSequence} dias </strong></p>
                                    <p>Seu recorde: <strong className="highest">{habit.highestSequence} dias </strong></p>
                                </div>

                                <CheckBoxToday setDone={setDone} setPercentDone={setPercentDone} counter={counter} todaysHabits={todaysHabits} habit={habit} checked={checked} setChecked={setChecked} >
                                </CheckBoxToday>
                            </Habit>
                        )}
                    </HabitList>

                    <Menu />
                </TodayContent>
            </Container>
        </>
    )
}

export default Today;

const Container = styled.div`
    width: 100%;
    font-family: 'Lexend Deca';
    padding-bottom: 50px;
`

const TodayContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 28px 17px 75px 17px;
`

const Day = styled.span`
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #126BA5;
`

const Progress = styled.span`
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: ${(props) => !props.done ? "#BABABA" : "#8FC549"};
`

const HabitList = styled.div`
    margin-top: 28px;
`

const Habit = styled.div`
    width: 340px;
    height: auto;
    padding: 13px 13px 13px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #666666;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .sequence{
        margin-bottom: 17px;
    }
    p {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    }
    strong{
        color: ${({ isDone }) => !isDone ? '#666666' : '#8FC549'}
    }
    .highest{
        color: ${({ habit, isDone }) => isDone ? habit.currentSequence >= habit.highestSequence ? '#8FC549' : '#666666' : '#666666'}
    }
`

const Title = styled.span`
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
`
