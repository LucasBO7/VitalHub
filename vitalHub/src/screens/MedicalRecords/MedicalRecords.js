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
        consultId: route.params.consultId,
        consultData: null
    });

    useEffect(() => {
        // Roda somente quando tiver o valor passado do Modal
        if (consult) {
            getConsultDataById();
        }
    }, [route.params])

    // Controle do valor do editable: controla se os inputs estarão editáveis ou não
    function handleIsInputsEditable(inputsEditableStats, setInputsEditableStats) {
        // Se estiverem editáveis, desativar
        // Se estiverem desativados, ativar
        inputsEditableStats === true ? setInputsEditableStats(false) : setInputsEditableStats(true);
    }

    // Busca os dados da consulta com a receita (prescrição)
    async function getConsultDataById() {
        await api.get(`/Consultas/BuscarPorId?idConsulta=${consult.consultId}`)
            .then(response => {
                setConsults({ ...consult, consultData: response.data });
            })
            .catch(error => console.log(`Erro na MedicalRecords: ${error}`));
    }

    // Salva as alterações
    async function saveDataChanges() {
        // Aguardando alterações da API
        await api.put('/Consultas/Prontuario', {
            id: consult.consultData.id,
            descricao: consult.consultData.descricao,
            diagnostico: consult.consultData.diagnostico,
        }).catch(error => {
            console.log(`Um erro ocorreu: ${error}`);
        });
    }

    return (
        <ScrollContainer>
            <ImagemPerfilPaciente source={require('../../assets/ney.webp')} />

            {route.params != null && consult.consultData != null ? (
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
                        fieldValue={consult.consultData.descricao}
                        onChangeText={(text) => {
                            setConsults({ ...consult }, consult.consultData.descricao = text);
                        }}
                    />

                    <LargeInputTextBox
                        placeholderTextColor={"#34898F"}
                        textLabel={"Diagnóstico do paciente"}
                        placeholder={"Diagnóstico"}
                        editable={editable}
                        fieldWidth={90}
                        fieldValue={consult.consultData.diagnostico}
                        onChangeText={(text) => {
                            setConsults({ ...consult }, consult.consultData.diagnostico = text)
                        }}
                    />

                    <HighInputBox
                        fieldHeight={350}
                        placeholderTextColor={"#34898F"}
                        textLabel={"Prescrição médica"}
                        placeholder={"Prescriçao médica"}
                        editable={editable}
                        fieldWidth={90}
                        fieldValue={consult.consultData.receita.observacoes}
                        onChangeText={(text) => {
                            setConsults({ ...consult }, consult.consultData.receita.observacoes = text)
                        }}
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