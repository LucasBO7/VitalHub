import { useEfct, useEffect, useState } from "react";
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
import {
  ImageView,
  ImagemPerfilPaciente,
} from "../../components/Images/StyleImages";
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
import { ActivityIndicator, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonCamera } from "../../components/Button/StyleButton";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  maskCep,
  maskCpf,
  maskDate,
  maskDateFormat,
  unmaskCep,
  unmaskDate,
  unmaskDateToApi,
} from "../../utils/InputMasks";

export const PatientProfile = ({ navigation, route }) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [patientUser, setPatientUser] = useState(null);

  const [editable, setEditable] = useState(false);
  const [userRole, setUserRole] = useState();

  // Busca os dados do usuário no banco
  async function getUser(userTaken) {
    setUserRole(userTaken.role);

    if (userTaken.role == "medico") {
      // Busca médico
      await api
        .get(`/Medicos/BuscarPorId?id=${userTaken.id}`)
        .then((response) => {
          setPatientUser(response.data);

          // setPatientUser({ ...patientUser, dataNascimento: maskDateFormat() });

          // Dados endereço
          setCep(response.data.endereco.cep);
          setCidade(response.data.endereco.cidade);
          setLogradouro(response.data.endereco.logradouro);
        })
        .catch((error) => {
          console.log(`HOUVE UM ERRO: ${error}`);
        });
    } else {
      // Busca paciente
      await api
        .get(`/Pacientes/BuscarPorId?id=${userTaken.id}`)
        .then((response) => {
          // Dados usuário paciente
          setPatientUser(response.data);

          // Dados endereço
          setCep(response.data.endereco.cep);
          setCidade(response.data.endereco.cidade);
          setLogradouro(response.data.endereco.logradouro);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Busca os dados do usuário logado (email, senha, token...)
  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      await getUser(token);
    }
  }

  // Altera a imagem do usuário
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
        setPatientUser((prevState) => ({
          ...prevState,
          idNavigation: {
            ...prevState.idNavigation,
            foto: route.params.photoUri,
          },
        }));
      })
      .catch((error) => {
        console.log(`Erro na imagem: ${error}`);
      });
  }

  // Carrega os dados contidos dentro do token
  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    if (route.params != null) {
      ChangePerfilPhoto();
    }
  }, [route.params]);

  // Busca os dados da localização por meio do cep
  useEffect(() => {
    const getCep = async () => {
      if (cep !== "" && cep.length === 8) {
        await axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => {
            setLogradouro(response.data.logradouro);
            setCidade(response.data.localidade);
          })
          .catch((error) => console.log(`Erro ao buscar cep: ${error}`));
      }
    };

    cep != undefined ? getCep() : console.log("VAZIOOOOOOOOOOO");
  }, [cep]);

  // useEffect(() => {
  //   console.log();
  //   console.log('__USUÁRIO__');
  //   console.log(patientUser);
  // }, [patientUser])

  // Controle do valor do editable: controla se os inputs estarão editáveis ou não
  function handleIsInputsEditable(inputsEditableStats, setInputsEditableStats) {
    // Se estiverem editáveis, desativar
    // Se estiverem desativados, ativar
    inputsEditableStats === true
      ? setInputsEditableStats(false)
      : setInputsEditableStats(true);
  }

  async function saveProfileChanges() {
    userRole === "paciente"
      ? await api
          .put(`/Pacientes?idUsuario=${patientUser.id}`, {
            dataNascimento: patientUser.dataNascimento,
            cpf: patientUser.cpf,
            logradouro,
            cidade,
            numero: 0,
            cep,
            foto: patientUser.idNavigation.foto,
          })
          .then((response) => {
            alert("Alterações salvas com sucesso!");
            handleIsInputsEditable(true, setEditable);
          })
          .catch((error) =>
            console.log(`Erro no salvamento das alteraões: ${error}`)
          )
      : await api.put(`/Medicos`, {
          crm: patientUser.crm,
          logradouro,
          cidade,
          numero: 0,
          cep,
          foto: patientUser.idNavigation.foto,
        });
  }

  // useEffect(() => {
  //   console.log(patientUser);
  // }, [patientUser]);

  return (
    <ScrollContainer>
      {patientUser != null ? (
        <Container>
          <ImageView>
            <ImagemPerfilPaciente
              source={{ uri: patientUser.idNavigation.foto }}
            />
            <ButtonCamera
              onPress={() =>
                navigation.navigate("Camera", {
                  navigation: navigation,
                  viewData: route.params,
                  viewToOpen: "Profile",
                })
              }
            >
              <MaterialCommunityIcons
                name="camera-plus"
                size={20}
                color="#FBFBFB"
              />
            </ButtonCamera>
          </ImageView>

          <TitleProfile>{patientUser.idNavigation.nome}</TitleProfile>

          <DescriptionPassword
            description={
              userRole === "medico"
                ? patientUser.crm
                : patientUser.idNavigation.email
            }
          />

          {userRole === "medico" ? (
            <>
              {/* Input da Especialidade */}
              <InputBox
                placeholderTextColor={"#A1A1A1"}
                textLabel={"Especialidade:"}
                placeholder={"Especialidade..."}
                keyboardType="numeric"
                editable={editable}
                fieldWidth={90}
                fieldValue={patientUser.especialidade}
                onChangeText={(text) => {
                  setPatientUser({ ...patientUser, especialidade: text });
                }}
              />

              {/* Input do CRM */}
              <InputBox
                placeholderTextColor={"#A1A1A1"}
                textLabel={"CRM"}
                placeholder={"CRM..."}
                keyboardType="numeric"
                maxLength={11}
                editable={editable}
                fieldWidth={90}
                fieldValue={patientUser.crm}
                onChangeText={(text) => {
                  setPatientUser({ ...patientUser, crm: text });
                }}
              />
            </>
          ) : (
            <>
              {/* Input da Data de nascimento */}
              <InputBox
                placeholderTextColor={"#A1A1A1"}
                textLabel={"Data de nascimento:"}
                placeholder={"Ex. 04/05/1999"}
                keyboardType="numeric"
                editable={editable}
                fieldWidth={90}
                // 00000000 || 0000-00-00 --> 00/00/0000
                fieldValue={
                  patientUser.dataNascimento &&
                  maskDate(patientUser.dataNascimento)
                }
                // 00/00/0000 --> 0000-00-00
                onChangeText={(text) => {
                  setPatientUser({
                    ...patientUser,
                    dataNascimento:
                      text.length < 10 ? text : unmaskDateToApi(text), // 2006-10-05
                  });
                }}
              />

              {/* Input do CPF */}
              <InputBox
                placeholderTextColor={"#A1A1A1"}
                textLabel={"CPF"}
                placeholder={"CPF..."}
                keyboardType="numeric"
                maxLength={14}
                editable={editable}
                fieldWidth={90}
                fieldValue={maskCpf(patientUser.cpf)}
                onChangeText={(text) => {
                  setPatientUser({ ...patientUser, cpf: text });
                }}
              />
            </>
          )}

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
              editable={editable}
              fieldWidth={40}
              keyboardType="numeric"
              fieldValue={maskCep(cep)}
              onChangeText={(text) => setCep(unmaskCep(text))}
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

          <ButtonLarge
            text={"Salvar"}
            onPress={() => {
              saveProfileChanges();
            }}
          />

          <ButtonLarge
            text={"Editar"}
            onPress={() => {
              handleIsInputsEditable(editable, setEditable);
            }}
          />

          <BlockedSmallButton
            text={"Sair do app"}
            onPress={() => {
              userTokenLogout();
              navigation.replace("Login");
            }}
          />
        </Container>
      ) : (
        <ActivityIndicator />
      )}
    </ScrollContainer>
  );
};
