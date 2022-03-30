import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../components/Login";


import "../assets/css/style.css"
import "../assets/css/reset.css"

function App() {

    const [enabled, setEnabled] = useState(true);
    // const [user, setUser] = useState([]);
    // const [token, setToken] = useState([]);


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login enabled={enabled} setEnabled={setEnabled} />} ></Route>
                    {/* <Route path="/cadastro" element={<SignUp enabled={enabled} setEnabled={setEnabled} />} ></Route>
                    <Route path="/habitos" element={<Habits />} ></Route>
                    <Route path="/hoje" element={<Today />} ></Route>
                    <Route path="/historico" element={<History />} ></Route> */}
                </Routes>
            </BrowserRouter>
        </>

    )
}

export default App;
