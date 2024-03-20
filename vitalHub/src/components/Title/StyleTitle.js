import styled, { css } from "styled-components";

export const Title = styled.Text`
    text-align: center;
    font-size: 20px;
    font-family: MontserratAlternates_600SemiBold;
    margin-bottom: 25px;
    color: #33303E;
`

export const TitleModal = styled(Title)`
    margin-bottom: 0px;
`

export const TitleModalRecord = styled(TitleModal)`
    margin-bottom: 18px;
    margin-top: 30px;
`

export const TitleProfile = styled(Title)`
    margin-bottom: 12px;
`

export const TitleName = styled.Text`
    font-family: MontserratAlternates_600SemiBold;
    align-self: flex-start;
    font-size: 16px;
    color: #FBFBFB;
`

export const TitleWelcome = styled.Text`
    align-self: flex-start;
    font-family: Quicksand_600SemiBold;
    font-size: 14px;
    color: #4E4B59;
`

export const TitleMonth = styled(Title)`

    margin-top: 5%;
    margin-right: 45%;
`

export const NameCard = styled(Title)`
    margin-left: 10px;
    font-size: 16px;
    align-self: flex-start;
    margin-bottom: 5px;
`

export const TitleSelect = styled(Title)`
    margin-top: 25%;
`

export const NameCardSelect = styled.Text`
    text-align: center;
    font-size: 16px;
    font-family: MontserratAlternates_600SemiBold;
    margin-top: 5%;
    margin-bottom: 6px;
    align-self: flex-start;
    color: #33303E;
`

export const NameCardClinic = styled(NameCardSelect)`
    margin-top: 3%;
`

export const TitleLocalization = styled(Title)`
    color: #000000;
    margin-top: 25px;
    margin-bottom: 7px
`