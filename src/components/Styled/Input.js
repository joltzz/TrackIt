
import styled from "styled-components";


const Input = styled.input`

        width: 100%;
        height: 45px;
        margin-bottom: 6px;
        padding-left: 11px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        background-color: #fff;
        
    ::placeholder {
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            letter-spacing: 0em;
            text-align: left;
            color: #DBDBDB;
    }
    :disabled {
        background-color: #F2F2F2;
        
    }
`

export default Input;
