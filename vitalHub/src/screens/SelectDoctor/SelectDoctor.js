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




    // Dentro do componente

    // Passar os dados do state(array) para o flatList

    const [doctorList, setDoctorList] = useState([]);

    async function getAllDoctors() {
        const doctors = await api.get('/Medico')
            .catch((error) => {
                console.log(error);
            });
        setDoctorList(doctors);
        console.log(doctors);
    }

    useEffect(() => {
        getAllDoctors();
    }, [])






    const image = require("../../assets/ImageCard.png");

    return (



        <Container>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <TitleSelect>Selecionar Médico</TitleSelect>

            <FlatContainerSelect
                data={doctorList}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <CardSelectDoctor doctor={item.item} />
                }

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