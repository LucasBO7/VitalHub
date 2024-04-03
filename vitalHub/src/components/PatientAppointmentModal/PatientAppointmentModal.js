import { ActivityIndicator, Modal } from "react-native";
import {
  ButtonLargeConfirmModal,
  ButtonLargeModal,
  ButtonLargeSelect,
} from "../Button/Button";
import {
  ModalContent,
  PatientModal,
} from "../CancellationModal/StyleCancelationModal";
import { CardCancelLess } from "../Descriptions/Descriptions";
import { DescriptionModalRecord } from "../Descriptions/StyledDescriptions";
import { ImageModalRecord } from "../Images/StyleImages";
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle";
import { BoxAgeEmailModal } from "./StylePatientAppointmentModal";

export const PatientAppointmentModal = ({
  consulta,
  roleUsuario,
  navigation,
  visible,
  setShowModal = null,
  ...rest
}) => {

  function handlePress(rota) {

    setShowModalAppointment(false)
    navigation.replace(rota, { clinicaId: consulta.medicosClinicas.clinicaId })


  }
  console.log(consulta);

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        {
          consulta != null ? (
            <ModalContent>
              <ImageModalRecord
                source={require("../../assets/CardRecordPatient(doctorImage).png")}
              />

              <TitleModalRecord>{consulta.idNavigation.nome}</TitleModalRecord>

              <BoxAgeEmailModal>
                <DescriptionModalRecord>Clínico Geral</DescriptionModalRecord>
                <DescriptionModalRecord>{consulta.crm}</DescriptionModalRecord>
              </BoxAgeEmailModal>

              <ButtonLargeConfirmModal
                onPress={() => {
                  handlePress("MedicalRecords");
                }}
                text={"Ver Local da Consulta"}
              />

              <CardCancelLess
                onPressCancel={() => setShowModal(false)}
                text={"Cancelar"}
              />
            </ModalContent>
          ) : (
            <ActivityIndicator />
          )
        }
      </PatientModal>
    </Modal>
  );
};
