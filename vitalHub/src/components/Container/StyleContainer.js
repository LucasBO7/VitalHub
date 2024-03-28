import styled from "styled-components";

import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fafafa;
`;

export const ViewBoxMedium = styled.SafeAreaView`
  width: 80%;
  align-items: flex-start;
`;
export const BoxNumeric = styled.SafeAreaView`
  width: 90%;
  flex-direction: row;
  margin-top: 15px;
  justify-content: space-between;
`;

export const ScrollContainer = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: #fafafa;
`;

export const ContainerCepCidade = styled.SafeAreaView`
  margin-bottom: 3px;
  width: 100%;
  background-color: #fafafa;
  flex-direction: row;
  justify-content: space-around;
  /* gap: 50px; */
  margin-bottom: 35px;
`;

export const BoxAgeEmail = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 2px;
  margin-right: 35px;
  margin-left: 35px;
`;

export const BoxDescription = styled.SafeAreaView`
  flex-direction: row;
  margin-top: 2px;
  margin-right: 35px;
  margin-left: 35px;
  gap: 20px;
`;

export const BoxDataHome = styled.SafeAreaView`
  flex-direction: column;

  width: 120px;
  height: 55px;

  align-items: center;

  margin-left: 10px;

  margin-top: 26%;
`;

export const BoxHome = styled.TouchableOpacity`
  width: 200px;
  height: 100%;
  flex-direction: row;

  margin-bottom: 8%;
  margin-right: 36%;
`;

export const MoveIconBell = styled.SafeAreaView`
  width: 35px;
  height: 35px;
  margin-top: 8%;

  align-items: center;
`;

export const ButtonHomeContainer = styled.SafeAreaView`
  width: 100%;
  margin-left: 9%;
  flex-direction: row;
  gap: 15px;
`;

export const ButtonHomeContainerStet = styled.SafeAreaView`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const BoxCard = styled.SafeAreaView`
  flex-direction: row;
  width: 100%;

  /* border: 1px solid black; */
  align-items: flex-start;
`;

export const BoxCardDoctor = styled(BoxCard)`
  padding: 10px;
`;
export const BoxTextCard = styled.SafeAreaView`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const BoxTextDoctorCard = styled(BoxTextCard)`
  margin-left: 10px;
`;
export const BoxTextClinicCard = styled(BoxTextCard)`
  margin-left: 10px;
  gap: 8px;
  margin-top: -8px;
`;

export const BoxRateTime = styled.SafeAreaView`
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
  /* border: 1px solid black; */
  margin-left: -39%;
`;

export const BoxDateCancel = styled.SafeAreaView`
  width: 71%;
  height: 30px;
  justify-content: space-between;
  flex-direction: row;
`;
export const FlatContainer = styled.FlatList`
  width: 100%;
`;

export const FlatContainerSelect = styled(FlatContainer)`
  width: 100%;
  height: 550px;
`;

export const BoxInputSelectLabel = styled.SafeAreaView`
  margin-top: 30px;
  gap: 10px;
`;

export const ViewImageImport = styled.SafeAreaView`
  width: 100%;
  height: 111px;
  background-color: #f5f3f3;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const BoxViewImageImport = styled.SafeAreaView`
  margin-top: 18px;
  width: 90%;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const BoxBtn = styled.SafeAreaView`
  margin-top: 13px;
  flex-direction: row;
  /* gap: 60px; */
  width: 90%;
  /* justify-content: space-around; */
  gap: 80px;
`;

export const GradientScreen = styled(LinearGradient).attrs({
  colors: ["#49B3BA", "#496BBA"],
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContentBar = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 25px;
  /* align-items: center; */
  justify-content: center;
  gap: 5px;
  width: 100%;
  /* height: 60px; */
  /* margin-bottom: 50px; */
`;
