import { StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import { NormalButton } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";
import { Container } from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { Input } from "../../components/Input/Input";
import { Close, Logo } from "../../components/Images/StyleImages";
import {
  Title,
  TitleInvalidInputAlert,
} from "../../components/Title/StyleTitle";
import { useState } from "react";
import api from "../../services/Services";

export const RedefinePassword = ({ navigation, route }) => {
  const [senha, setSenha] = useState();
  const [confirmar, setConfirmar] = useState();
  const [isInputDataValid, setIsInputDataValid] = useState(); // Guardo o estado do input (se estiver errado, mostrar mensagem de erro)
  const [inputsInvalidName, setInputsInvalidName] = useState(null);

  async function ChangePassword() {
    if (senha === confirmar) {
      setInputsInvalidName(null);
      await api
        .put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
          senhaNova: senha,
        })
        .then(() => {
          setIsInputDataValid(true);
          navigation.replace("Login");
        })
        .catch((error) => {
          setIsInputDataValid(false);
          console.log(error);
        });
    } else {
      setIsInputDataValid(false);
      setInputsInvalidName("Senhas incompatíveis!");
    }
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* <Close source={require('../../assets/x-top-screen.png')}/> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Redefinir Senha</Title>

      <DescriptionPassword description={"Insira e confirme a sua nova senha"} />

      {isInputDataValid === false ? (
        <TitleInvalidInputAlert>
          {inputsInvalidName == null ? "Campos inválidos!" : inputsInvalidName}
        </TitleInvalidInputAlert>
      ) : null}

      <Input
        placeholder={"Nova Senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}
        isInsertedInputValid={isInputDataValid}
        fieldValue={senha}
        onChangeText={(text) => {
          senha != " " || senha != ""
            ? setIsInputDataValid(true)
            : setIsInputDataValid(false);
          setSenha(text);
        }}
      />

      <Input
        placeholder={"Confirmar nova senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}
        isInsertedInputValid={isInputDataValid}
        fieldValue={confirmar}
        onChangeText={(text) => {
          confirmar != " " || confirmar != ""
            ? setIsInputDataValid(true)
            : setIsInputDataValid(false);
          setConfirmar(text);
        }}
      />

      <ButtonNormal
        onPress={() => ChangePassword()}
        text={"Confirmar nova senha"}
      />
    </Container>
  );
};
