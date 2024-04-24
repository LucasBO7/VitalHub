import { StatusBar } from 'react-native'
import { ButtonNormal } from '../../components/Button/Button'
import { NormalButton } from '../../components/Button/StyleButton'
import { ButtonText } from '../../components/ButtonText/StyleButtonText'
import { Container } from '../../components/Container/StyleContainer'
import { DescriptionPassword } from '../../components/Descriptions/Descriptions'
import { Input } from '../../components/Input/Input'
import { Close, Logo } from '../../components/Images/StyleImages'
import { Title } from '../../components/Title/StyleTitle'
import { useState } from 'react'
import api from '../../services/Services'

export const RedefinePassword = ({ navigation, route }) => {
    const [senha, setSenha] = useState();
    const [confirmar, setConfirmar] = useState();

    async function ChangePassword() {
        if (senha === confirmar) {
            await api.post(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                senhaNova: senha
            }).then(() => {
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
            })
        } else {
            alert("Senhas incompatíveis!");
        }
    }



    return (

        <Container>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* <Close source={require('../../assets/x-top-screen.png')}/> */}

            <Logo source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Redefinir Senha</Title>

            <DescriptionPassword description={"Insira e confirme a sua nova senha"} />

            <Input
                placeholder={"Nova Senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}

                fieldValue={senha}
                onChangeText={(text) => {
                    setSenha(text)
                }}
            />

            <Input
                placeholder={"Confirmar nova senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}

                fieldValue={confirmar}
                onChangeText={(text) => {
                    setConfirmar(text)
                }}
            />

            <ButtonNormal onPress={() => ChangePassword()} text={"Confirmar nova senha"} />

        </Container>

    )

}