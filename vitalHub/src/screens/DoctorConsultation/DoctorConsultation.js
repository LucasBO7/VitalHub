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

import api from "../../services/Services";
import { userDecodeToken } from "../../utils/Auth";

export const DoctorConsultation = ({ navigation }) => {
  const [consults, setConsults] = useState(); // Guarda todas as Consultas que estierem salvas no banco de dados
  const [consultStatus, setConsultStatus] = useState('agendada');
  const [selectedDate, setSelectedDate] = useState();
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Guarda o Id da consulta para cancelá-la
  const [cancelConsultId, setCancelConsultId] = useState();

  const [user, setUser] = useState({
    name: '',
    id: ''
  });

  const image = require("../../assets/ImageCard.png");


  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setUser(token);

      setSelectedDate(moment().format('YYYY-MM-DD'));
    }
  }

  // Busca as Consultas do banco e guarda na const consults
  async function getAllConsults() {
    if (user.id && selectedDate) {
      await api.get(`/Medicos/BuscarPorData?data=${selectedDate}&id=${user.id}`)
        .then(
          response => {
            setConsults(response.data);
          }
        )
        .catch(error => console.log(error));
    }
  }

  useEffect(() => {
    profileLoad();
    getAllConsults();
  }, []);

<<<<<<< HEAD
  const [selectConsult, setSelectConsult] = useState(null)
  
  function MostrarModal(modal, consulta) {
    setConsultaSelecionada(consulta)

    if (modal == 'cancelar') {
        setShowModalCancel(true)
    } else if (modal == 'prontuario') {
        setShowModalAppointment(true)
    } else {
        setShowModalSchedule(true)
    }
}

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

  const data = dataItens.filter(Check);
=======
  useEffect(() => {
    getAllConsults();
  }, [selectedDate, consults])
>>>>>>> origin/develop

  // STATES PARA OS MODAIS

  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  // RETURN

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <Header>
        <BoxHome>
          <ImagemHome source={require("../../assets/DoctorImage.png")} />

          <BoxDataHome>
            <WelcomeTitle textTitle={"Bem vindo"} />

            <NameTitle textTitle={user.name} />
          </BoxDataHome>
        </BoxHome>

        <MoveIconBell>
          <Ionicons name="notifications" size={25} color="white" />
        </MoveIconBell>
      </Header>

      <Calendar setSelectedDate={setSelectedDate} />

      <ButtonHomeContainer>
        <FilterButton
          onPress={() => {
            setConsultStatus('agendada');
          }}
          selected={consultStatus == 'agendada' ? true : false}
          text={"Agendadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus('realizada');
          }}
          selected={consultStatus == 'realizada' ? true : false}
          text={"Realizadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus('cancelada');
          }}
          selected={consultStatus == 'cancelada' ? true : false}
          text={"Canceladas"}
        />
      </ButtonHomeContainer>

      <FlatContainer
        data={consults}
        renderItem={({ item }) =>
          item.situacao.situacao == consultStatus &&
          (
            <Card
              navigation={navigation}
              hour={'02:33'}
              name={item.paciente.idNavigation.nome}
              age={'22 anos'}
              routine={item.situacao.situacao}
              url={image}
              status={consultStatus}
              // Botão cancelar
              onPressCancel={() => {
                setShowModalCancel(true);
                setCancelConsultId(item.id);
              }}
              // Botão ver prescricão
              onPressAppointment={() => {
                navigation.navigate("ViewPrescription");
              }}

              // Clique no card
              onPressAppointmentCard={() => {
                setSelectedPatient(item);
                setShowModalAppointment(item.situacao.situacao === "agendada" ? true : false); // Mostrar Modal
              }}
            />
          )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <CancellationModal
        consultId={cancelConsultId}
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      <AppointmentModal
        consult={selectedPatient}
        roleUsuario={user.role}
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
