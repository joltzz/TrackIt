import styled from "styled-components";


function HabitDays(){
    
    let selected=false;

    if(daysToDo.includes(days.id)){
        selected=true;
    }

    return(
        <>
            <daysToDo selected={selected}>
                {days.name}
            </daysToDo>
        </>
    )
}

export default HabitDays;


const daysToDo=styled.div`

    width: 30px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items: center;
    border: 1px solid #d4d4d4;
    border-radius: 5px
    margin: 8px 4px 0 0;
    font-size: 17px;

    color: ${({selected})=> selected ? "#FFF" : "#dbdbdb"};
    background-color: ${({selected})=> selected ? "#dbdbdb" : "#FFF"};

`