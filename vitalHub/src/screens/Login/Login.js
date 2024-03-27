import { Title } from "../../components/Title/StyleTitle";
import { Container } from "../../components/Container/StyleContainer";
import { Logo } from "../../components/Images/StyleImages";
import { Input } from "../../components/Input/Input";
import { LinkMedium } from "../../components/TextMedium/TextMedium";
import { LinkAccount } from "../../components/Link/Link";

import { ButtonGoogle, ButtonNormal } from "../../components/Button/Button";
import { StatusBar } from "react-native";
import { useState } from "react";

import api from "../../services/Services";

import AsyncStorage from "@react-native-async-storage/async-storage"
import { userDecodeToken } from "../../utils/Auth";

export const Login = ({ navigation }) => {

    const [email, setEmail] = useState('gabrielmaosleves@gmail.com')
    const [senha, setSenha] = useState('maosleves')

  async function Login() {

    await api.post('/Login', {
      email : email,
      senha : senha
    }).then( async response => {

      console.log( response.data.token )

      await AsyncStorage.setItem("token", JSON.stringify( response.data ))

      const token = await userDecodeToken()

      if (token.role === "Paciente") {
        navigation.replace("Main")
      }
      else {
        navigation.replace("DoctorMain")
      }

    }).catch( error => {

      console.log(error)

    })

  }
  
  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Entrar ou criar conta</Title>

      <Input
        placeholder={"Usuário ou E-mail"}
        placeholderTextColor={"#49B3BA"}

        fieldValue={email}
        onChangeText={ txt => setEmail(txt)}
      />

      <Input
        placeholder={"Senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}

        fieldValue={ senha }
        onChangeText={(txt) => setSenha(txt)}
      />

      <LinkMedium
        textLink={"Esqueceu sua senha ?"}
        onPress={() => navigation.navigate("ForgotPassword")}
      />

      <ButtonNormal
        onPress={(e) => Login()}
        text={"Entrar"}
      />

      <ButtonGoogle
        onPress={() => navigation.replace("DoctorMain")}
        text={"Entrar com Google"}
      />

      <LinkAccount onPress={() => navigation.replace("CreateAccount")} />
    </Container>
  );
};
