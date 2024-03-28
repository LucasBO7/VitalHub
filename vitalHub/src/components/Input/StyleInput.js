import styled, { css } from "styled-components";

export const InputText = styled.TextInput`
width:90%;
/* border:2px solid #49B3BA; */
font-family: MontserratAlternates_600SemiBold;
color: #49B3BA;
border-radius: 10px;
padding: 20px;
margin-top: 10px;
margin-bottom: 5px;
font-size: 18px;
${(props) => (props.isInsertedInputValid ? `border: 2px solid #49B3BA` : `border: 2px solid red`)};
`

export const InputNumeric = styled.TextInput`
text-align: center;
width:65px;
height: 62px;
border:2px solid #77CACF;
font-family: MontserratAlternates_600SemiBold;
color: #34898F;
border-radius: 10px;
padding: 20px;
margin-top: 10px;
margin-bottom: 5px;
font-size: 18px;
`

export const InputProfile = styled.TextInput`

background-color: #F5F3F3;
padding-left: 15px;
text-align: left;
/* width:90%; */
height: 55px;
border:1px solid #F5F3F3;
font-family: MontserratAlternates_500Medium;
color: #33303E;
border-radius: 8px;
/* padding: 20px;
margin-top: 10px;
margin-bottom: 5px; */
font-size: 16px;
`
export const InputHigh = styled(InputText)`
    padding-bottom: 82px;
    height: 125px;
    width: 100%;
`
export const InputHighGrey = styled(InputHigh)`
    border:1px solid #F5F3F3;
    color: #33303E;
    background-color: #F5F3F3;
    font-family: MontserratAlternates_500Medium;
`

export const InputTextLarge = styled(InputText)`
    width: 100%;
`