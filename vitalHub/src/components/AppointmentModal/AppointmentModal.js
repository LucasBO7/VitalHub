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

    // Atualiza a idade assim que consult tiver um valor e sempre que for alterada
    useEffect(() => {
        if (consult != null) {
            consult.paciente.age = getAge(consult.paciente.dataNascimento);
        }
    }, [consult])

    // Redireciona para a página de Inserir Prontuário (MedialRecords)
    function handlePress(rota) {
        // Fecha o modal
        setShowModalAppointment(false);

        // Redireciona para página Inserir Prontuário
        // navigation.replace(rota, { consultInfos,  });
        // navigation.replace("MedicalRecords", { navigation: navigation, consultInfos: consult });
        // navigation.replace(rota, { clinicaId: consult.medicoClinica.clinicaId })

        // navigation.replace(rota, { consultInfos: consult });
        navigation.replace(rota,
            {
                patientName: consult.paciente.idNavigation.nome,
                patientAge: consult.paciente.age,
                patientEmail: consult.paciente.idNavigation.email,
                consultId: consult.id
            });
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

                                <DescriptionModalRecord>{consult.paciente.age}</DescriptionModalRecord>
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