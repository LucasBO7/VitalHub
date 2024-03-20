import { Modal } from "react-native"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"
import { Title, TitleModalSchedule } from "../Title/StyleTitle"
import { DescriptionConfirmModal, SmallDescriptionModal } from "../Descriptions/StyledDescriptions"
import { BoxDescriptions, BoxMedicoConsulta } from "./StyleConfirmAppointmentModal"
import { Label } from "../Label/Label"
import { LabelDescription } from "../Label/StyleLabel"
import { CardCancelLess, DescripritionModalSmall, DescripritionModalSmall2 } from "../Descriptions/Descriptions"
import { ButtonLargeConfirmModal, ButtonLargeModal, ButtonLargeSelect } from "../Button/Button"


export const ConfirmAppointmentModal = ({
    navigation,
    visible,
    setShowModal = null,
    ...rest
}) => {
    return (

        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade">


            <PatientModal>

                <ModalContent>

                    <Title>Agendar Consulta</Title>

                    <DescriptionConfirmModal>Consulte os dados selecionados para a sua consulta</DescriptionConfirmModal>

                    <BoxDescriptions>

                        <LabelDescription>Data da consulta</LabelDescription>

                        <DescripritionModalSmall text={"1 de Novembro de 2023"} />

                        <LabelDescription>Médico(a) da consulta</LabelDescription>

                        <DescripritionModalSmall2 text={"Dra Alessandra"} />

                        <DescripritionModalSmall text={"Demartologa, Esteticista"} />

                        <LabelDescription>Local da consulta</LabelDescription>

                        <DescripritionModalSmall text={"São Paulo, SP"} />

                        <LabelDescription>Tipo da consulta</LabelDescription>

                        <DescripritionModalSmall text={"Rotina"} />

                    </BoxDescriptions>

                    <ButtonLargeConfirmModal onPress={() => { navigation.navigate("Main") }} text={"Confirmar"} />

                    <CardCancelLess onPressCancel={() => setShowModal(false)} text={"Cancelar"} />

                </ModalContent>

            </PatientModal>

        </Modal>


    )
}
