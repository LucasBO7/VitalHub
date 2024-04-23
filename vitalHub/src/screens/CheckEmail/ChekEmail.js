<<<<<<< HEAD
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
import { Input, NumericInput } from "../../components/Input/Input";
import { Close, Logo } from "../../components/Images/StyleImages";
import { Title } from "../../components/Title/StyleTitle";
import { useState, useRef } from "react";

export const CheckEmail = ({ navigation, route }) => {
  const [load, setLoad] = useState(false);
  const [codigo, setCodigo] = useState()
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function focusNextInput(index) {
    //verificar se o index é menor que a quantidade de campo

    if (index < inputs.length - 1) {
        inputs[index + 1 ].current.focus()
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
        inputs[index -1].current.focus()
    }
  }

  async function ValidarCodigo(){
    await api.post(`/RecuperarSenha/ValidarCodigoRecupeararSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
    .then(() => {
        navigation.replace("ForgotPassword", {emailRecuperacao : route.params.emailRecuperacao})
    }).catch
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

      <EmailDescription />

      <BoxNumeric>
        <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
      </BoxNumeric>

      {[0, 1, 2, 3].map((index) => (
        <InputCode
          keyboardType="numeric"
          placeholder="0"
          maxLength={1}
          careHidden={true}
          onChangeText={(txt) => {
            //Verificar se o campo é vazio
            if (txt == "") {
              focusPrevInput(index);
            } else {
              //Verificar se o campo foi prenchido

              const codigoInformado = [...codigo]
              codigoInformado[index] = txt
              setCodigo(codigoInformado.join(''))

           


              focusNextInput(index);
            }
          }}
        />
      ))}
=======
import { StatusBar } from "react-native"
import { ButtonNormal } from "../../components/Button/Button"
import { BoxNumeric, Container } from "../../components/Container/StyleContainer"
import { CodeResend, EmailDescription, } from "../../components/Descriptions/Descriptions"
import { NumericInput } from "../../components/Input/Input"
import { Close, Logo } from "../../components/Images/StyleImages"
import { Title } from "../../components/Title/StyleTitle"
import { useRef, useState } from "react"
import api from "../../services/Services"


export const CheckEmail = ({ navigation, route }) => {
    // Declaração de estados da página
    const [load, setLoad] = useState(false);
    const [codigo, setCodigo] = useState("");
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

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

    async function ValidarCodigo() {
        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
            .then(() => {
                navigation.replace("RedefinePassword", { emailRecuperacao: route.params.emailRecuperacao });
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
>>>>>>> develop

      <ButtonNormal
        text={"Confirmar"}
        onPress={() => {ValidarCodigo()}}
      />

<<<<<<< HEAD
      <CodeResend text={"Reenviar Código"} />
    </Container>
  );
};
=======
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* <Close source={require('../../assets/x-top-screen.png')} /> */}

            <Logo source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Verifique seu e-mail</Title>

            <EmailDescription route={route} />

            <BoxNumeric>
                {/* <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} /> */}

                {
                    [0, 1, 2, 3].map((index) => (
                        <NumericInput
                            key={index}
                            ref={inputs[index]}

                            placeholder={"0"}
                            placeholderTextColor={"#34898F"}

                            onChangeText={(text) => {
                                // Verificar se o campo é vazio
                                if (text == "") {
                                    focusPrevInput(index)

                                } else {
                                    // Verificar se o campo foi preenchido
                                    const codigoInformado = [...codigo]
                                    codigoInformado[index] = text

                                    // EX: [5, 9, 7, 8] => "5978"
                                    setCodigo(codigoInformado.join(''))


                                    focusNextInput(index);
                                }
                            }}
                        />
                    ))
                }
                {/* <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} />
                <NumericInput placeholder={"0"} placeholderTextColor={"#34898F"} /> */}
            </BoxNumeric>

            <ButtonNormal text={"Confirmar"} onPress={() => {
                ValidarCodigo()
            }}
            />

            <CodeResend text={"Reenviar Código"} />

        </Container>

    )
}
>>>>>>> develop
