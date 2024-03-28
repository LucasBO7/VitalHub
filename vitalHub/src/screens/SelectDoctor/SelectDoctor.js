import { StatusBar } from "react-native"
import { Container, FlatContainerSelect, ScrollContainer } from "../../components/Container/StyleContainer"
import { TitleSelect } from "../../components/Title/StyleTitle"
import { CardSelectDoctor } from "../../components/Cards/Cards"
import { ButtonLarge, ButtonLargeSelect } from "../../components/Button/Button"
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions"
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions"
import { useEffect, useState } from "react"
import api from "../../services/Services"
// Fora do componente

// Criar o state para receber a lista de médicos (Array) === OK
// Criar a função para obter a lista de médicos da api e setar no state == OK
// Criar um effect para chamada da função == OK




export const SelectDoctor = ({ navigation }) => {
    const dataItens = [
        {
            id: 'fsdfsfsdf',
            area: 'Dermatóloga, Esteticista',
            url: 'aar',
            name: 'Dr Alessandra'
        },
        {
            id: 'fsdfsf',
            area: 'Cirurgião, Cardiologista',
            url: 'siu',
            name: 'Dr Kumushiro'
        },
        {
            id: 'fsdf',
            area: 'Clínico, Pediatra',
            url: 'aha',
            name: 'Dr Rodrigo Santos'
        },
    ]

    const [doctorList, setDoctorList] = useState([]); // Lista de medicos

    // Busca todos os médicos do banco
    async function getAllDoctors() {
        // Instanciação da nossa conexão da api
        await api.get("/Medicos")
            // Quando houver uma resposta...
            .then(response => {
                setDoctorList(response.data)
                console.log(doctorList)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        getAllDoctors();
    }, [])

    const [selectedCardId, setSelectedCardId] = useState();

    // Guarda o id da clínica selecionada no state
    const handleSelectedCard = (id) => {
        setSelectedCardId(id);
    };

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
                        selectedCardId={selectedCardId}
                        onCardPress={handleSelectedCard}
                    />
                )}

                showsVerticalScrollIndicator={false}
            />

            <ButtonLargeSelect onPress={() => { navigation.navigate("SelectDate") }} text={"Continuar"} />

            <CardCancelLessLocal
                onPressCancel={() => navigation.replace("Main")}
                text={"Cancelar"}
            />

        </Container>


    )

}