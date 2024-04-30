
import { StatusBar } from 'react-native'
import { ButtonNormal } from '../../components/Button/Button'
import { NormalButton } from '../../components/Button/StyleButton'
import { ButtonText } from '../../components/ButtonText/StyleButtonText'
import { Container, ScrollContainer } from '../../components/Container/StyleContainer'
import { DescriptionPassword } from '../../components/Descriptions/Descriptions'
import { Input } from '../../components/Input/Input'
import { Cancel } from '../../components/Link/Link'
import { Title } from '../../components/Title/StyleTitle'
import { LogoCreateAccount } from '../../components/Images/StyleImages'
import { useState } from 'react'

import * as yup from 'yup';
import api from '../../services/Services'


export const CreateAccount = ({ navigation, route }) => {
    const schema = yup.object().shape({
        senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
        confirmPassword: yup.string().oneOf([yup.ref('senha'), null], 'As senhas devem coincidir').required('A confirmação de senha é obrigatória')
    });


    // const [confirmPassword, setConfirmPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('Paladino123');
    const [user, setUser] = useState({
        idTipoUsuario: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        nome: 'Paladino',
        email: 'teixeirapaladino921@gmail.com',
        senha: 'Paladino123',
        dataNascimento: "2024-04-22T18:09:28.308Z",
        rg: '5234606253',
        cpf: '52282675736',
        cep: '0337500',
        foto: 'string'
    });

    async function HandleCadastro() {
        // Aqui
        await schema.validate({ senha: user.senha, confirmPassword }, { abortEarly: false });
        // await api.post("/Pacientes", {

        // }).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // })

        await api.post("/Pacientes", {
            IdTipoUsuario: user.idTipoUsuario,
            Nome: user.nome,
            Email: user.email,
            Senha: user.senha,
            DataNascimento: user.dataNascimento,
            Rg: user.rg,
            Cpf: user.cpf,
            Cep: user.cep,
            Foto: 'string'
        }).then(response => {
            console.log('Sucesso!')
            console.log(response);
            navigation.replace('Login');
        }
        ).catch(error => console.log(error));
    }

    return (


        <ScrollContainer>
            <Container>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

                <LogoCreateAccount source={require('../../assets/VitalHub_Logo1.png')} />

                <Title>Criar Conta</Title>

                <DescriptionPassword description={"Insira seu endereço de e-mail e senha para realizar seu cadastro."} />

                <Input
                    placeholder={"Usuário"}
                    placeholderTextColor={'#49B3BA'}
                    onChangeText={(text) => {
                        // setUser({ user, nome: text })
                        setUser({ ...user }, user.nome = text)
                    }}
                />

                <Input
                    placeholder={"E-mail"}
                    placeholderTextColor={'#49B3BA'}
                    onChangeText={(text) => {
                        // setUser({ user, email: text })
                        setUser({ ...user }, user.email = text)

                    }}
                />
                <Input
                    placeholder={"Senha"}
                    placeholderTextColor={'#49B3BA'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, senha: text })
                        setUser({ ...user }, user.senha = text)
                    }}
                />
                <Input
                    placeholder={"Confirmar senha"}
                    placeholderTextColor={'#49B3BA'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                    }}
                />

                <Input
                    placeholder={"Data de nascimento"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        setUser({ ...user }, user.dataNascimento = text)
                    }}
                />

                <Input
                    placeholder={"RG"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, rg: text })
                        setUser({ ...user }, user.rg = text)

                    }}
                />
                <Input
                    placeholder={"CPF"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ ...user, cpf: text })
                        setUser({ ...user }, user.cpf = text)
                    }}
                />

                <Input
                    placeholder={"CEP"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, cep: text })
                        setUser({ ...user }, user.cep = text)
                    }}
                />

                <ButtonNormal text={"Cadastrar"} onPress={() => HandleCadastro()} />

                <Cancel onPress={() => { navigation.navigate("Login") }} />
            </Container >
        </ScrollContainer>

    )

}