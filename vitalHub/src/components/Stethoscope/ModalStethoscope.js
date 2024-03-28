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
                  setSelected({ rotina: true });
                }}
                selected={selected.rotina}
                text={"Rotina"}
              />

              <FilterButtonStet
                onPress={() => {
                  setSelected({ exame: true });
                }}
                selected={selected.exame}
                text={"Exame"}
              />

              <FilterButtonStet
                onPress={() => {
                  setSelected({ urgencia: true });
                }}
                selected={selected.urgencia}
                text={"Urgencia"}
              />
            </ButtonHomeContainerStet>
          </ContainerLabel>

          <LargeInputTextBoxStet
            placeholderTextColor={"#34898F"}
            textLabel={"Informe a localização desejada"}
            placeholder={"Informe a localização"}
            editable={true}
          />

          <FlexButtons>
            <ButtonLargeSelect
              onPress={() => {
                navigation.navigate("SelectClinic");
                setShowModalStethoscope(false);

              }}
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
