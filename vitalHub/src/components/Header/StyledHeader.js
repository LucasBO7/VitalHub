import styled, { css } from "styled-components";

import { LinearGradient } from 'expo-linear-gradient';

export const Header = styled(LinearGradient).attrs({
    colors: ['#60BFC5', '#496BBA'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
})`
    width: 100%;
    height: 115px;
    background-color: #FF99CC;
    border-radius: 0px 0px 22px 22px;
    elevation: 7px;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    padding-top: 15px;
`

