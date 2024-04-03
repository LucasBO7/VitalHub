import { Modal } from "react-native"
import { ButtonLargeSelect } from "../Button/Button"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"
import { CardCancelLess } from "../Descriptions/Descriptions"
import { DescriptionModalRecord } from "../Descriptions/StyledDescriptions"
import { ImageModalRecord } from "../Images/StyleImages"
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle"
import { BoxAgeEmailModal } from "./StyleAppointmentModal"


export const AppointmentModal = ({
    consulta,
    roleUsuario,
    navigation,
    visible,
    setShowModalAppointment = null,
    ...rest
}) => {

    function handlePress( rota ) {

        setShowModalAppointment(false)
        navigation.replace(rota, {clinicaId : consulta.medicoClinica.clinicaId})


    }
    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade">
                
            <PatientModal>

                <ModalContent>

                    <ImageModalRecord source={require('../../assets/ImageModalRecord.png')} />

                    <TitleModalRecord>Niccole Sarga</TitleModalRecord>

                    <BoxAgeEmailModal>

                        <DescriptionModalRecord>22 anos</DescriptionModalRecord>
                        <DescriptionModalRecord>niccole.sarga@gmail.com</DescriptionModalRecord>

                    </BoxAgeEmailModal>

                    <ButtonLargeSelect 
                    onPress={() => handlePress("MedicalRecords")} 
                    text={"Inserir Prontuário"} 
                    />

                    <CardCancelLess onPressCancel={() => setShowModalAppointment(false)} text={"Cancelar"} />

                </ModalContent>

            </PatientModal>

        </Modal>
    )
}