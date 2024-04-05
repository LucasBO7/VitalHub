import { ActivityIndicator, Modal } from "react-native"
import { ButtonLargeSelect } from "../Button/Button"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"
import { CardCancelLess } from "../Descriptions/Descriptions"
import { DescriptionModalRecord } from "../Descriptions/StyledDescriptions"
import { ImageModalRecord } from "../Images/StyleImages"
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle"
import { BoxAgeEmailModal } from "./StyleAppointmentModal"
import { useEffect } from "react"
import { getAge } from "../../utils/Auth"


export const AppointmentModal = ({
    consult,
    roleUsuario,
    navigation,
    visible,
    setShowModalAppointment = null,
    ...rest
}) => {

    // useEffect(() => {
    //     // Busca a idade do paciente
    //     // if (consult != null)
    //     //     getAge(consult.paciente.dataNascimento);
    // }, [consult])

    function handlePress(rota) {
        // Fecha o modal
        setShowModalAppointment(false)
        // Redireciona para página Inserir Prontuário
        // navigation.replace();
        // navigation.replace(rota, { clinicaId: consult.medicoClinica.clinicaId })
    }

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade">

            <PatientModal>
                {
                    consult != null ? (
                        <ModalContent>

                            <ImageModalRecord source={require('../../assets/ImageModalRecord.png')} />

                            <TitleModalRecord>{consult.paciente.idNavigation.nome}</TitleModalRecord>

                            <BoxAgeEmailModal>

                                <DescriptionModalRecord>{getAge(consult.paciente.dataNascimento)}</DescriptionModalRecord>
                                <DescriptionModalRecord>{consult.paciente.idNavigation.email}</DescriptionModalRecord>

                            </BoxAgeEmailModal>

                            <ButtonLargeSelect
                                onPress={() => handlePress("MedicalRecords")}
                                text={"Inserir Prontuário"}
                            />

                            <CardCancelLess onPressCancel={() => setShowModalAppointment(false)} text={"Cancelar"} />

                        </ModalContent>
                    ) : (
                        <ActivityIndicator />
                    )
                }


            </PatientModal>

        </Modal>
    )
}