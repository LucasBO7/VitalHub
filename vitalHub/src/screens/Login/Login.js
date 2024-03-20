import { Title } from "../../components/Title/StyleTitle";
import { Container } from "../../components/Container/StyleContainer";
import { Logo } from "../../components/Images/StyleImages";
import { Input } from "../../components/Input/Input";
import { LinkMedium } from "../../components/TextMedium/TextMedium";
import { LinkAccount } from "../../components/Link/Link";

import { ButtonGoogle, ButtonNormal } from "../../components/Button/Button";
import { StatusBar } from "react-native";

export const Login = ({ navigation }) => {

  async function Login() {
    navigation.replace("Main")
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
      />

      <Input
        placeholder={"Senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}
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
