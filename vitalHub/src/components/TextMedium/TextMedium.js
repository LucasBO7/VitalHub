import { Linking } from "react-native"
import { TextMedium } from "./StyleTextMedium"
import { ViewBoxMedium } from "../Container/StyleContainer"


export const LinkMedium = ({ textLink, onPress }) => {

    return (
        <ViewBoxMedium>
            <TextMedium onPress={onPress}>
                {textLink}
            </TextMedium>
        </ViewBoxMedium>
    )
}