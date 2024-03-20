import { StatusBar } from "react-native"
import { ButtonNormal } from "../../components/Button/Button"
import { BoxNumeric, Container } from "../../components/Container/StyleContainer"
import { CodeResend, EmailDescription, } from "../../components/Descriptions/Descriptions"
import { NumericInput } from "../../components/Input/Input"
import { Close, Logo } from "../../components/Images/StyleImages"
import { Title } from "../../components/Title/StyleTitle"


export const CheckEmail = ({ navigation }) => {
    return (

        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* <Close source={require('../../assets/x-top-screen.png')} /> */}

            <Logo source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Verifique seu e-mail</Title>

            <EmailDescription />

            <BoxNumeric>
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
            </BoxNumeric>

            <ButtonNormal text={"Confirmar"} onPress={() => { navigation.navigate("RedefinePassword") }} />

            <CodeResend text={"Reenviar Código"} />

        </Container>

    )
}
