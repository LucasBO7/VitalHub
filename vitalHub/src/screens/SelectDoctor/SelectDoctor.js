import { StatusBar } from "react-native"
import { Container, FlatContainerSelect, ScrollContainer } from "../../components/Container/StyleContainer"
import { TitleSelect } from "../../components/Title/StyleTitle"
import { CardSelectDoctor } from "../../components/Cards/Cards"
import { ButtonLarge, ButtonLargeSelect } from "../../components/Button/Button"
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions"
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions"
import { useEffect, useState } from "react"
import api from "../../services/Services"
import { text } from "@fortawesome/fontawesome-svg-core"
// Fora do componente

// Criar o state para receber a lista de médicos (Array) === OK
// Criar a função para obter a lista de médicos da api e setar no state == OK
// Criar um effect para chamada da função == OK




export const SelectDoctor = ({ navigation, route }) => {
    const [doctorList, setDoctorList] = useState([]); // Lista de medicos
    const [selectedDoctor, setSelectedDoctor] = useState({ // Medico selecionado
        medicoClinicaId: null,
        doctorLabel: null
    });

    // Busca todos os médicos do banco
    async function getAllDoctors() {
        // Instanciação da nossa conexão da api
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            // Quando houver uma resposta...
            .then(response => {
                setDoctorList(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        getAllDoctors();
        console.log();
        console.log('Selecionar Médico - OBJETO TRAZIDO:');
        console.log(route.params);
    }, [])

    // useEffect(() => {
    //     console.log();
    //     console.log('MÉDICO LISTA');
    //     console.log(doctorList);
    // }, [doctorList])

    useEffect(() => {
        console.log();
        console.log('MÉDICO SELECIONADO');
        console.log(selectedDoctor);
    }, [selectedDoctor])



    // Guarda o id da clínica selecionada no state
    // const handleSelectedCard = (id) => {
    //     setSelectedDoctor(id);
    // };

    async function handleContinue() {
        navigation.navigate("SelectDate", {
            agendamento: {
                ...route.params.agendamento,
                ...selectedDoctor
            }
        })
    }

    return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <TitleSelect>Selecionar Médico</TitleSelect>

            <FlatContainerSelect
                data={doctorList} // Lista de dados
                keyExtractor={(item) => item.id} // Ids de cada index
                renderItem={({ item }) => (
                    // Componente renderizado
                    <CardSelectDoctor
                        doctor={item}
                        selectedDoctor={selectedDoctor.medicoClinicaId}
                        setSelectedDoctor={setSelectedDoctor}
                    />
                )}

                showsVerticalScrollIndicator={false}
            />

            <ButtonLargeSelect onPress={() => { handleContinue() }} text={"Continuar"} />

            <CardCancelLessLocal
                onPressCancel={() => navigation.replace("Main")}
                text={"Cancelar"}
            />

        </Container>


    )

}
