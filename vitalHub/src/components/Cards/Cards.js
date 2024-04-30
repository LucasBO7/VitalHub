
import { View } from "react-native"
import { BoxCard, BoxCardDoctor, BoxDateCancel, BoxRateTime, BoxTextCard, BoxTextClinicCard, BoxTextDoctorCard } from "../Container/StyleContainer"
import { ConsultDate, ConsultDateGray } from "../DateConsult/StyleDateConsult"
import { CardCancel, SeeRecord } from "../Descriptions/Descriptions"
import { AgeTextCard, DoctorArea, HourText, HourTextGray, HourTextGrey, LocalizationText, RateText, RoutineTextCard, SeeMedicalRecord } from "../Descriptions/StyledDescriptions"
import { ImageCard, PointCard } from "../Images/StyleImages"
import { NameCard, NameCardClinic, NameCardSelect } from "../Title/StyleTitle"
import { AgeCard, BoxRate, CardContainer, CardContainerClinic, CardContentDoctor } from "./StyleCards"

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export const Card = ({ url, name, age, routine, hour, status, onPressCancel, onPressAppointment, onPressAppointmentCard, navigation }) => {

    const Check = () => {
        if (status === "agendada") {
            return (
                <BoxDateCancel>

                    <ConsultDate>

                        <FontAwesome6 name="clock" size={15} color="#49B3BA" />

                        <HourText>{hour}</HourText>

                    </ConsultDate>

                    <CardCancel onPressCancel={onPressCancel} text={"Cancelar"} />

                </BoxDateCancel>
            )


        } else if (status === "realizada") {
            return (
                <BoxDateCancel>

                    <ConsultDateGray>

                        <FontAwesome6 name="clock" size={15} color="#4E4B59" />

                        <HourTextGray>{hour}</HourTextGray>

                    </ConsultDateGray>

                    <SeeRecord onPressAppointment={onPressAppointment} text={"Ver Prontuário"} />

                </BoxDateCancel>
            )
        }
        else if (status === "cancelada") {
            return (
                <BoxDateCancel>

                    <ConsultDateGray>

                        <FontAwesome6 name="clock" size={15} color="#4E4B59" />

                        <HourTextGray>{hour}</HourTextGray>

                    </ConsultDateGray>

                </BoxDateCancel>
            )

        }
    }

    return (

        <CardContainer onPress={onPressAppointmentCard}>

            <BoxCard>

                <ImageCard source={url} />

                <BoxTextCard>

                    <NameCard>{name}</NameCard>

                    <AgeCard>

                        <AgeTextCard>{age}</AgeTextCard>

                        <PointCard source={require('../../assets/PointCard.png')} />

                        <RoutineTextCard>{routine}</RoutineTextCard>

                    </AgeCard>

                    {Check()}

                </BoxTextCard>

            </BoxCard>

        </CardContainer>

    )
}

export const CardSelectDoctor = ({ doctor, selectedDoctor, setSelectedDoctor }) => {

    return (

        <CardContainerClinic
            isSelected={selectedDoctor == doctor.id ? true : false}
            onPress={() => {
                setSelectedDoctor({
                    doctorClinicaId: doctor.id,
                    doctorLabel: doctor.idNavigation.nome,
                    doctorEspecialidade: doctor.especialidade.especialidade1
                })
            }}
        >
            <BoxCardDoctor>

                <ImageCard source={require("../../assets/ImageCard.png")} />

                <BoxCard>

                    <BoxTextDoctorCard>
                        <NameCardSelect>{doctor.idNavigation.nome}</NameCardSelect>

                        <DoctorArea>{doctor.especialidade.especialidade1}</DoctorArea>
                    </BoxTextDoctorCard>

                </BoxCard>
            </BoxCardDoctor>

        </CardContainerClinic>

    )

}

export const CardSelectClinic = ({ clinic, selectedCardId, setSelectedCardId }) => {

    return (

        <CardContainerClinic
            isSelected={selectedCardId == clinic.id ? true : false}
            onPress={() => {
                setSelectedCardId({
                    clinicaId: clinic.id,
                    clinicaLabel: clinic.nomeFantasia
                })
            }}
        >
            <BoxCard>

                <BoxTextClinicCard>
                    <NameCardClinic>{clinic.nomeFantasia}</NameCardClinic>

                    <LocalizationText>{clinic.endereco.logradouro}</LocalizationText>
                </BoxTextClinicCard>

                <BoxRateTime>

                    {/* <BoxRate>
                        <AntDesign name="star" size={18} color="#F9A620" />

                        <RateText>{rate}</RateText> 
                    </BoxRate> */}

                    <ConsultDate>

                        <MaterialCommunityIcons name="calendar-outline" size={15} color="#49B3BA" />

                        <HourText>{'Seg-Sex'}</HourText>

                    </ConsultDate>

                </BoxRateTime>

            </BoxCard>

        </CardContainerClinic>

    )

}