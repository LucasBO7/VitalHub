import { StatusBar } from "react-native";
import {
  BoxDataHome,
  BoxHome,
  ButtonHomeContainer,
  Container,
  FlatContainer,
  MoveIconBell,
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

import { FontAwesome6 } from "@expo/vector-icons";
import { Stethoscope } from "../../components/Stethoscope/StyleSthetoscope";
import { ModalStethoscope } from "../../components/Stethoscope/ModalStethoscope";
import { PatientAppointmentModal } from "../../components/PatientAppointmentModal/PatientAppointmentModal";
import { userDecodeToken } from "../../utils/Auth";

import api from "../../services/Services";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

export const PatientConsultation = ({ navigation, route }) => {
  const [user, setUser] = useState({
    name: "",
    id: "",
    role: "",
  });
  const [consults, setConsults] = useState({}); // Guarda todas as Consultas que estierem salvas no banco de dados
  const [selectedDate, setSelectedDate] = useState();

  const [consultStatus, setConsultStatus] = useState("agendada");
  const defaultImage = require("../../assets/CardDoctorImage.png");
  const [selectedConsultDoctor, setSelectedConsultDoctor] = useState(null);
  const [patientUser, setPatientUser] = useState(null);

  async function getUser(userTaken) {
    // Busca paciente
    await api
      .get(`/Pacientes/BuscarPorId?id=${userTaken.id}`)
      .then((response) => {
        // Dados usuário paciente
        setPatientUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setUser(token);
      getUser(token);

      setSelectedDate(moment().format("YYYY-MM-DD"));
    }
  }

  // Busca as Consultas do banco e guarda na const consults
  async function getAllConsults() {
    await api
      .get(`/Pacientes/BuscarPorData?data=${selectedDate}&id=${user.id}`)
      .then((response) => {
        setConsults(response.data);

        // Muda o status da consulta para 'realizada', se a data já tiver passado
        response.data.forEach((consult) => {
          // if (consult.situacaoId != "77C5A039-2BE0-4519-A3AF-C9D381168DF1") {
          //   if (consult.dataConsulta < currentHourDateFormated) {
          //     api
          //       .put(`/Consultas/Status`, {
          //         id: consult.id,
          //         situacaoId: "77C5A039-2BE0-4519-A3AF-C9D381168DF1",
          //       })
          //       .catch((error) => console.log(error));
          //   }
          // }
          if (consult.situacaoId != "77C5A039-2BE0-4519-A3AF-C9D381168DF1") {
            if (isDateTimePassed(consult.dataConsulta)) {
              api
                .put(`/Consultas/Status`, {
                  id: consult.id,
                  situacaoId: "77C5A039-2BE0-4519-A3AF-C9D381168DF1",
                })
                .catch((error) => console.log(error));
            }
          }
        });
      })
      .catch((error) => console.log(error));
  }

  function isDateTimePassed(dateTime) {
    // Convertendo a string de data/hora para um objeto Date
    const timestamp = new Date(Date.parse(dateTime));

    // Obter o momento atual
    const now = new Date();

    // Subtrair o valor DateTime fornecido do momento atual
    const differenceInMilliseconds = now.getTime() - timestamp.getTime();

    // Verificar se o valor DateTime fornecido é anterior ao momento atual
    if (differenceInMilliseconds > 0) {
      return true; // O valor DateTime já passou
    }

    // Se o valor DateTime é o mesmo dia, verificar o horário
    if (differenceInMilliseconds === 0) {
      const nowHour = now.getHours();
      const nowMinutes = now.getMinutes();
      const nowSeconds = now.getSeconds();
      const dateTimeHour = timestamp.getHours();
      const dateTimeMinutes = timestamp.getMinutes();
      const dateTimeSeconds = timestamp.getSeconds();

      // Comparar os horários
      if (
        nowHour > dateTimeHour ||
        (nowHour === dateTimeHour && nowMinutes > dateTimeMinutes) ||
        (nowHour === dateTimeHour &&
          nowMinutes === dateTimeMinutes &&
          nowSeconds >= dateTimeSeconds)
      ) {
        return true; // O horário já passou
      }
    }

    return false; // O valor DateTime não passou
  }

  // Função para alterar a imagem do usuário no banco de dados
  async function ChangePerfilPhoto() {
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: route.params.photoUri,
      name: `image.${route.params.photoUri.split(".").pop()}`,
      type: `image/${route.params.photoUri.split(".").pop()}`,
    });

    await api
      .put(`/Usuario/AlterarFotoPerfil?id=${patientUser.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        setPatientUser({ ...patientUser, foto: route.params.photoUri });
      })
      .catch((error) => {
        console.log(`Erro na imagem: ${error}`);
      });
  }

  useEffect(() => {
    if (route.params != null) {
      ChangePerfilPhoto();
    }
  }, [route.params]);

  useEffect(() => {
    profileLoad();
    getAllConsults();
  }, []); // AQUI user

  useEffect(() => {
    getUser(user); // Pega os dados do paciente
  }, [route.params]);

  useEffect(() => {
    getAllConsults();
  }, [selectedDate]);

  useFocusEffect(
    React.useCallback(() => {
      profileLoad();
    }, []) // Empty dependency array means this callback will only run once on mount and not on updates
  );

  // useEffect(() => {
  //   console.log("CONSULTAAAAAAAAAAAAAAAAAAAAAS");
  //   console.log(consults);
  // }, [consults]);

  // STATES PARA OS MODAIS
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalStethoscope, setShowModalStethoscope] = useState(false);
  const [modalConsultId, setModalConsultId] = useState();

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      {patientUser != null && user != null ? (
        <Header>
          <StatusBar translucent backgroundColor="transparent" />

          <BoxHome>
            <ImagemHome source={{ uri: patientUser.idNavigation.foto }} />

            <BoxDataHome>
              <WelcomeTitle textTitle={"Bem vindo"} />

              <NameTitle textTitle={user.name} />
            </BoxDataHome>
          </BoxHome>

          <MoveIconBell>
            <Ionicons name="notifications" size={25} color="white" />
          </MoveIconBell>
        </Header>
      ) : null}

      <Calendar setSelectedDate={setSelectedDate} />

      <ButtonHomeContainer>
        <FilterButton
          onPress={() => {
            setConsultStatus("agendada");
          }}
          selected={consultStatus == "agendada" ? true : false}
          text={"Agendadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus("realizada");
          }}
          selected={consultStatus == "realizada" ? true : false}
          text={"Realizadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus("cancelada");
          }}
          selected={consultStatus == "cancelada" ? true : false}
          text={"Canceladas"}
        />
      </ButtonHomeContainer>

      <FlatContainer
        data={consults}
        renderItem={({ item }) =>
          item.situacao.situacao == consultStatus && (
            <Card
              navigation={navigation}
              hour={moment(item.dataConsulta).format("HH:mm")}
              name={item.medicoClinica.medico.idNavigation.nome}
              age={item.medicoClinica.medico.crm}
              routine={item.situacao.situacao}
              url={item.medicoClinica.medico.idNavigation.foto}
              status={consultStatus}
              onPressCancel={() => {
                setShowModalCancel(true);
                setModalConsultId(item.id);
              }}
              onPressAppointment={() => {
                navigation.navigate("ViewPrescription", {
                  prescriptionId: item.id,
                  doctorId: item.medicoClinica.medico.id,
                  doctorName: item.medicoClinica.medico.idNavigation.nome,
                  doctorCrm: item.medicoClinica.medico.crm,
                  consultId: item.id,
                  consultDescricao: item.descricao,
                  consultDiagnostico: item.diagnostico,
                  doctorEspecialidade:
                    item.medicoClinica.medico.especialidade.especialidade1,
                  consultPrescription: item.receita.medicamento,
                });
              }}
              onPressAppointmentCard={() => {
                setSelectedConsultDoctor(item.medicoClinica);
                setShowModal(
                  item.situacao.situacao === "agendada" ? true : false
                );
              }}
            />
          )
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Stethoscope onPress={() => setShowModalStethoscope(true)}>
        <FontAwesome6 name="stethoscope" size={32} color={"white"} />
      </Stethoscope>

      <CancellationModal
        consultId={modalConsultId}
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      <ModalStethoscope
        navigation={navigation}
        visible={showModalStethoscope}
        setShowModalStethoscope={setShowModalStethoscope}
      />

      <PatientAppointmentModal
        consulta={selectedConsultDoctor}
        roleUsuario={user.role}
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
      />

      {/* <Main />  */}
    </Container>
  );
};
