import { CancelButton } from "../Descriptions/StyledDescriptions"
import { TextLink, TextLinkAccount } from "./StyleLink"

export const LinkAccount = ({
    onPress
}) => {
    return(
        <TextLink>Não tem uma conta? <TextLinkAccount onPress={onPress}>Crie uma conta agora!</TextLinkAccount></TextLink>
    )
}

export const Cancel = ({
    onPress
}) => {
    return(
        <CancelButton onPress={onPress}>Cancelar</CancelButton>
    )
}

