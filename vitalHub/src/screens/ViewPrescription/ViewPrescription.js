import { useEffect, useState } from "react"
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

// import { useRoute } from '@react-navigation/native';

export const ViewPrescription = ({ navigation, route, uriCameraCapture = null }) => {

    // const { photoUri } = route.params;

    // useEffect(() => {
    //     // console.log(photoUri)
    //     console.log("sada") 
    //     console.log(route.params)
    // }, [route])

    // const [uriCameraCapture, setUriCameraCapture] = useState();
    const [descricaoExame, setDescricaoExame] = useState();

    // Busca os dados do médico da API (s)
    async function getDoctorInfos() {
        await api.get(`/Medicos/BuscarPorId?id=${route.params.doctorId}`)
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {
        getDoctorInfos();
        AddValue();
    })

    // route.params.photoUri
    async function InserirExame() {
        const formData = new FormData();
        formData.append("ConsultaId", route.params.id);
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

    useEffect(() => {
        if (uriCameraCapture) {
            InserirExame()
        }
    }, [uriCameraCapture])

    async function AddValue() {
        route.params.viewToOpen = "ViewPrescription";
    }


    return (
        <>
            <ScrollContainer>

                <Container>

                    <ViewImage source={require("../../assets/ney.webp")} />

                    <TitleProfile>{route.params.doctorName}</TitleProfile>

                    <BoxDescription>
                        <DescriptionDoc description={"Cliníco geral"} />
                        <DescriptionDoc description={route.params.doctorCrm} />
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
                        // RESTA INSERIR NA API
                        fieldValue={'Prescrição...'}
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

                            navigation.navigate("Camera", { route: route });
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
                    />

                    <CardBackLess onPressCancel={() => { navigation.navigate("PatientConsultation") }} text={"Voltar"} />

                </Container>

            </ScrollContainer>
        </>
    )
}