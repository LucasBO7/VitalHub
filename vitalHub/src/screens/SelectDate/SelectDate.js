import { StatusBar } from "react-native"
import { BoxInputSelectLabel, Container } from "../../components/Container/StyleContainer"
import { TitleSelect } from "../../components/Title/StyleTitle"
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent"
import { InputSelect } from "../../components/Input/Input"
import { Label, LabelSelect } from "../../components/Label/Label"
import { ButtonLarge, ButtonNormal } from "../../components/Button/Button"
import { CardCancelLess } from "../../components/Descriptions/Descriptions"
import { BoxButtons } from "../../components/Button/StyleButton"
import { useState } from "react"
import { ConfirmAppointmentModal } from "../../components/ConfirmAppointmentModal/ConfirmAppointmentModal"


export const SelectDate = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [dataSelecionada, setDataSelecionada] = useState('')
    const [horaSelecionada, setHoraSelecionada] = useState('')
    const [agendamento, setAgendamento] = useState(null)

    useEffect(() => {
        console.log(dataSelecionada);
    }, [dataSelecionada])

    return (

        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <TitleSelect>Selecionar Data</TitleSelect>

            <CalendarComponent 
            setDataSelecionada={setDataSelecionada}
            dataSelecionada={dataSelecionada}
            />

            <BoxInputSelectLabel>
                <LabelSelect textLabel={'Selecione um horário disponível'} />
                <InputSelect />
            </BoxInputSelectLabel>

            <InputSelect
                setHoraSelecionada={setHoraSelecionada}
            />


            <BoxButtons>
                <ButtonLarge onPress={() => setShowModal(true)} text={'Confirmar'} />

                <CardCancelLess onPressCancel={() => {
                    navigation.navigate("SelectDoctor");
                }} text={"Cancelar"} />
            </BoxButtons>

            <ConfirmAppointmentModal
                navigation={navigation}
                visible={showModal}
                setShowModal={setShowModal}
            />

        </Container>

    )

}