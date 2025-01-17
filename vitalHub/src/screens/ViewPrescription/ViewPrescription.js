import { useEffect, useState, useTransition } from "react"
import { SendButton } from "../../components/Button/Button"
import { ButtonSend } from "../../components/Button/StyleButton"
import { BoxAgeEmail, BoxBtn, BoxDescription, BoxViewImageImport, Container, ScrollContainer, ViewImageImport } from "../../components/Container/StyleContainer"
import { CardBackLess, CardCancel, CardCancelLess, DescriptionDoc, DescriptionPassword } from "../../components/Descriptions/Descriptions"
import { ImagePrescription, ImagePrescriptionNull, ViewImage } from "../../components/Images/StyleImages"
import { HighInputBox, HighInputBoxGrey, InputBox, LargeInputTextBox } from "../../components/InputBox/InputBox"
import { Label } from "../../components/Label/Label"
import { TitleProfile } from "../../components/Title/StyleTitle"
import { ImportImages, Line, TitleImage } from "./Style"

import * as MediaLibrary from "expo-media-library"
import api from "../../services/Services"
import { ActivityIndicator } from "react-native"

// import { useRoute } from '@react-navigation/native';

export const ViewPrescription = ({ navigation, route }) => {
    const [descricaoExame, setDescricaoExame] = useState();
    const [uriCameraCapture, setUriCameraCapture] = useState();
    const [consultDoctor, setConsultDoctor] = useState();

    // Busca os dados do médico da API (s)
    async function getDoctorInfos() {
        await api.get(`/Medicos/BuscarPorId?id=${route.params.doctorId}`)
            .then(response => {
                setConsultDoctor(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        route.params.photoUri != undefined ? setDescricaoExame(route.params.photoUri) : undefined;
        getDoctorInfos();
        BuscarExame();
        // GetScreen();
    }, [])

    async function InserirExame() {
        const formData = new FormData();
        formData.append("ConsultaId", route.params.consultId);
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split('.').pop()}`,
            type: `image/${uriCameraCapture.split('.').pop()}`,
        });

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setDescricaoExame(descricaoExame + "\n" + response.data.descricao)

        }).catch(error => {
            console.log(error);
        })
    }

    async function BuscarExame() {
        await api.get(`/Exame/BuscarPorIdConsulta?idConsulta=${route.params.consultId}`)
            .then(response => {
                setDescricaoExame(response.data[0].descricao);
            })
            .catch(error => {
                console.log(`Erro ao Buscar Exame: ${error}`);
            })
    }

    useEffect(() => {
        setUriCameraCapture(route.params.photoUri);
    }, [route.params])

    useEffect(() => {
        if (uriCameraCapture) {
            InserirExame();
        }
    }, [uriCameraCapture])

    return (
        <>
            <ScrollContainer>
                {
                    consultDoctor != null
                        ? (
                            <Container>

                                <ViewImage source={{ uri: consultDoctor.idNavigation.foto }} />

                                <TitleProfile>{route.params.doctorName}</TitleProfile>

                                <BoxDescription>
                                    <DescriptionDoc description={route.params.doctorEspecialidade} />
                                    <DescriptionDoc description={consultDoctor.crm} />
                                </BoxDescription>

                                <HighInputBoxGrey
                                    fieldHeight={350}
                                    placeholderTextColor={"#A1A1A1"}
                                    textLabel={"Descrição da consulta"}
                                    placeholder={"Descrição"}
                                    editable={false}
                                    fieldWidth={90}
                                    fieldValue={route.params.consultDescricao}
                                />

                                <InputBox
                                    placeholderTextColor={"#A1A1A1"}
                                    textLabel={"Diagnóstico do paciente"}
                                    placeholder={"Diagnóstico"}
                                    editable={false}
                                    fieldWidth={90}
                                    fieldValue={route.params.consultDiagnostico}
                                />

                                <HighInputBoxGrey
                                    // fieldHeight={350}
                                    placeholderTextColor={"#A1A1A1"}
                                    textLabel={"Prescrição médica"}
                                    placeholder={"Prescrição"}
                                    editable={false}
                                    fieldWidth={90}
                                    fieldValue={route.params.consultPrescription}
                                />

                                <BoxViewImageImport>

                                    <Label textLabel={"Exames médicos"} />

                                    <ImportImages>
                                        {route.params ? <ImagePrescription source={{ uri: route.params.photoUri }} /> : <TitleImage>{"[ ! ] Nenhuma foto informada"}</TitleImage>}
                                    </ImportImages>

                                </BoxViewImageImport>

                                <BoxBtn>
                                    <SendButton onPress={() => {
                                        // route.params.viewToOpen = "ViewPrescription";
                                        navigation.navigate("Camera", { viewData: route.params, viewToOpen: "ViewPrescription" });
                                    }} text={"Enviar"}
                                    />
                                    <CardCancel onPressCancel={() => { navigation.replace("Main") }} text={"Cancelar"} />
                                </BoxBtn>

                                <Line />

                                <HighInputBoxGrey
                                    // fieldHeight={350}
                                    placeholderTextColor={"#A1A1A1"}
                                    placeholder={"Resultado do exame"}
                                    editable={false}
                                    fieldWidth={90}
                                    fieldValue={descricaoExame}
                                />

                                <CardBackLess onPressCancel={() => { navigation.goBack() }} text={"Voltar"} />
                            </Container>
                        )
                        : (
                            <ActivityIndicator />
                        )
                }


            </ScrollContainer>
        </>
    )
}