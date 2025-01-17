import styled, { css } from "styled-components";


export const NormalButton = styled.TouchableOpacity`
    margin-top: 32px;
    border-radius: 8px;
    width: 90%;
    background-color: #496BBA;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: #496BBA;
    `

export const ButtonSend = styled.TouchableOpacity`
/* margin-top: 32px; */
border-radius: 5px;
width: 172px;
background-color: #49B3BA;
height: 48px;
align-items: center;
justify-content: center;
border-width: 1px;
border-color: #49B3BA;
flex-direction: row;
gap: 10px;
`


export const GoogleButton = styled(NormalButton)`
    margin-top: 20px; 
    gap: 27px;
    justify-content: center;
    flex-direction: row;
    background-color: #fff;
`

export const LargeButton = styled(NormalButton)`
    width: 91%;
    height: 52px;
    margin-top: 0px;
    margin-bottom: 30px;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #fbfbfb;
    background-color: #496bba;

    position: absolute;
    right: 15px;
    bottom: -20px;
`


export const ButtonBlocked = styled(NormalButton)`
    background-color: #ACABB7;
    border-color: #ACABB7;
    margin-top: 33px;
`
export const SmallButtonBlocked = styled(NormalButton)`
    background-color: #ACABB7;
    border-color: #ACABB7;
    width: 50%;
    margin-bottom: 40px;
    margin-top: 3px;
`

export const ButtonHome = styled.TouchableOpacity`
    width: 110px;
    justify-content: center;
    height: 40px;
    background-color: #496BBA;
    border: 1px solid #496BBA;
    border-radius: 5px;
    margin-top: 35px;
    margin-bottom: 10px;
`

export const ButtonHomeStet = styled(ButtonHome)`
    width: 88px;
    background-color: #60BFC5;
    border: 1px solid #60BFC5;
    margin-top: 0;
    margin-bottom: 0;
    `

export const WhiteButtonHome = styled(ButtonHome)`
    background-color: #FBFBFB;
    border: 2px solid #607EC5;
    /* height: 44px; */
`

export const WhiteButtonHomeStet = styled(WhiteButtonHome)`
    border: 2px solid #60BFC5;
    width: 88px;
    height: 40px;
    margin-top: 0;
    margin-bottom: 0;
`
export const LargeButtonSelect = styled(LargeButton)`
    width: 91%;
    height: 50px;
    margin-top: 30px;
    margin-bottom: 25px;
`

export const BoxButtons = styled.SafeAreaView`
    width: 100%;
    justify-content: center;
    align-items: center;

    margin-top: 42px;
`

export const LargeButtonConfirmModal = styled(LargeButton)`
    width: 100%;
    height: 50px;
    margin-top: 4%;
    margin-bottom: 25px;
`