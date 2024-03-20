import { StatusBar } from "react-native"
import { ButtonNormal } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { DescriptionPassword } from "../../components/Descriptions/Descriptions"
import { Input } from "../../components/Input/Input"
import { Logo, Seta } from "../../components/Images/StyleImages"
import { Title } from "../../components/Title/StyleTitle"


export const ForgotPassword = ({ navigation }) => {

    return (

        <Container>

            {/* <Seta source={require('../../assets/Seta.png')} /> */}

            <Logo source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Recuperar senha</Title>

            <DescriptionPassword description={"Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"} />

            <Input
                placeholder={"Usuário ou E-mail"}
                placeholderTextColor={'#49B3BA'}
            />

            <ButtonNormal text={"Continuar"} onPress={() => navigation.navigate("CheckEmail")} />


        </Container>

    )

}