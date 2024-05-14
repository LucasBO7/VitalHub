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

            // Muda o status da consulta para 'realizada', se a data já tiver passado
            response.data.forEach((consult) => {
              const currentHourDate = new Date();
              const currentHourDateFormated = currentHourDate.toISOString();

              // Se for agendada
              if (consult.situacaoId != "77C5A039-2BE0-4519-A3AF-C9D381168DF1") {
                // Se a data/horário passou
                if (isDateTimePassed(consult.dataConsulta)) {
                  // Executar o "realizada"
                  api.put(`/Consultas/Status`, {
                    id: consult.id,
                    situacaoId: "77C5A039-2BE0-4519-A3AF-C9D381168DF1"
                  }).catch(error => console.log(error));
                }
              }
            });
          }
        )
        .catch(error => console.log(error));
    }
  }

  function isDateTimePassed(dateTime) {
    // Obter o momento atual
    const now = new Date();

    // Subtrair o valor DateTime fornecido do momento atual
    const differenceInMilliseconds = now.getTime() - dateTime.getTime();

    // Verificar se o valor DateTime fornecido é anterior ao momento atual
    if (differenceInMilliseconds < 0) {
      return true; // O valor DateTime já passou
    }

    // Se o valor DateTime é o mesmo dia, verificar o horário
    if (differenceInMilliseconds === 0) {
      const nowHour = now.getHours();
      const nowMinutes = now.getMinutes();
      const nowSeconds = now.getSeconds();
      const dateTimeHour = dateTime.getHours();
      const dateTimeMinutes = dateTime.getMinutes();
      const dateTimeSeconds = dateTime.getSeconds();

      // Comparar os horários
      if ((nowHour > dateTimeHour || (nowHour === dateTimeHour && nowMinutes > dateTimeMinutes)) ||
        (nowHour === dateTimeHour && nowMinutes === dateTimeMinutes && nowSeconds >= dateTimeSeconds)) {
        return true; // O horário já passou
      }
    }

    return false; // O valor DateTime não passou
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

  // useEffect(() => {
  //   console.log();
  //   console.log('CONSULTAASS AQUIIIIII');
  //   console.log(consults);
  // }, [consults])

  // useEffect(() => {
  //   console.log();
  //   console.log('MÉDICOOOOOOOO AQUIIIIII');

  //   console.log(consults);
  // }, [consults])

  useFocusEffect(
    React.useCallback(() => {
      profileLoad();
    }, []), // Empty dependency array means this callback will only run once on mount and not on updates
  );

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
              // Botão 'cancelar'
              onPressCancel={() => {
                setShowModalCancel(true);
                setCancelConsultId(item.id);
              }}
              // Botão 'ver prescricão'
              onPressAppointment={() => {
                navigation.navigate("ViewPrescription", {
                  doctorName: user.name,
                  // doctorEspecialidade: item.medicoClinica.medico.especialidade.especialidade1,
                  doctorCrm: user.crm,
                  consultDescricao: item.descricao,
                  consultDiagnostico: item.diagnostico,
                  // consultPrescription: item.receita.medicamento,
                  consultId: item.id,
                  doctorId: item.medicoClinica.medicoId

                });

              }}

              // Clique no card
              onPressAppointmentCard={() => {
                setSelectedPatient(item);
                setShowModalAppointment(item.situacao.situacao === "realizada" ? true : false); // Mostrar Modal
                // navigation.navigate("")

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
