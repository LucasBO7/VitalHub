import { FlatList, StatusBar, Text } from "react-native";
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
import React, { useEffect, useState } from "react";
import { Card } from "../../components/Cards/Cards";
import { CancellationModal } from "../../components/CancellationModal/CancellationModal";
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal";

import api from "../../services/Services";
import { getAge, userDecodeToken } from "../../utils/Auth";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

export const DoctorConsultation = ({ navigation, route }) => {
  const [consults, setConsults] = useState([]); // Guarda todas as Consultas que estierem salvas no banco de dados
  const [consultStatus, setConsultStatus] = useState('agendada');
  const [selectedDate, setSelectedDate] = useState();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctor, setDoctor] = useState();

  // Guarda o Id da consulta para cancelá-la
  const [cancelConsultId, setCancelConsultId] = useState();

  const [user, setUser] = useState({
    name: '',
    id: ''
  });

  const image = require("../../assets/ImageCard.png");

  async function getDoctor(userTaken) {
    await api.get(`/Medicos/BuscarPorId?id=${userTaken.id}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.log(`HOUVE UM ERRO: ${error}`);
      });
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setUser(token);
      getDoctor(token);

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
    if (route.params != null) {
      ChangePerfilPhoto();
    }
  }, [route.params])

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    getDoctor(user) // Pega os dados do paciente
  }, [route.params])


  useEffect(() => {
    if (selectedDate) {
      getAllConsults();
    }
  }, [selectedDate]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     profileLoad();
  //   }, []), // Empty dependency array means this callback will only run once on mount and not on updates
  // );

  // STATES PARA OS MODAIS

  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  // RETURN
  return (
    < Container >
      <StatusBar translucent backgroundColor="transparent" />
      {
        doctor != null && user != null
          ? (
            <Header>
              <BoxHome>
                <ImagemHome source={{ uri: doctor != undefined ? doctor.idNavigation.foto : "../../assets/ImageCard.png" }} />

                <BoxDataHome>
                  <WelcomeTitle textTitle={"Bem vindo"} />

                  <NameTitle textTitle={user.name} />
                </BoxDataHome>
              </BoxHome>

              <MoveIconBell>
                <Ionicons name="notifications" size={25} color="white" />
              </MoveIconBell>
            </Header>
          ) : null
      }

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
        renderItem={({ item }) => (
          item.situacao.situacao == consultStatus
          && (
            <Card
              navigation={navigation}
              hour={'02:33'}
              name={item.paciente.idNavigation.nome}
              age={getAge(item.paciente.dataNascimento)}
              routine={item.situacao.situacao}
              url={item.paciente.idNavigation.foto}
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
          )
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
    </Container >
  );
};
