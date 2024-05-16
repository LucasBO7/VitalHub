import { ActivityIndicator, StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import { NormalButton } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";
import {
  Container,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { Input } from "../../components/Input/Input";
import { Cancel } from "../../components/Link/Link";
import {
  Title,
  TitleInvalidInputAlert,
} from "../../components/Title/StyleTitle";
import { LogoCreateAccount } from "../../components/Images/StyleImages";
import { useState } from "react";

import * as yup from "yup";
import api from "../../services/Services";
import {
  mascararRg,
  maskCpf,
  maskData,
  maskRg,
  unmaskCpf,
  unmaskRg,
} from "../../utils/InputMasks";

export const CreateAccount = ({ navigation, route }) => {
  const schema = yup.object().shape({
    senha: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("senha"), null], "As senhas devem coincidir")
      .required("A confirmação de senha é obrigatória"),
  });

  // const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDataValid, setIsInputDataValid] = useState(true); // Guardo o estado do input (se estiver errado, mostrar mensagem de erro)

  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    idTipoUsuario: "FE373DEC-3E52-4DF5-B3B2-5A94865467E7",
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
    rg: "",
    cpf: "",
  });

  function getInvalidInputsName(inputs, inputsName) {
    let names = "";

    for (let index = 0; index < inputs.length; index++) {
      if (
        inputs[index] == "" ||
        inputs[index] == " " ||
        inputs[index] == undefined ||
        inputs[index] == null
      ) {
        names = `${names} ${inputsName[index]}`;
      }
    }
    return `${names} inválidos`;
  }

  async function HandleCadastro() {
    console.log(user);
    setIsLoading(true); // Aciona animação de carregando

    var form = new FormData();
    form.append("idTipoUsuario", user.idTipoUsuario);
    form.append("nome", user.nome);
    form.append("email", user.email);
    form.append("senha", user.senha);
    form.append("dataNascimento", user.dataNascimento);
    form.append("rg", user.rg);
    form.append("cpf", user.cpf);

    // Aqui
    // await schema.validate({ senha: user.senha, confirmPassword }, { abortEarly: false });
    if (user.senha == confirmPassword) {
      await api
        .post("/Pacientes", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setIsInputDataValid(true); // Valida o input
          console.log("Sucesso!");
          navigation.replace("Login");
        })
        .catch((error) => {
          console.log(error);
          setIsInputDataValid(false); // Invalida o input (retornando o visual de inserção inválida)
        });
    }
    setIsLoading(false); // Desativa animação de carregando
  }

  return (
    <ScrollContainer>
      <Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <LogoCreateAccount
          source={require("../../assets/VitalHub_Logo1.png")}
        />

        <Title>Criar Conta</Title>

        <DescriptionPassword
          description={
            "Insira seu endereço de e-mail e senha para realizar seu cadastro."
          }
        />

        {isInputDataValid === false ? (
          <TitleInvalidInputAlert>
            {getInvalidInputsName(
              [
                user.nome,
                user.email,
                user.senha,
                user.dataNascimento,
                user.rg,
                user.cpf,
              ],
              ["nome", "email", "senha", "dataNascimento", "rg", "cpf"]
            )}
          </TitleInvalidInputAlert>
        ) : null}

        <Input
          placeholder={"Usuário"}
          placeholderTextColor={"#49B3BA"}
          isInsertedInputValid={isInputDataValid}
          onChangeText={(text) => {
            setUser({ ...user, nome: text });
          }}
        />

        <Input
          placeholder={"E-mail"}
          placeholderTextColor={"#49B3BA"}
          isInsertedInputValid={isInputDataValid}
          onChangeText={(text) => {
            setUser({ ...user, email: text });
          }}
        />
        <Input
          placeholder={"Senha"}
          placeholderTextColor={"#49B3BA"}
          secureTextEntry={true}
          isInsertedInputValid={isInputDataValid}
          onChangeText={(text) => {
            setUser({ ...user, senha: text });
          }}
        />
        <Input
          placeholder={"Confirmar senha"}
          placeholderTextColor={"#49B3BA"}
          secureTextEntry={true}
          isInsertedInputValid={isInputDataValid}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />

        <Input
          placeholder={"Data de nascimento"}
          placeholderTextColor={"#49B3BA"}
          // secureTextEntry={true}
          isInsertedInputValid={isInputDataValid}
          fieldValue={maskData(user.dataNascimento)}
          onChangeText={(text) => {
            setUser({ ...user, dataNascimento: text });
          }}
        />

        <Input
          placeholder={"Rg. Ex... 00.000.000-0"}
          placeholderTextColor={"#49B3BA"}
          // secureTextEntry={true}
          isInsertedInputValid={isInputDataValid}
          keyboardType="numeric"
          fieldValue={maskRg(user.rg)}
          onChangeText={(text) => {
            setUser({ ...user, rg: unmaskRg(text) });
          }}
        />
        <Input
          placeholder={"CPF"}
          placeholderTextColor={"#49B3BA"}
          // secureTextEntry={true}
          isInsertedInputValid={isInputDataValid}
          keyboardType="numeric"
          fieldValue={maskCpf(user.cpf)}
          onChangeText={(text) => {
            setUser({ ...user, cpf: unmaskCpf(text) });
          }}
        />

        {/* <Input
                    placeholder={"CEP"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, cep: text })
                        setUser({ ...user }, user.cep = text)
                    }}
                />
                <Input
                    placeholder={"logradouro"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, cep: text })
                        setUser({ ...user }, user.logradouro = text)
                    }}
                />
                <Input
                    placeholder={"Cidade"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, cep: text })
                        setUser({ ...user }, user.cidade = text)
                    }}
                />
                <Input
                    placeholder={"Numero"}
                    placeholderTextColor={'#49B3BA'}
                    // secureTextEntry={true}
                    onChangeText={(text) => {
                        // setUser({ user, cep: text })
                        setUser({ ...user }, user.numero = text)
                    }}
                /> */}

        <ActivityIndicator
          animating={isLoading}
          hidesWhenStopped={false}
          size="large"
        />

        <ButtonNormal text={"Cadastrar"} onPress={() => HandleCadastro()} />

        <Cancel
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </Container>
    </ScrollContainer>
  );
};
