import { StatusBar } from 'react-native'
import { ButtonNormal } from '../../components/Button/Button'
import { NormalButton } from '../../components/Button/StyleButton'
import { ButtonText } from '../../components/ButtonText/StyleButtonText'
import { Container } from '../../components/Container/StyleContainer'
import { DescriptionPassword } from '../../components/Descriptions/Descriptions'
import { Input } from '../../components/Input/Input'
import { Cancel } from '../../components/Link/Link'
import { Title } from '../../components/Title/StyleTitle'
import { LogoCreateAccount } from '../../components/Images/StyleImages'
import { useState } from 'react'


export const CreateAccount = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")

    async function HandleCadastro() {
        try {
            const response = await api.post("/Pacientes", {
                email: email,
                senha: senha,
                nome: nome,
                IdTipoUsuario: "570998FF-66A6-4752-A875-2001F6DD36B4"
            })

            if (!response.data.success) {
                throw new ('Cadastrado, yeah');
            }

            //Cadastrou-se e foi para a Login

            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    }

    return (

        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <LogoCreateAccount source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Criar Conta</Title>

            <DescriptionPassword description={"Insira seu endereço de e-mail e senha para realizar seu cadastro."} />

            <Input
                placeholder={"Usuário"}
                placeholderTextColor={'#49B3BA'}
                onChangeText={(text) => {
                    
                }}
            />

            <Input
                placeholder={"E-mail"}
                placeholderTextColor={'#49B3BA'}
                onChangeText={(text) => {
                    
                }}
            />
            <Input
                placeholder={"Senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}
            />
            <Input
                placeholder={"Confirmar senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}
            />

            <ButtonNormal text={"Cadastrar"} />

            <Cancel onPress={() => { navigation.navigate("Login") }} />

        </Container>
    )

}