import { StatusBar, Text } from "react-native";
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

export const SelectCLinic = ({ navigation, onCardClick, route }) => {
  const dataItens = [
    {
      id: "fsdfsfsdasdf",
      localization: "São Paulo, SP",
      openTime: "Seg-Sex",
      rate: "4,8",
      name: "Clínica Natureh",
    },
    {
      id: "fsdfsfsdaf",
      localization: "São Paulo, SP",
      openTime: "Seg-Sex",
      rate: "4,5",
      name: "Diamond Pró-Mulher",
    },
    {
      id: "fasdsdfsfsdf",
      localization: "Taboão, SP",
      openTime: "Seg-Sab",
      rate: "4,2",
      name: "Clínica Villa Lobos",
    },
    {
      id: "fsdffsfsdf",
      localization: "Taboão, SP",
      openTime: "Seg-Sab",
      rate: "4,0",
      name: "SP Oncologia Clínica",
    },
    {
      id: "fsdfsfassdf",
      localization: "São Paulo, SP",
      openTime: "Seg-Sab",
      rate: "3,9",
      name: "Clínica Tolstói",
    },
    {
      id: "fsdfsacafsdf",
      localization: "São Paulo, SP",
      openTime: "Seg-Sab",
      rate: "3,9",
      name: "Clínica Vila Alpina",
    },
  ];

  const [clinics, setClinics] = useState([]); // Lista de clínicas


  async function getAllClinics() {
    await api.get("/Clinica/ListarTodas")
      .then(response => {
        setClinics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllClinics();
  }, []);

  const [selectedCardId, setSelectedCardId] = useState();

  // Guarda o id da clínica selecionada no state
  const handleSelectedCard = (id) => {
    setSelectedCardId(id);
  };

  useEffect(() => {
    console.log(route);
  }, [route])


  return (
    <Container>
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
            selectedCardId={selectedCardId}
            onCardPress={handleSelectedCard}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <ButtonLargeSelect
        onPress={() => {
          navigation.navigate("SelectDoctor");
        }}
        text={"Continuar"}
      />

      <CardCancelLess
        onPressCancel={() => navigation.replace("Main")}
        text={"Cancelar"}
      />

    </Container>
  );
};
