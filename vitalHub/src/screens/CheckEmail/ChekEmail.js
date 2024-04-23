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
        console.log(`Coiso: ${`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`}`);
        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
            .then(() => {
                navigation.replace("RedefinePassword", { emailRecuperacao: route.params.emailRecuperacao });
            })
            .catch(error => {
                console.log('Erro aqui: ' + error);
            });
    }

    return (

        <Container>

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
