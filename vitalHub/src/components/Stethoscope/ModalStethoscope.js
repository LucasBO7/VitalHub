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

  const [agendamento, setAgendamento] = useState(null)

  async function handleContinue() {
    await setShowModalStethoscope(false)

    navigation.replace("SelectClinic", { agendamento: agendamento })
  }

  return (
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
                    prioridadeId: 'CF8E1C18-EAD1-4D08-ABCF-84F7A0564E55',
                    prioridadeLabel: "Rotina"

                  })
                  setSelected({ rotina: true });
                }}
                selected={selected.rotina}
                text={"Rotina"}
              />

              <FilterButtonStet
                onPress={() => {
                  setSelected({ exame: true });
                  setAgendamento({
                    ...agendamento, //Manter as informacoes que ja existem dentro do state (Agendamento)
                    prioridadeId: '577F5DC6-BFD7-4432-9326-50FDB1E63B36',
                    prioridadeLabel: "Exame"

                  })
                }}
                selected={selected.exame}
                text={"Exame"}
              />

              <FilterButtonStet
                onPress={() => {
                  setSelected({ urgencia: true });
                  setAgendamento({
                    ...agendamento, //Manter as informacoes que ja existem dentro do state (Agendamento)
                    prioridadeId: '8121BDC2-E3FB-4D70-AC26-3138C215D048',
                    prioridadeLabel: "Urgencia"

                  })
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
              localizacao: txt
            })}
            textLabel={"Informe a localização desejada"}
            placeholder={"Informe a localização"}
            editable={true}
          />

          <FlexButtons>
            <ButtonLargeSelect
              onPress={() => handleContinue()}
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
