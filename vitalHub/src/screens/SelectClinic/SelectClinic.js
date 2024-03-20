import { StatusBar } from "react-native";
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

export const SelectCLinic = ({ navigation }) => {
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

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <TitleSelect>Selecionar clínica</TitleSelect>

      <FlatContainerSelect
        data={dataItens}
        renderItem={({ item }) => (
          <CardSelectClinic
            openTime={item.openTime}
            name={item.name}
            rate={item.rate}
            localization={item.localization}
          />
        )}
        keyExtractor={(item) => item.id}
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
