import { InputLabel, InputLabel14, InputSelectLabel } from "./StyleLabel"

export const Label = ({ textLabel }) => {

    return (
        <InputLabel>
            {textLabel}
        </InputLabel>
    )
}

export const LabelSelect = ({ textLabel }) => {

    return (
        <InputSelectLabel>
            {textLabel}
        </InputSelectLabel>
    )
}