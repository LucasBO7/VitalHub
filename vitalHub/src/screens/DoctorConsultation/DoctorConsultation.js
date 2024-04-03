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
  const [selected, setSelected] = useState({
    agendadas: true,
    realizadas: false,
    canceladas: false,
  });
  const [selectedDate, setSelectedDate] = useState();
  const [selectConsult, setSelectConsult] = useState(null);

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
      console.log(token.name);
    }
  }

  // Busca as Consultas do banco e guarda na const consults
  async function getAllConsults() {
    await api.get(`/Medicos/BuscarPorData?dataConsulta=${selectedDate}&idPaciente=${user.id}`)
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
          selected={selected.agendadas}
          text={"Agendadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus('realizada');
          }}
          selected={selected.realizadas}
          text={"Realizadas"}
        />

        <FilterButton
          onPress={() => {
            setConsultStatus('cancelada');
          }}
          selected={selected.canceladas}
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
              // item.medicoClinica.medico.idNavigation.nome
              age={item.medicoClinica.medico.age}
              routine={item.situacao.situacao}
              url={image}
              status={consultStatus}
              onPressCancel={() => setShowModalCancel(true)}
              onPressAppointment={() => {
                navigation.navigate("ViewPrescription");
              }}

              onPressAppointmentCard={() =>
                setSelectedConsult(item) &&
                setShowModal(item.status === "a" ? true : false)
              }
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
        consulta={selectConsult}
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
