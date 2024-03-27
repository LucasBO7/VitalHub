import { StatusBar } from "react-native";
import {
  BoxDataHome,
  BoxHome,
  ButtonHomeContainer,
  Container,
  FlatContainer,
  MoveIconBell,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { Header } from "../../components/Header/StyledHeader";
import { ImagemHome } from "../../components/Images/StyleImages";
import { NameTitle, WelcomeTitle } from "../../components/Title/Title";
import { Ionicons } from "@expo/vector-icons";
import Calendar from "../../components/Calendar/Calendar";

import { FilterButton } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { Card } from "../../components/Cards/Cards";
import { CancellationModal } from "../../components/CancellationModal/CancellationModal";
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal";

export const DoctorConsultation = ({ navigation }) => {
  //STATE PARA O ESTADO DOS CARDS FLATLIST, BOTOES FILTRO
  const [selected, setSelected] = useState({
    agendadas: true,
    realizadas: false,
    canceladas: false,
  });

  const image = require("../../assets/ImageCard.png");

  //   1 - Logout === ok
  //   2 - dados na tela de perfil
  //   3 - dados no Header quando logar

  async function profileLoad() {
    const token = await userDecodeToken();

    console.log("BANANAAA!");
    if (token) {
      console.log(token.name);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  // CARD MOCADOS

  const dataItens = [
    {
      id: 1,
      hour: "14:00",
      image: image,
      name: "Niccole Sarga",
      age: "22 anos",
      routine: "Rotina",
      status: "r",
    },
    {
      id: 2,
      hour: "15:00",
      image: image,
      name: "Richard Kosta",
      age: "28 anos",
      routine: "Urgência",
      status: "a",
    },
    {
      id: 3,
      hour: "17:00",
      image: image,
      name: "Neymar Jr",
      age: "28 anos",
      routine: "Rotina",
      status: "c",
    },
  ];

  //FILTRO PARA CARD

<<<<<<< HEAD
  const Check = (data) => {
    if (data.status === "a" && selected.agendadas) {
      return true;
    }
    if (data.status === "r" && selected.realizadas) {
      return true;
    }
    if (data.status === "c" && selected.canceladas) {
      return true;
    }
    return false;
  };
=======
    return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" />
            <Header>
>>>>>>> 6c0796e199911e1271820cdfaf064b34e82c220a

  const data = dataItens.filter(Check);

<<<<<<< HEAD
  // STATES PARA OS MODAIS
=======
                <BoxHome onPress={() => { navigation.navigate("PatientProfile") }}>
>>>>>>> 6c0796e199911e1271820cdfaf064b34e82c220a

  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  // RETURN

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <Header>
        <BoxHome>
          <ImagemHome source={require("../../assets/DoctorImage.png")} />

          <BoxDataHome>
            <WelcomeTitle textTitle={"Bem vindo"} />

            <NameTitle textTitle={"Dr. Claudio"} />
          </BoxDataHome>
        </BoxHome>

        <MoveIconBell>
          <Ionicons name="notifications" size={25} color="white" />
        </MoveIconBell>
      </Header>

      <Calendar />

      <ButtonHomeContainer>
        <FilterButton
          onPress={() => {
            setSelected({ agendadas: true });
          }}
          selected={selected.agendadas}
          text={"Agendadas"}
        />

        <FilterButton
          onPress={() => {
            setSelected({ realizadas: true });
          }}
          selected={selected.realizadas}
          text={"Realizadas"}
        />

        <FilterButton
          onPress={() => {
            setSelected({ canceladas: true });
          }}
          selected={selected.canceladas}
          text={"Canceladas"}
        />
      </ButtonHomeContainer>

      <FlatContainer
        data={data}
        renderItem={({ item }) => (
          <Card
            navigation={navigation}
            hour={item.hour}
            name={item.name}
            age={item.age}
            routine={item.routine}
            url={image}
            status={item.status}
            onPressCancel={() => setShowModalCancel(true)}
            onPressAppointment={() => setShowModalAppointment(true)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <CancellationModal
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      <AppointmentModal
        navigation={navigation}
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
      />

      {/* <Card url={require('../../assets/ImageCard.png')} name={"Niccole Sarge"} age={"22 anos"} routine={"Rotina"} hour={"14:00"}/>

                <Card url={require('../../assets/ImageCardMale.png')} name={"Richard Kosta"} age={"28 anos"} routine={"Urgência"} hour={"15:00"}/>

                <Card url={require('../../assets/ney.webp')} name={"Neymar Jr"} age={"33 anos"} routine={"Rotina"} hour={"17:00"}/> */}
    </Container>
  );
};
