import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../Context/UserContext";

import check from "../../assets/images/check.png";


function CheckBoxToday({ habit, setChecked, checked }) {

    const { token } = useContext(UserContext);

    function checkDone() {
        if (!habit.done) {
            const promisseCheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            promisseCheck.then((response) => setChecked(!checked));
            promisseCheck.catch((error) => console.log(error.response.data));

        } else {
            const promisseUnCheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            promisseUnCheck.then((response) => setChecked(!checked));
            promisseUnCheck.catch((error) => console.log(error.response.data));
        }
    }

    return (
        <>
            <Checkbox habitDone={habit.done} onClick={checkDone}>
                <img src={check} alt="check" />
            </Checkbox>
        </>
    )
}

export default CheckBoxToday;

const Checkbox = styled.div`
    width: 69px;
    height: 69px;
    background-color: ${({ habitDone }) => !habitDone ? "#ebebeb" : "#8FC549"};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`
