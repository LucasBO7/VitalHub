import { Button, View } from "react-native"

export const Navegacao = ({ navigation }) => {
    return (

        <View style={{ marginTop: 40 }}>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="ForgotPassword"
                onPress={() => navigation.navigate("ForgotPassword")}
            />
            <Button
                title="CheckEmail"
                onPress={() => navigation.navigate("CheckEmail")}
            />
            <Button
                title="RedefinePassword"
                onPress={() => navigation.navigate("RedefinePassword")}
            />
            <Button
                title="CreateAccount"
                onPress={() => navigation.navigate("CreateAccount")}
            />
            <Button
                title="PatientProfile"
                onPress={() => navigation.navigate("PatientProfile")}
            />
            <Button
                title="MedicalRecords"
                onPress={() => navigation.navigate("MedicalRecords")}
            />
            <Button
                title="DoctorConsultation"
                onPress={() => navigation.navigate("DoctorConsultation")}
            />

            <Button
                title="SelectDoctor"
                onPress={() => navigation.navigate("SelectDoctor")}
            />

            <Button
                title="SelectClinic"
                onPress={() => navigation.navigate("SelectClinic")}
            />

            <Button
                title="PatientConsultation"
                onPress={() => navigation.navigate("PatientConsultation")}
            />

            <Button
                title="SelectDate"
                onPress={() => navigation.navigate("SelectDate")}
            />
            <Button
                title="ConsultLocalization"
                onPress={() => navigation.navigate("ConsultLocalization")}
            />
            <Button
                title="ViewPrescription"
                onPress={() => navigation.navigate("ViewPrescription")}
            />
        </View>


    )
}