import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from "dayjs";

import UserContext from "./Context/UserContext";
import Login from "./Login";
import SignUp from "./SignUp";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";

import "../assets/css/style.css"
import "../assets/css/reset.css"

function App() {

    const [enabled, setEnabled] = useState(true);
    const [user, setUser] = useState([]);
    const [token, setToken] = useState([]);
    const [percentDone, setPercentDone] = useState(0);


    dayjs.extend(updateLocale)

    dayjs.updateLocale('en', {
        weekdays: [
            "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
        ]
    });

    const [weekDays, setWeekDays] = useState([
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
    ]);

    return (
        <>
            <BrowserRouter>

                <UserContext.Provider value={{
                    user, setUser, token, setToken, weekDays, setWeekDays,
                    percentDone, setPercentDone
                }}>

                    <Routes>
                        <Route path="/" element={<Login enabled={enabled} setEnabled={setEnabled} />} ></Route>
                        <Route path="/cadastro" element={<SignUp enabled={enabled} setEnabled={setEnabled} />} ></Route>
                        <Route path="/habitos" element={<Habits />} ></Route>
                        <Route path="/hoje" element={<Today />} ></Route>
                        <Route path="/historico" element={<History />} ></Route>
                    </Routes>

                </UserContext.Provider>

            </BrowserRouter>
        </>

    )
}

export default App;
