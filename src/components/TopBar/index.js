import { useContext } from "react";
import styled from "styled-components";
import trackit from "../../assets/images/TrackIt.svg"
import UserContext from "../Context/UserContext";


function TopBar(){

    const {user} = useContext(UserContext);

    return (
        <>
            <Container>
                <img src={trackit} alt=""/>
                <UserImage user={user}></UserImage>
            </Container>
        </>
    )

}

const Container=styled.div`

    width: 100%;
    height: 70px;
    padding: 10px 18px;
    background-color: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.2);

    img {
        width: 97px;
    }

    .user{
        display: flex;
        align-items: center;
        position: relative;
        .menu {
            width: 30px;
            height: auto;
            margin-right: -5px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            top: 20px;
            left: -30px;
        }
    }

    ion-icon{
        color: #fff;
    }

    .logout{
        width: 40px;
        height: 30px;
        margin-top: 5px;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:#fff;
        color: red;
        box-shadow: 0 0 4px rgba(0,0,0,0.7);
        z-index:1;
        font-size: 14px
    }
    
    .hidden{
        display: none;
    }

`

const UserImage=styled.div`

    width: 51px;
    height: 51px;
    border-radius: 50%;
    background-color: lightgray;
    background-image: ${props => `url(${props.user.image})`};
    background-size: 50px;
    background-position: center;

`

export default TopBar;
