import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import TopBar from "../TopBar";
import Menu from "../Menu";
import DayButton from "../DayButton";
import HabitsDays from "../HabitsDays";
import UserContext from "../Context/UserContext";

import loading from "../../assets/images/loading.svg";
import trash from "../../assets/images/Trashcan.svg";

function Habits() {

    const URL_HABITS = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const [habitName, setHabitName] = useState('');
    const [hidden, setHidden] = useState('hidden');
    const [disabled, setDisabled] = useState(false);
    const { token, weekDays, setWeekDays } = useContext(UserContext);
    const [allHabits, setAllHabits] = useState([]);
    const [noHabit, setNoHabit] = useState('');
    const [update, setUpdate] = useState(false);
    const HabitsDays = [];

    useEffect(() => {
        const habitPromise = axios.get(URL_HABITS, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        habitPromise.then(response => {
            setAllHabits(response.data);
            if (response.data.length !== 0) {
                setNoHabit('hidden');
            }
        })

        habitPromise.catch(error => console.log(error))
    }, [update]);

    function resetDays() {
        setWeekDays([
            {
                id: 0,
                name: "D",
                selected: false
            },
            {
                id: 1,
                name: "S",
                selected: false
            },
            {
                id: 2,
                name: "T",
                selected: false
            },
            {
                id: 3,
                name: "Q",
                selected: false
            },
            {
                id: 4,
                name: "Q",
                selected: false
            },
            {
                id: 5,
                name: "S",
                selected: false
            },
            {
                id: 6,
                name: "S",
                selected: false
            }
        ])
    }

    function cancel() {
        setHabitName('');
        setHidden('hidden')
        resetDays();
    }

    function handleAddHabit(e) {
        e.preventDefault();

        for (let i = 0; i < weekDays.length; i++) {
            if (weekDays[i].selected === true) {
                HabitsDays.push(weekDays[i].id);
            }
        }

        if (HabitsDays.length === 0) {
            alert('Selecione os dias da semana para o seu hábito!')
        }
        else if (habitName === '') {
            alert('Digite um nome para o seu hábito!')
        }
        else {
            setDisabled(true);
            const promise = axios.post(URL_HABITS, {
                name: habitName,
                days: HabitsDays
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            promise.then(() => {
                setUpdate(!update);
                setHabitName('');
                setDisabled(false);
                setHidden('hidden');
                resetDays();
            });

            promise.catch(error => console.log(error));
        }
    }

    function deleteHabit(eachHabit) {
        if (window.confirm(`Deseja mesmo deletar o hábito "${eachHabit.name}"?`)) {
            const promise = axios.delete(`${URL_HABITS}/${eachHabit.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            promise.then(() => {
                alert('Hábito deletado com sucesso.');
                setUpdate(!update);
            })

            promise.catch(error => console.log(error))
        }
    }

    if (!allHabits) {
        return <img src={loading} alt="" />
    }

    return (
        <>
            <Container>
                <TopBar />
                <Content>
                    <NavBar>
                        <h1>Meus Hábitos</h1>
                        <AddHabit onClick={() => hidden === 'hidden' ? setHidden('') : setHidden('hidden')}>+</AddHabit>
                    </NavBar>
                    <HabitsList>
                        <CreateHabit className={`${hidden}`}>
                            <form onSubmit={handleAddHabit}>
                                <input disabled={disabled}
                                    type='text'
                                    value={habitName}
                                    onChange={e => setHabitName(e.target.value)}
                                    placeholder="nome do hábito">
                                </input>
                                <DaySelect>
                                    {weekDays.map((days) => {
                                        <DayButton days={days}
                                            disabled={disabled}
                                            type='button'
                                            key={days.id}>
                                    </DayButton>
                                    })}
                                </DaySelect>
                                <div className="buttons">
                                    <CancelButton disabled={disabled} type='button' onClick={cancel}> Cancelar </CancelButton>
                                    <SaveButton disabled={disabled}>
                                        {!disabled ? "Salvar" : <Loader type="ThreeDots" color="#FFF" height={10} width={38} />}
                                    </SaveButton>
                                </div>
                            </form>
                        </CreateHabit>

                        {allHabits.map((eachHabit) =>
                            <EachHabit key={eachHabit.id}>
                                <span> {eachHabit.name} </span>
                                <img src={trash} alt='delete' onClick={() => deleteHabit(eachHabit)} />

                                <div className="days">
                                    {weekDays.map((days) =>
                                        <HabitDays key={days.id} days={days} daysToDo={eachHabit.days} ></HabitDays>
                                    )}
                                </div>
                            </EachHabit>
                        )}
                    </HabitsList>
                </Content>
            </Container>
        </>
    )
}

export default Habits;