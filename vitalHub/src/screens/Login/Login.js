import { Title } from "../../components/Title/StyleTitle";
import { Container } from "../../components/Container/StyleContainer";
import { Logo } from "../../components/Images/StyleImages";
import { Input } from "../../components/Input/Input";
import { LinkMedium } from "../../components/TextMedium/TextMedium";
import { LinkAccount } from "../../components/Link/Link";
import { ButtonGoogle, ButtonNormal } from "../../components/Button/Button";
import { ActivityIndicator, StatusBar } from "react-native";
import { useState } from "react";

import api from "../../services/Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function Login() {
    setIsLoading(true); // Inicia animação de Loading
    api
      .post("/Login", {
        email: email,
        senha: senha,
      })
      .then(async (response) => {
        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        navigation.replace("Main");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        value={email}
        onChangeText={(event) => setEmail(event)}
      />

      <Input
        placeholder={"Senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}
        value={senha}
        onChangeText={(txt) => setSenha(txt)}
      />

      <LinkMedium
        textLink={"Esqueceu sua senha ?"}
        onPress={() => navigation.navigate("ForgotPassword")}
      />

      <ButtonNormal onPress={(e) => Login()} text={"Entrar"} />
      
      {/* Indicador de Loading */}
      <ActivityIndicator
        animating={isLoading}
        hidesWhenStopped={false}
        size="large"
      />

      <ButtonGoogle
        onPress={() => navigation.replace("DoctorMain")}
        text={"Entrar com Google"}
      />

      <LinkAccount onPress={() => navigation.replace("CreateAccount")} />
    </Container>
  );
};
