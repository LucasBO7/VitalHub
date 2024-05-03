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
import { useEffect, useState } from "react";
import { Card } from "../../components/Cards/Cards";
import { CancellationModal } from "../../components/CancellationModal/CancellationModal";

import { FontAwesome6 } from "@expo/vector-icons";
import { Stethoscope } from "../../components/Stethoscope/StyleSthetoscope";
import { ModalStethoscope } from "../../components/Stethoscope/ModalStethoscope";
import { PatientAppointmentModal } from "../../components/PatientAppointmentModal/PatientAppointmentModal";
import { userDecodeToken } from "../../utils/Auth";

import api from "../../services/Services"
import moment from "moment";

export const PatientConsultation = ({ navigation, route }) => {
  const [user, setUser] = useState({
    name: '',
    id: '',
    role: ''
  });
  const [consults, setConsults] = useState({}); // Guarda todas as Consultas que estierem salvas no banco de dados
  const [selectedDate, setSelectedDate] = useState();

  const [consultStatus, setConsultStatus] = useState('agendada');
  const defaultImage = require("../../assets/CardDoctorImage.png");
  const [selectedConsultDoctor, setSelectedConsultDoctor] = useState(null);
  const [patientUser, setPatientUser] = useState(null);

  async function getUser(userTaken) {
    if (userTaken.role == 'medico') {
      // Busca médico
      await api.get(`/Medicos/BuscarPorId?id=${userTaken.id}`)
        .then(response => {
          setPatientUser(response.data);
        })
        .catch(error => {
          console.log(`HOUVE UM ERRO: ${error}`);
        });

    } else {
      // Busca paciente
      await api.get(`/Pacientes/BuscarPorId?id=${userTaken.id}`)
        .then(response => {
          // Dados usuário paciente
          setPatientUser(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setUser(token);
      getUser(token);

      setSelectedDate(moment().format('YYYY-MM-DD'));
    }
  }

  // Busca as Consultas do banco e guarda na const consults
  async function getAllConsults() {
    // console.log(`/Pacientes/BuscarPorData?dataConsulta=${selectedDate}&idPaciente=${user.id}`);
    await api.get(`/Pacientes/BuscarPorData?data=${selectedDate}&id=${user.id}`)
      .then(
        response => {
          setConsults(response.data);
        }
      )
      .catch(error => console.log(error));
  }

  // Função para alterar a imagem do usuário
  async function ChangePerfilPhoto() {
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: route.params.photoUri,
      name: `image.${route.params.photoUri.split(".").pop()}`,
      type: `image/${route.params.photoUri.split(".").pop()}`
    })


    await api.put(`/Usuario/AlterarFotoPerfil?id=${patientUser.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(async response => {
      console.log(`Dados: ${response.data}`);

      setPatientUser({ ...patientUser, foto: route.params.photoUri })

    }).catch(error => {
      console.log(`Erro na imagem: ${error}`);
    })
  }

  useEffect(() => {
    if (route.params != null) {
      ChangePerfilPhoto();
    }
  }, [route.params])

  useEffect(() => {
    profileLoad();
    getAllConsults();
  }, [...route.params.photoUri]);

  useEffect(() => {
    getAllConsults();
  }, [selectedDate])

  // useEffect(() => {

  // }, [])

  // STATES PARA OS MODAIS
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalStethoscope, setShowModalStethoscope] = useState(false);

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      {
        patientUser != null && user != null
          ? (
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
          )
          : null
      }


      <Calendar setSelectedDate={setSelectedDate} />

      <ButtonHomeContainer>
        <FilterButton
          onPress={() => {
            setConsultStatus('agendada')
          }}
          selected={consultStatus == 'agendada' ? true : false}
          text={"Agendadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus('realizada')
          }}
          selected={consultStatus == 'realizada' ? true : false}
          text={"Realizadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus('cancelada')
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
              name={item.medicoClinica.medico.idNavigation.nome}
              age={item.medicoClinica.medico.crm}
              routine={item.situacao.situacao}
              url={item.medicoClinica.medico.idNavigation.foto}
              status={consultStatus}
              onPressCancel={() => setShowModalCancel(true)}
              onPressAppointment={() => {
                navigation.navigate("ViewPrescription", {
                  prescriptionId: item.id,
                  doctorId: item.medicoClinica.medico.id,
                  doctorName: item.medicoClinica.medico.idNavigation.nome,
                  doctorEspecialidade: item.medicoClinica.medico.especialidade.especialidade1,
                  doctorCrm: item.medicoClinica.medico.crm,
                  consultDescricao: item.descricao,
                  consultDiagnostico: item.diagnostico,
                  consultPrescription: item.receita.medicamento
                });
              }}

              onPressAppointmentCard={() => {
                setSelectedConsultDoctor(item.medicoClinica);
                setShowModal(item.situacao.situacao === "agendada" ? true : false);
              }}
            />
          )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Stethoscope onPress={() => setShowModalStethoscope(true)}>
        <FontAwesome6 name="stethoscope" size={32} color={"white"} />
      </Stethoscope>

      <CancellationModal
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
