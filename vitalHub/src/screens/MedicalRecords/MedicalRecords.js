import { BlockedButton, ButtonNormal } from "../../components/Button/Button"
import { BoxAgeEmail, Container, ScrollContainer } from "../../components/Container/StyleContainer"
import { DescriptionPassword, RecordsCancelButton } from "../../components/Descriptions/Descriptions"
import { CancelButtonRecords } from "../../components/Descriptions/StyledDescriptions"
import { HighInputBox, LargeInputTextBox } from "../../components/InputBox/InputBox"
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages"
import { TitleProfile } from "../../components/Title/StyleTitle"
import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import api from "../../services/Services"



export const MedicalRecords = ({ navigation, route }) => {
    const [editable, setEditable] = useState(false);
    const [consult, setConsults] = useState({
        patientName: route.params.patientName,
        patientAge: route.params.patientAge,
        patientEmail: route.params.patientEmail,
        consultDescricao: route.params.consultDescricao,
        consultDiagnostico: route.params.consultDiagnostico,
    });

    // Controle do valor do editable: controla se os inputs estarão editáveis ou não
    function handleIsInputsEditable(inputsEditableStats, setInputsEditableStats) {
        // Se estiverem editáveis, desativar
        // Se estiverem desativados, ativar
        inputsEditableStats === true ? setInputsEditableStats(false) : setInputsEditableStats(true);
    }

    async function saveDataChanges() {
        // Aguardando alterações da API
        await api.put('/Consultas/Prontuario', {
            
        })
            .catch(error => {
                console.log(`Um erro ocorreu: ${error}`);
            });
    }

    return (
        <ScrollContainer>
            <ImagemPerfilPaciente source={require('../../assets/ney.webp')} />

            {route.params != null && consult != null ? (
                <Container>
                    <TitleProfile>{consult.patientName}</TitleProfile>

                    <BoxAgeEmail>

                        <DescriptionPassword description={consult.patientAge} />
                        <DescriptionPassword description={consult.patientEmail} />

                    </BoxAgeEmail>



                    <HighInputBox
                        fieldHeight={350}
                        placeholderTextColor={"#34898F"}
                        textLabel={"Descrição da consulta"}
                        placeholder={"Descrição"}
                        editable={editable}
                        fieldWidth={90}
                        fieldValue={consult.consultDescricao}
                        onChangeText={(text) => {
                            setConsults({ ...consult, consultDescricao: text })
                        }}
                    />

                    <LargeInputTextBox
                        placeholderTextColor={"#34898F"}
                        textLabel={"Diagnóstico do paciente"}
                        placeholder={"Diagnóstico"}
                        editable={editable}
                        fieldWidth={90}
                        fieldValue={consult.consultDiagnostico}
                        onChangeText={(text) => {
                            setConsults({ ...consult, consultDiagnostico: text })
                        }}
                    />

                    <HighInputBox
                        fieldHeight={350}
                        placeholderTextColor={"#34898F"}
                        textLabel={"Prescrição médica"}
                        placeholder={"Prescriçao médica"}
                        editable={editable}
                        fieldWidth={90}
                        fieldValue={'Prescrição...'}
                    />

                    <ButtonNormal text={"Salvar"} onPress={() => {
                        saveDataChanges();
                    }} />

                    <BlockedButton text={"Editar"} onPress={() => {
                        handleIsInputsEditable(editable, setEditable);
                    }} />

                    <RecordsCancelButton onPress={() => {
                        navigation.replace("DoctorMain");
                    }}
                        text={"Cancelar"}
                    />

                </Container>
            ) : (
                <ActivityIndicator />
            )}
        </ScrollContainer>
    )
}