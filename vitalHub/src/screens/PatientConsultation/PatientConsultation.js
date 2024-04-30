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
    id: ''
  });
  const [consults, setConsults] = useState({}); // Guarda todas as Consultas que estierem salvas no banco de dados
  const [selectedDate, setSelectedDate] = useState();

  const [consultStatus, setConsultStatus] = useState('agendada');
  const image = require("../../assets/CardDoctorImage.png");
  const [selectedConsultDoctor, setSelectedConsultDoctor] = useState(null);

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setUser(token);

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

  useEffect(() => {
    profileLoad();
    getAllConsults();
  }, []);

  useEffect(() => {
    getAllConsults();
  }, [selectedDate])

  // STATES PARA OS MODAIS
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalStethoscope, setShowModalStethoscope] = useState(false);

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header>
        <StatusBar translucent backgroundColor="transparent" />

        <BoxHome>
          <ImagemHome source={require("../../assets/PatientHomeImage.png")} />

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
              url={image}
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
