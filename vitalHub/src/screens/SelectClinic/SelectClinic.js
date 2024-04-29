import { ActivityIndicator, StatusBar, Text } from "react-native";
import { ButtonLargeSelect } from "../../components/Button/Button";
import { LargeButtonSelect } from "../../components/Button/StyleButton";
import { CardSelectClinic } from "../../components/Cards/Cards";
import {
  Container,
  FlatContainerSelect,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { TitleSelect } from "../../components/Title/StyleTitle";
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions";
import { CardCancelLess } from "../../components/Descriptions/Descriptions";
import { useEffect, useState } from "react";
import api from "../../services/Services";

export const SelectClinic = ({ navigation, onCardClick, route }) => {
  const [clinics, setClinics] = useState([]); // Lista de clínicas
  const [selectedCardId, setSelectedCardId] = useState({
    clinicaId: null,
    clinicaLabel: null
  });

  async function getAllClinics() {
    await api.get("/Clinica/ListarTodas")
      .then(response => {
        setClinics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleContinue() {
    navigation.replace("SelectDoctor", {
      agendamento: {
        ...route.params.agendamento,
        ...selectedCardId
      }
    })

  }

  useEffect(() => {
    getAllClinics();
    console.log();
    console.log('Selecionar Clínica - OBJETO TRAZIDO:');
    console.log(route.params);
  }, []);

  useEffect(() => {
    console.log(`CLINICA SELECIONADA`);
    console.log(selectedCardId);
  }, [selectedCardId])


  // Guarda o id da clínica selecionada no state
  // const handleSelectedCard = (id) => {
  //   setSelectedCardId(id);
  // };


  return (
    <Container>
      {clinics != null
        ? (
          <>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />

            <TitleSelect>Selecionar clínica</TitleSelect>

            <FlatContainerSelect
              data={clinics}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardSelectClinic
                  clinic={item}
                  selectedCardId={selectedCardId.clinicaId}
                  setSelectedCardId={setSelectedCardId}
                />
              )}
              showsVerticalScrollIndicator={false}
            />

            <ButtonLargeSelect
              onPress={() => {
                handleContinue();
              }}
              text={"Continuar"}
            />

            <CardCancelLess
              onPressCancel={() => navigation.replace("Main")}
              text={"Cancelar"}
            />
          </>
        )
        : (
          <ActivityIndicator />
        )
      }
    </Container>
  );
};
