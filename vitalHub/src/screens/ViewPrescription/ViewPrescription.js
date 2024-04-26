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

// import { useRoute } from '@react-navigation/native';

export const ViewPrescription = ({ navigation, route }) => {
    const [descricaoExame, setDescricaoExame] = useState();
    const [uriCameraCapture, setUriCameraCapture] = useState();

    // Busca os dados do médico da API (s)
    async function getDoctorInfos() {
        await api.get(`/Medicos/BuscarPorId?id=${route.params.doctorId}`)
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log(`params`);
        console.log(route.params.photoUri);
        route.params.photoUri != undefined ? setDescricaoExame(route.params.photoUri) : undefined;
        getDoctorInfos();
        GetScreen();
    })

<<<<<<< HEAD
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
            console.log('OBJETO');
            console.log(response.data);
            setDescricaoExame(descricaoExame + "\n" + response.data.descricao)

        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (uriCameraCapture) {
            InserirExame();
        }
    }, [uriCameraCapture])

    async function GetScreen() {
        route.params.viewToOpen = "ViewPrescription";
    }

    useEffect(() => {
        console.log('PRESCRIÇÃO');
        console.log(route);
    }, [route])



=======
    async function name(params) {
        
    }

>>>>>>> 89c0d86c3801c50f483d18045c204088faf08128
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
                            console.log('__________ROTE BATATAAA___________');
                            console.log(route.params);

                            navigation.navigate("Camera", { viewData: route.params });
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

                    <CardBackLess onPressCancel={() => { navigation.navigate("PatientConsultation") }} text={"Voltar"} />

                </Container>

            </ScrollContainer>
        </>
    )
}