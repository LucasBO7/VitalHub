import styled from "styled-components"

export const Stethoscope = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 8px;

    elevation: 4;
    background-color: #49B3BA;

    position: fixed;
    bottom: 2%; 
    left: 37%; 

    align-items: center;
    justify-content: center;
`

export const StethoscopeModal = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.60);
`
export const ModalStetContent = styled.View`
    padding: 30px 30px 10px;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    align-items: center;

`

export const ContainerLabel = styled.View`
    width: 100%;
    gap: 10px;
    margin-top: 22px;
    align-items: center;
`

export const FlexButtons = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 138px;
    margin-bottom: 35px;
`