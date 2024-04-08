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
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages";
import { TitleProfile } from "../../components/Title/StyleTitle";
import { LargeButton, NormalButton } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";

import api from "../../services/Services";
import {
  BlockedSmallButton,
  ButtonLarge,
} from "../../components/Button/Button";
import { userDecodeToken, userTokenLogout } from "../../utils/Auth";
import moment from "moment";

export const PatientProfile = ({ navigation }) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [patientUser, setPatientUser] = useState({});

  const [editable, setEditable] = useState(false);

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      getUser(token);
    }
  }

  // Controle do valor do editable: controla se os inputs estarão editáveis ou não
  function handleIsInputsEditable(inputsEditableStats, setInputsEditableStats) {
    // Se estiverem editáveis, desativar
    // Se estiverem desativados, ativar
    inputsEditableStats === true ? setInputsEditableStats(false) : setInputsEditableStats(true);
  }

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

  async function getUser(userTaken) {
    // console.log(userTaken);
    // console.log(`/Pacientes/BuscarPorId?id=${userTaken.id}`);
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
      });
  }

  useEffect(() => {
    profileLoad();
  }, []);

  return (
    <ScrollContainer>
      <Container>
        <ImagemPerfilPaciente source={require("../../assets/ney.webp")} />

        <TitleProfile>{patientUser.name}</TitleProfile>

        <DescriptionPassword description={patientUser.email} />

        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"Data de nascimento:"}
          placeholder={"Ex. 04/05/1999"}
          keyboardType="numeric"
          editable={editable}
          fieldWidth={90}
          fieldValue={patientUser.dataNascimento && moment(patientUser.dataNascimento).format('DD-MM-YYYY')}
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
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"Endereço"}
          placeholder={"Endereço..."}
          editable={editable}
          fieldValue={logradouro}
          fieldWidth={90}
        />

        <ContainerCepCidade>
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"CEP"}
            placeholder={"CEP..."}
            maxLength={8}
            onChangeText={(text) => setCep(text)}
            keyboardType="numeric"
            editable={editable}
            fieldWidth={40}
            fieldValue={cep}
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

        <ButtonLarge text={"Salvar"} />

        <ButtonLarge text={"Editar"} onPress={() => {
          handleIsInputsEditable(editable, setEditable);
        }} />

        <BlockedSmallButton
          text={"Sair do app"}
          onPress={() => { userTokenLogout(); navigation.replace("Login"); }}
        />
      </Container>
    </ScrollContainer>
  );
};
