import { useState } from "react";
import styled from "styled-components";

function DayButton({ days }) {

    const [selectedButton, setSelectedButton] = useState(false);

    function selectingDay() {
        !selectedButton ? setSelectedButton(true) : setSelectedButton(false);
        !days.selected ? days.selected = true : days.selected = false;
    }

    return (
        <>
            <Button type="button" dayS={days.selected} selected={selectedButton} onClick={selectingDay}>
                {days.name}
            </Button>
        </>
    )
}

export default DayButton;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    margin: 8px 4px 0 0;
    font-size: 17px;
    color: ${({ dayS }) => !dayS ? '#dbdbdb' : '#fff'} ;
    background-color: ${({ dayS }) => !dayS ? '#fff' : '#dbdbdb'};
    :disabled {
        background-color: #f2f2f2;
    }
`