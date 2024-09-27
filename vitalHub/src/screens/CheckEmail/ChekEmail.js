import { StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import {
  BoxNumeric,
  Container,
} from "../../components/Container/StyleContainer";
import {
  CodeResend,
  EmailDescription,
} from "../../components/Descriptions/Descriptions";
import { NumericInput } from "../../components/Input/Input";
import { Close, Logo } from "../../components/Images/StyleImages";
import {
  Title,
  TitleInvalidInputAlert,
} from "../../components/Title/StyleTitle";
import { useEffect, useRef, useState } from "react";
import api from "../../services/Services";
import axios from "axios";

export const CheckEmail = ({ navigation, route }) => {
  // Declaração de estados da página
  const [load, setLoad] = useState(false);
  const [codigo, setCodigo] = useState("");
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isInputDataValid, setIsInputDataValid] = useState(true); // Guardo o estado do input (se estiver errado, mostrar mensagem de erro)
  const [invalidCodeText, setInvalidCodeText] = useState(null);

  function focusNextInput(index) {
    // Verificar se o index é menor do que a quantidade de campos
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputs[index - 1].current.focus();
    }
  }

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  async function ValidarCodigo() {
    // console.log(`Coiso: ${`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`}`);
    // console.log(route);
    await api
      .post(
        `/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`
      )
      .then(() => {
        // navigation.replace("Main", { uriPhoto: uri, screen: "PatientConsultation" });
        navigation.replace("RedefinePassword", {
          emailRecuperacao: route.params.emailRecuperacao,
        });
        setIsInputDataValid(true);
      })
      .catch((error) => {
        // console.log("Erro aqui: " + error);
        // if (error.response && error.response.data) {
        //   console.log("Código incorreto ou outro erro:", error.response.data);
        // }
        setIsInputDataValid(false);

        if (axios.isAxiosError(error)) {
          // Aqui você tem acesso a configuração, requisição e resposta

          // Verifica se o código contém valor
          if (codigo == "") {
            setInvalidCodeText(null);
          } else {
            if (error.response?.status == 400) {
              console.log("Código incorreto");
              setInvalidCodeText("Código incorreto");
            }
          }
        } else {
          // Tratamento de erros genéricos
          console.log("Erro genérico:", error.message);
        }
      });
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* <Close source={require('../../assets/x-top-screen.png')} /> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Verifique seu e-mail</Title>

      <EmailDescription route={route} />

      {isInputDataValid === false ? (
        <TitleInvalidInputAlert>
          {invalidCodeText != null
            ? invalidCodeText
            : "Preencha todos os campos!"}
        </TitleInvalidInputAlert>
      ) : null}

      <BoxNumeric>
        {/* <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} /> */}

        {[0, 1, 2, 3].map((index) => (
          <NumericInput
            key={index}
            ref={inputs[index]}
            isInsertedInputValid={isInputDataValid}
            placeholder={"0"}
            placeholderTextColor={"#34898F"}
            onChangeText={(text) => {
              // Verificar se o campo é vazio
              if (text == "") {
                // focusPrevInput(index)
              } else {
                text != " " || text != ""
                  ? setIsInputDataValid(true)
                  : setIsInputDataValid(false);
                setInvalidCodeText(null);
                // Verificar se o campo foi preenchido
                const codigoInformado = [...codigo];
                codigoInformado[index] = text;

                // EX: [5, 9, 7, 8] => "5978"
                setCodigo(codigoInformado.join(""));

                // focusNextInput(index);
              }
            }}
          />
        ))}
        {/* <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} /> */}
      </BoxNumeric>

      <ButtonNormal
        text={"Confirmar"}
        onPress={() => {
          ValidarCodigo();
        }}
      />

      <CodeResend text={"Reenviar Código"} />
    </Container>
  );
};
