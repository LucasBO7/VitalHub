import { ActivityIndicator, Modal } from "react-native"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"
import { Title, TitleModalSchedule } from "../Title/StyleTitle"
import { DescriptionConfirmModal, SmallDescriptionModal } from "../Descriptions/StyledDescriptions"
import { BoxDescriptions, BoxMedicoConsulta } from "./StyleConfirmAppointmentModal"
import { Label } from "../Label/Label"
import { LabelDescription } from "../Label/StyleLabel"
import { CardCancelLess, DescripritionModalSmall, DescripritionModalSmall2 } from "../Descriptions/Descriptions"
import { ButtonLargeConfirmModal, ButtonLargeModal, ButtonLargeSelect } from "../Button/Button"
import moment from "moment"
import { useEffect, useState } from "react"
import api from "../../services/Services"
import { userDecodeToken } from "../../utils/Auth"


export const ConfirmAppointmentModal = ({
    navigation,
    visible,
    setShowModal = null,
    agendamento,
    ...rest
}) => {

    const [profile, setProfile] = useState();

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setProfile(token);
        }
    }

    useEffect(() => {
        profileLoad();
    }, [])

    async function handleContinue() {
        await api.post(`/Consultas/Cadastrar`, {
            ...agendamento,
            pacienteId: profile.id,
            situacaoId: 'A3139466-853B-434B-928D-8AA58CC8C2D0',
        }).then(async () => {
            await setShowModal(false);
            navigation.replace("Main");
        }).catch(error => {
            console.log(error);
        })
    }

    return (

        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade">

            {
                agendamento != null
                    ? (
                        <PatientModal>

                            <ModalContent>

                                <Title>Agendar Consulta</Title>

                                <DescriptionConfirmModal>Consulte os dados selecionados para a sua consulta</DescriptionConfirmModal>

                                <BoxDescriptions>

                                    <LabelDescription>Data da consulta</LabelDescription>
                                    <DescripritionModalSmall text={moment(agendamento.dataConsulta).format("DD/MM/YYYY  HH:mm")} />

                                    <LabelDescription>Médico(a) da consulta</LabelDescription>
                                    <DescripritionModalSmall2 text={agendamento.doctorLabel} />
                                    <DescripritionModalSmall2 text={agendamento.doctorEspecialidade} />

                                    <LabelDescription>Local da consulta</LabelDescription>
                                    <DescripritionModalSmall text={agendamento.localizacao} />

                                    <LabelDescription>Tipo da consulta</LabelDescription>
                                    <DescripritionModalSmall text={agendamento.prioridadeLabel} />

                                </BoxDescriptions>

                                <ButtonLargeConfirmModal onPress={() => handleContinue()} text={"Confirmar"} />

                                <CardCancelLess onPressCancel={() => setShowModal(false)} text={"Cancelar"} />

                            </ModalContent>

                        </PatientModal>
                    )
                    : (
                        <ActivityIndicator />
                    )
            }
        </Modal>


    )
}

