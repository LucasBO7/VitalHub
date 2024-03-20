
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { Text } from "react-native";
import { BarContent, TextBar } from "./StyleMain";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PatientProfile } from "../../screens/PatientProfile/PatientProfile";

import { PatientConsultation } from "../../screens/PatientConsultation/PatientConsultation";

import { DoctorConsultation } from "../../screens/DoctorConsultation/DoctorConsultation";

const bottomTab = createBottomTabNavigator();

export const Main = () => {

  return (

    <bottomTab.Navigator
      initialRouteName="DoctorConsultation"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 60, elevation: 10, paddingTop: 3 },
        // tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          if (route.name === "PatientConsultation") {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={18} color="#4E4B59" />
                {focused && <TextBar>Agenda</TextBar>}
              </BarContent>
            );
          } 

          {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome5 name="user-circle" size={22} color="#4E4B59" />
                {focused && <TextBar>Perfil</TextBar>}
              </BarContent>
            );
          }
        },
      })}
    >

    {/* Depois fazer ternário para levar para home doutor ou ImagemPerfilPaciente

    ? */}

      <bottomTab.Screen
        name="PatientConsultation"
        component={PatientConsultation}
      />

      {/* : */}

      <bottomTab.Screen 
      name="PatientProfile" 
      component={PatientProfile} 
      />

    </bottomTab.Navigator>
  );
};

export const DoctorMain = () => {

  return (

    <bottomTab.Navigator
      initialRouteName="DoctorConsultation"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 60, elevation: 10, paddingTop: 3 },
        // tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          if (route.name === "DoctorConsultation") {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={18} color="#4E4B59" />
                {focused && <TextBar>Agenda</TextBar>}
              </BarContent>
            );
          } 

          {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome5 name="user-circle" size={22} color="#4E4B59" />
                {focused && <TextBar>Perfil</TextBar>}
              </BarContent>
            );
          }
        },
      })}
    >

    {/* Depois fazer ternário para levar para home doutor ou ImagemPerfilPaciente

    ? */}

      <bottomTab.Screen
        name="DoctorConsultation"
        component={DoctorConsultation}
      />

      {/* : */}

      <bottomTab.Screen 
      name="PatientProfile" 
      component={PatientProfile} 
      />

    </bottomTab.Navigator>
  );
};

