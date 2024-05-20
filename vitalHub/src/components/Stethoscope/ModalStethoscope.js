
import { Modal } from "react-native";
import { TitleModal } from "../Title/StyleTitle";
import {
  ButtonLargeSelect,
  FilterButton,
  FilterButtonStet,
} from "../Button/Button";
import { LargeInputTextBox, LargeInputTextBoxStet } from "../InputBox/InputBox";
import {
  ButtonHomeContainer,
  ButtonHomeContainerStet,
} from "../Container/StyleContainer";
import {
  ContainerLabel,
  FlexButtons,
  ModalStetContent,
  StethoscopeModal,
} from "./StyleSthetoscope";
import { useState } from "react";
import { Label } from "../Label/Label";
import { CardCancelLess } from "../Descriptions/Descriptions";

export const ModalStethoscope = ({
  navigation,
  visible,
  setShowModalStethoscope,
  ...rest
}) => {
  const [selected, setSelected] = useState({
    rotina: false,
    exame: false,
    urgencia: false,
  });

  const [consultStatus, setConsultStatus] = useState(0)

  const [agendamento, setAgendamento] = useState(null)

  async function handleContinue() {
    await setShowModalStethoscope(false)

    navigation.replace("SelectClinic", {agendamento : agendamento})
  }

  return (
    // onPress={() => ' CF8E1C18-EAD1-4D08-ABCF-84F7A0564E55'}
    // onPress={() => '77C5A039-2BE0-4519-A3AF-C9D381168DF1'}
    // onPress={() => '6316E329-B881-41A5-B7CE-EDF8FA04BEFC'}
    
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <StethoscopeModal>
        <ModalStetContent>
          <TitleModal>Agendar Consulta</TitleModal>

          <ContainerLabel>
            <Label textLabel={"Qual o nível da consulta"} />
            <ButtonHomeContainerStet>
              <FilterButtonStet
                onPress={() => {
                  setAgendamento({
                    ...agendamento, //Manter as informacoes que ja existem dentro do state (Agendamento)
                    prioridade : ' CF8E1C18-EAD1-4D08-ABCF-84F7A0564E55',
                    prioridadeLabel : "Rotina"

                  })
                  setSelected({ rotina: true });
                  setConsultStatus(0);
                }}
                selected={selected.rotina}
                text={"Rotina"}
              />

              <FilterButtonStet
                onPress={() => {
                  setSelected({ exame: true });
                  setConsultStatus(1);
                }}
                selected={selected.exame}
                text={"Exame"}
              />

              <FilterButtonStet
                onPress={() => {
                  setSelected({ urgencia: true });
                  setConsultStatus(2);
                }}
                selected={selected.urgencia}
                text={"Urgencia"}
              />
            </ButtonHomeContainerStet>
          </ContainerLabel>

          <LargeInputTextBoxStet
            placeholderTextColor={"#34898F"}
            value={agendamento ? agendamento.localizacao : null}
            onChangeText={(txt) => setAgendamento({
                ...agendamento,
                localizacao : txt
            })}
            textLabel={"Informe a localização desejada"}
            placeholder={"Informe a localização"}
            editable={true}
          />

          <FlexButtons>
            <ButtonLargeSelect
              onPress={() => {handleContinue() }}
              text={"Continuar"}
            />

            <CardCancelLess
              onPressCancel={() => setShowModalStethoscope(false)}
              text={"Cancelar"}
            />
          </FlexButtons>
        </ModalStetContent>
      </StethoscopeModal>
    </Modal>
  );
};

