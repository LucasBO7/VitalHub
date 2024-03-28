import { StyleSheet, View } from "react-native";
import { InputHigh, InputHighGrey, InputNumeric, InputProfile, InputText, InputTextLarge } from "./StyleInput";
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export function Input({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false,
    // Input inválido
    isInsertedInputValid = true
}) {
    return (
        <InputText
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            isInsertedInputValid={isInsertedInputValid}
        />
    )
}



export const InputSelect = () => {
    const pickerStyles = {
        inputIOS: style.pickerInput,
        inputAndroid: style.pickerInput,
        placeholder: { color: '#34898F', },
    };
    const placeholder = {
        label: 'Selecionar horário',
        value: null,
        color: '#34898F',
    };

    return (
        <View style={{ width: 356 }}>
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={style}
                Icon={() => {
                    return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22} />
                }}
                placeholder={{
                    label: 'Selecione um valor',
                    value: null,
                    color: '#34898F'
                }}
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "TypeScript", value: "TypeScript" },
                    { label: "Python", value: "Python" },
                    { label: "Java", value: "Java" },
                    { label: "C++", value: "C++" },
                    { label: "C", value: "C" },
                ]}
            />
        </View>
    )
}

const style = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    inputAndroid: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    iconContainer: {
        top: '31%',
        marginRight: 10
    },
    placeholder: {
        color: '#34898F',
    }
})


export function NumericInput({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType = 'numeric',
    maxLength,
    placeholderTextColor,
    editable = true
}) {
    return (
        <InputNumeric
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
        />
    )
}

export function ProfileInput({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true
}) {
    return (
        <InputProfile
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
        />
    )
}

export function HighInput({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputHigh
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

export function HighInputGrey({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputHighGrey
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

export function LargeInput({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false,
    isInsertedInputValid = true
}) {
    return (
        <InputTextLarge
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            isInsertedInputValid={isInsertedInputValid}
        />
    )
}