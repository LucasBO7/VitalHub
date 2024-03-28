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
<<<<<<< HEAD
  const [email, setEmail] = useState("Lucas@gmail.com");
  const [senha, setSenha] = useState("Lucas123");
  const [isLoading, setIsLoading] = useState(false);
=======

    const [email, setEmail] = useState('gabrielmaosleves@gmail.com')
    const [senha, setSenha] = useState('maosleves')
>>>>>>> 8c6089c2434bcacebfd34a72ed8172cff838026b

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

<<<<<<< HEAD
      <ButtonNormal
        onPress={(e) => Login()}
        text={"Entrar"}
=======
      <ButtonNormal onPress={(e) => Login()} text={"Entrar"} />

      {/* Indicador de Loading */}
      <ActivityIndicator
        animating={isLoading}
        hidesWhenStopped={false}
        size="large"
>>>>>>> bc9f4573f1cf8dd20ad8b9aec81a2f8901075e8a
      />

      <ButtonGoogle
        onPress={() => navigation.replace("DoctorMain")}
        text={"Entrar com Google"}
      />

      <LinkAccount onPress={() => navigation.replace("CreateAccount")} />
    </Container>
  );
};
