import { StatusBar } from "react-native"
import { Container, FlatContainerSelect, ScrollContainer } from "../../components/Container/StyleContainer"
import { TitleSelect } from "../../components/Title/StyleTitle"
import { CardSelectDoctor } from "../../components/Cards/Cards"
import { ButtonLarge, ButtonLargeSelect } from "../../components/Button/Button"
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions"
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions"


export const SelectDoctor = ({ navigation }) => {

    const image = require("../../assets/ImageCard.png");
    const dataItens = [
        {
            id: 'fsdfsfsdf',
            doctorArea: 'Dermatóloga, Esteticista',
            image: image,
            name: 'Dr Alessandra'
        },
        {
            id: 'fsdfsf',
            doctorArea: 'Cirurgião, Cardiologista',
            image: image,
            name: 'Dr Kumushiro'
        },
        {
            id: 'fsdf',
            doctorArea: 'Clínico, Pediatra',
            image: image,
            name: 'Dr Rodrigo Santos'
        },
    ]

    return (



        <Container>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <TitleSelect>Selecionar Médico</TitleSelect>

            <FlatContainerSelect
                data={dataItens}
                renderItem={({ item }) =>
                    <CardSelectDoctor doctorArea={item.doctorArea} name={item.name} url={image} />}
                keyExtractor={item => item.id}

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