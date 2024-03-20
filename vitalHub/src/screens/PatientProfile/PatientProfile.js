import { useEffect, useState } from "react"
import { Container, ContainerCepCidade, ScrollContainer } from "../../components/Container/StyleContainer"
import { DescriptionPassword } from "../../components/Descriptions/Descriptions"
import { DescripritionEmail, DescripritionForgot } from "../../components/Descriptions/StyledDescriptions"
import { InputBox } from "../../components/InputBox/InputBox"
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages"
import { TitleProfile } from "../../components/Title/StyleTitle"
import { LargeButton, NormalButton } from "../../components/Button/StyleButton"
import { ButtonText } from "../../components/ButtonText/StyleButtonText"

import api from "../../services/Services"
import { BlockedSmallButton, ButtonLarge } from "../../components/Button/Button"

export const PatientProfile = () => {

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [cidade, setCidade] = useState('');

    useEffect(() => {

        const getCep = async () => {
            if (cep !== "" && cep.length === 8) {
                try {

                    const response = await api.get(`${cep}/json/`);

                    if (response.data) {

                        setLogradouro(response.data.logradouro);
                        setCidade(response.data.localidade);

                    } else {

                        alert("Verifique o CEP digitado !!!");

                    }
                } catch (error) {

                    console.log("Ocorreu um erro ao buscar o CEP", error);

                }
            }
        };

        getCep();

    }, [cep]);

    return (

        <ScrollContainer>

            <Container>

                <ImagemPerfilPaciente source={require('../../assets/ney.webp')} />

                <TitleProfile>Neymar Jr</TitleProfile>

                <DescriptionPassword description={"neymar.jr@gmail.com"} />

                <InputBox
                    placeholderTextColor={"#A1A1A1"}
                    textLabel={"Data de nascimento:"}
                    placeholder={"Ex. 04/05/1999"}
                    keyboardType="numeric"
                    editable={true}
                    fieldWidth={90}
                />
                <InputBox
                    placeholderTextColor={"#A1A1A1"}
                    textLabel={"CPF"}
                    placeholder={"CPF..."}
                    keyboardType="numeric"
                    maxLength={11}
                    editable={true}
                    fieldWidth={90}
                />
                <InputBox
                    placeholderTextColor={"#A1A1A1"}
                    textLabel={"Endereço"}
                    placeholder={"Endereço..."}
                    editable={false}
                    fieldValue={logradouro}
                    fieldWidth={90}
                />

                <ContainerCepCidade>
                    <InputBox
                        placeholderTextColor={"#A1A1A1"}
                        textLabel={"CEP"}
                        placeholder={"CEP..."}
                        maxLength={8}
                        onChangeText={text => setCep(text)}
                        keyboardType="numeric"
                        editable={true}
                        fieldWidth={40}
                        fieldValue={cep}
                    />
                    <InputBox
                        placeholderTextColor={"#A1A1A1"}
                        textLabel={"Cidade"}
                        placeholder={"Cidade..."}
                        editable={false}
                        fieldWidth={40}
                        fieldValue={cidade}
                    />
                </ContainerCepCidade>

                <ButtonLarge text={"Salvar"} />

                <ButtonLarge text={"Editar"}/>

                <BlockedSmallButton text={"Sair do app"}/>

            </Container>

        </ScrollContainer>

    )
}