import { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import {
  DescripritionEmail,
  DescripritionForgot,
} from "../../components/Descriptions/StyledDescriptions";
import { InputBox } from "../../components/InputBox/InputBox";
import { ImageView, ImagemPerfilPaciente } from "../../components/Images/StyleImages";
import { TitleProfile } from "../../components/Title/StyleTitle";
import { LargeButton, NormalButton } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";

import api from "../../services/Services";
import {
  BlockedSmallButton,
  ButtonLarge,
} from "../../components/Button/Button";

import { tokenClear, userDecodeToken, userTokenLogout } from "../../utils/Auth";
import moment from "moment";
import { ActivityIndicator, View } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonCamera } from "../../components/Button/StyleButton";
import { Camera } from "expo-camera";

export const PatientProfile = ({ navigation }) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [patientUser, setPatientUser] = useState(null);

  const [editable, setEditable] = useState(false);
  const [userRole, setUserRole] = useState();


  async function getUser(userTaken) {
    setUserRole(userTaken.role);

    if (userTaken.role == 'medico') {
      // Busca médico
      await api.get(`/Medicos/BuscarPorId?id=${userTaken.id}`)
        .then(response => {
          setPatientUser(response.data);

          // Dados endereço
          setCep(response.data.endereco.cep)
          setCidade(response.data.endereco.cidade);
          setLogradouro(response.data.endereco.logradouro);
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

          // Dados endereço
          setCep(response.data.endereco.cep)
          setCidade(response.data.endereco.cidade);
          setLogradouro(response.data.endereco.logradouro);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      console.log('TÁ AQUI');
      await getUser(token);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    const getCep = async () => {
      if (cep !== "" && cep.length === 8) {
        await api.get(`${cep}/json/`)
          .then(response => {
            setLogradouro(response.data.logradouro);
            setCidade(response.data.localidade);
          })
          .catch(error => console.log(error));
      }
    };

    getCep();
  }, [cep]);

  // Controle do valor do editable: controla se os inputs estarão editáveis ou não
  function handleIsInputsEditable(inputsEditableStats, setInputsEditableStats) {
    // Se estiverem editáveis, desativar
    // Se estiverem desativados, ativar
    inputsEditableStats === true ? setInputsEditableStats(false) : setInputsEditableStats(true);
  }

  // PArou aqui
  async function saveProfileChanges() {
    await api.put(`/Pacientes/AtualizarPerfil?id=${patientUser.id}`, {
      id: patientUser.id,
      dataNascimento: patientUser.dataNascimento,
      cpf: patientUser.cpf,
      logradouro,
      numero: 0,
      cep,
      foto: null
    }).then(response => { console.log('FOI') })
      .catch(error => console.log(error));
  }



  return (
    <ScrollContainer>
      {
        patientUser != null ? (
          <Container>
            <ImageView>
              <ImagemPerfilPaciente source={require("../../assets/ney.webp")} />

              <ButtonCamera onPress={() => navigation.navigate("Camera")}>
                <MaterialCommunityIcons name="camera-plus" size={20} color="#FBFBFB"/>
              </ButtonCamera>
            </ImageView>

            <TitleProfile>{patientUser.idNavigation.nome}</TitleProfile>

            <DescriptionPassword description={userRole === 'medico' ? patientUser.crm : patientUser.idNavigation.email} />

            <InputBox
              placeholderTextColor={"#A1A1A1"}
              textLabel={"Data de nascimento:"}
              placeholder={"Ex. 04/05/1999"}
              keyboardType="numeric"
              editable={editable}
              fieldWidth={90}
              // fieldValue={patientUser.dataNascimento && moment(patientUser.dataNascimento).format('DD-MM-YYYY')}
              fieldValue={patientUser.dataNascimento}
              onChangeText={(text) => {
                setPatientUser({ ...patientUser, dataNascimento: text });
              }}
            />
            <InputBox
              placeholderTextColor={"#A1A1A1"}
              textLabel={"CPF"}
              placeholder={"CPF..."}
              keyboardType="numeric"
              maxLength={11}
              editable={editable}
              fieldWidth={90}
              fieldValue={patientUser.cpf}
              onChangeText={(text) => {
                setPatientUser({ ...patientUser, cpf: text });
              }}
            />
            <InputBox
              placeholderTextColor={"#A1A1A1"}
              textLabel={"Endereço"}
              placeholder={"Endereço..."}
              editable={editable}
              fieldWidth={90}
              fieldValue={logradouro}
            />

            <ContainerCepCidade>
              <InputBox
                placeholderTextColor={"#A1A1A1"}
                textLabel={"CEP"}
                placeholder={"CEP..."}
                maxLength={8}
                keyboardType="numeric"
                editable={editable}
                fieldWidth={40}
                fieldValue={cep}
                onChangeText={(text) => setCep(text)}
              />
              <InputBox
                placeholderTextColor={"#A1A1A1"}
                textLabel={"Cidade"}
                placeholder={"Cidade..."}
                editable={editable}
                fieldWidth={40}
                fieldValue={cidade}
              />
            </ContainerCepCidade>

            <ButtonLarge text={"Salvar"} onPress={() => {
              saveProfileChanges();
            }} />

            <ButtonLarge text={"Editar"} onPress={() => {
              handleIsInputsEditable(editable, setEditable);
            }} />

            <BlockedSmallButton
              text={"Sair do app"}
              onPress={() => { userTokenLogout(); navigation.replace("Login"); }}
            />
          </Container>
        ) : (
          <ActivityIndicator />
        )
      }

    </ScrollContainer>
  );
};
