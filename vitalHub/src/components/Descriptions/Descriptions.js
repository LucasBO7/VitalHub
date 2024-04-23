import { ViewBoxCode } from "../Container/StyleContainer";
import { CancelBackMargin, CancelButtonRecords, CancelCard, CancelLessMargin, CancelLocal, DescripritionDoctor, DescripritionEmail, DescripritionForgot, EmailText, ResendCode, SeeMedicalRecord, SmallDescriptionModal, SmallDescriptionModal2 } from "./StyledDescriptions";

export const DescriptionPassword = ({ description }) => {

    return (
        <DescripritionForgot>
            {description}
        </DescripritionForgot>
    )
}

export const DescriptionDoc = ({ description }) => {

    return (
        <DescripritionDoctor>
            {description}
        </DescripritionDoctor>
    )
}

<<<<<<< HEAD
export const EmailDescription = ({route}) => {
=======
export const EmailDescription = ({ route }) => {
>>>>>>> develop

    return (

<<<<<<< HEAD
        <DescripritionEmail>Digite o código de 4 dígitos enviado para <EmailText>username@email.com</EmailText>{route.params.emailRecuperacao}</DescripritionEmail>
=======
        <DescripritionEmail>Digite o código de 4 dígitos enviado para <EmailText>{route.params.emailRecuperacao}</EmailText></DescripritionEmail>
>>>>>>> develop

    )

}


export const CodeResend = ({
    text,
    onPress
}) => {

    return (

        <ResendCode onPress={onPress}>{text}</ResendCode>

    )

}

export const SeeRecord = ({ onPressAppointment, text }) => {

    return (

        <SeeMedicalRecord onPress={onPressAppointment}>{text}</SeeMedicalRecord>

    )

}

export const CardCancel = ({ onPressCancel, text }) => {

    return (

        <CancelCard onPress={onPressCancel}>{text}</CancelCard>

    )

}

export const CardCancelLess = ({ onPressCancel, text }) => {

    return (

        <CancelLessMargin onPress={onPressCancel}>{text}</CancelLessMargin>

    )

}

export const CardCancelLessLocal = ({ onPressCancel, text }) => {

    return (

        <CancelLocal onPress={onPressCancel}>{text}</CancelLocal>

    )

}

export const CardBackLess = ({ onPressCancel, text }) => {

    return (
        <CancelBackMargin onPress={onPressCancel}>{text} </CancelBackMargin>

    )

}

export const DescripritionModalSmall2 = ({ text }) => {

    return (

        <SmallDescriptionModal2>{text}</SmallDescriptionModal2>

    )

}

export const DescripritionModalSmall = ({ text }) => {

    return (

        <SmallDescriptionModal>{text}</SmallDescriptionModal>

    )

}

export const TextBarNormal = ({ onPress, text }) => {

    return (

        <SmallDescriptionModal onPress={onPress}>{text}</SmallDescriptionModal>

    )

}

export const RecordsCancelButton = ({ onPress, text }) => {

    return (

        <CancelButtonRecords onPress={onPress}>{text}</CancelButtonRecords>

    )

}