import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Login from "./Login";


import "../assets/css/style.css"
import "../assets/css/reset.css"

function App(){

    return(
        <>
            <Login/>
        </>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path="/" element={<Login/>} Route/>
        //     </Routes>
        // </BrowserRouter>
    )
}

export default App;
