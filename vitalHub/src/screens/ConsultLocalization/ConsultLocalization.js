import { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
} from "../../components/Container/StyleContainer";
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions";
import { AgeTextCard } from "../../components/Descriptions/StyledDescriptions";
import { MapImage } from "../../components/Images/StyleImages";
import { InputBox } from "../../components/InputBox/InputBox";
import Maps from "../../components/Maps/Maps";
import { Title, TitleLocalization } from "../../components/Title/StyleTitle";
import api from "../../services/Services";
import { ActivityIndicator } from "react-native";

export const ConsultLocalization = ({ navigation, route }) => {
  const [clinica, setClinica] = useState(null);

  useEffect(() => {
    console.log();
    console.log('Consult');
    console.log(route);
  }, [route])

  useEffect(() => {
    if (clinica == null) {
      BuscarClinica();
    }
  }, [clinica])

  async function BuscarClinica() {
    console.log(`/Clinica/BuscarPorId?id=${route.params.agendamento.clinicaId}`);
    await api.get(`/Clinica/BuscarPorId?id=${route.params.agendamento.clinicaId}`)
      .then(response => {
        setClinica(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <Container>
      {
        clinica != null ? (
          <>
            <Maps finalLatitude={clinica.endereco.latitude} finalLongitude={clinica.endereco.longitude} />

            <TitleLocalization>{clinica.nomeFantasia}</TitleLocalization>

            <AgeTextCard>{clinica.cidade}</AgeTextCard>

            <InputBox
              placeholderTextColor={"#33303E"}
              textLabel={"Endereço"}
              placeholder={"Ex. Rua Vicenso Silva, 58"}
              // keyboardType="numeric"
              editable={true}
              fieldWidth={90}
              fieldValue={clinica.endereco.logradouro}
            />

            <ContainerCepCidade>
              <InputBox
                placeholderTextColor={"#33303E"}
                textLabel={"Número"}
                placeholder={"Ex. 570"}
                keyboardType="numeric"
                editable={true}
                fieldWidth={40}
                fieldValue={`${clinica.endereco.numero}`}
              />
              <InputBox
                placeholderTextColor={"#33303E"}
                textLabel={"Bairro"}
                placeholder={"Ex. Vila Ema"}
                editable={true}
                fieldWidth={40}
                fieldValue={clinica.endereco.cidade}
              />
            </ContainerCepCidade>

            <CardCancelLessLocal
              onPressCancel={() => {
                navigation.replace("Main");
              }}
              text={"Voltar"}
            />
          </>
        ) : (
          <ActivityIndicator />
        )
      }



    </Container>
  );
};
