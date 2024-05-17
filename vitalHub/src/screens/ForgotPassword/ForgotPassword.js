import { ActivityIndicator, StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import { Container } from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { Input } from "../../components/Input/Input";
import { Logo, Seta } from "../../components/Images/StyleImages";
import {
  Title,
  TitleInvalidInputAlert,
} from "../../components/Title/StyleTitle";
import api from "../../services/Services";
import { useState } from "react";

export const ForgotPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isInputDataValid, setIsInputDataValid] = useState(true); // Guardo o estado do input (se estiver errado, mostrar mensagem de erro)

  async function SendEmail() {
    setIsLoading(true);
    await api
      .post(`/RecuperarSenha?email=${email}`)
      .then(() => {
        setIsInputDataValid(true);
        navigation.navigate("CheckEmail", {
          emailRecuperacao: email,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsInputDataValid(false);
      });
    setIsLoading(false);
  }

  return (
    <Container>
      {/* <Seta source={require('../../assets/Seta.png')} /> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Recuperar senha</Title>

      <DescriptionPassword
        description={
          "Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"
        }
      />

      {isInputDataValid === false ? (
        <TitleInvalidInputAlert>Email inválido!</TitleInvalidInputAlert>
      ) : null}

      <Input
        placeholder={"Usuário ou E-mail"}
        placeholderTextColor={"#49B3BA"}
        isInsertedInputValid={isInputDataValid}
        fieldValue={email}
        onChangeText={(text) => {
          email != " " || email != ""
            ? setIsInputDataValid(true)
            : setIsInputDataValid(false);
          setEmail(text);
        }}
      />

      {/* Indicador de Loading */}
      <ActivityIndicator
        animating={isLoading}
        hidesWhenStopped={false}
        size="large"
      />

      <ButtonNormal
        text={"Continuar"}
        onPress={() => {
          SendEmail();
        }}
      />
    </Container>
  );
};
