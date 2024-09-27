import styled from "styled-components";

export const DescripritionForgot = styled.Text`
  width: 80%;
  font-family: Quicksand_500Medium;
  font-size: 16px;
  color: #5f5c6b;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 15px;
  align-self: center;
`;

export const DescriptionConfirmModal = styled(DescripritionForgot)`
  width: 90%;
  margin-top: 0px;
  font-size: 17px;
  margin-bottom: 0px;
  color: #000000;
`;

export const DescripritionDoctor = styled.Text`
  /* width: 80%; */
  font-family: Quicksand_500Medium;
  font-size: 16px;
  color: #5f5c6b;
  text-align: center;
  /* margin-top: 2px; */
  /* margin-bottom: 15px; */
  align-self: center;
`;

export const DescriptionModalRecord = styled(DescripritionForgot)`
  font-size: 14px;
`;

export const DescripritionEmail = styled.Text`
  width: 80%;
  font-family: Quicksand_500Medium;
  font-size: 16px;
  color: #4e4b59;
  text-align: center;
`;

export const EmailText = styled.Text`
  width: 80%;
  font-family: Quicksand_500Medium;
  font-size: 16px;
  color: #496bba;
  margin-right: auto;
`;

export const ResendCode = styled(EmailText)`
  text-decoration: underline;
  color: #344f8f;
  font-family: MontserratAlternates_600SemiBold;
  margin-top: 33px;
  margin-left: 33%;
`;

export const CancelButton = styled(ResendCode)`
  text-decoration: underline;
  color: #344f8f;
  font-family: MontserratAlternates_600SemiBold;
  margin-top: 40px;
  margin-left: 40%;
`;

export const CancelLessMargin = styled(CancelButton)`
  margin-top: 2px;
  margin-bottom: 30px;
  align-self: center;
  justify-self: center;
`;

export const CancelLocal = styled(CancelButton)`
  margin-top: 5px;
  margin-bottom: 30px;
  text-align: center;
  margin-left: 0px;
  margin-right: 0px;
`;

export const CancelBackMargin = styled(CancelButton)`
  margin-top: 30px;
  margin-bottom: 42px;
  margin-left: 0;
  margin-right: 0;
  text-align: center;
`;
export const TextNormalBar = styled.Text`
  color: #595663;
  font-family: Quicksand_500Medium;
  margin-bottom: 2px;
`;

export const CancelButtonRecords = styled(CancelButton)`
  margin-top: 25px;
  margin-bottom: 40px;
`;

export const AgeTextCard = styled(DescripritionForgot)`
  color: #8c8a97;
  font-size: 14px;
  height: 18px;
`;

export const DoctorArea = styled(DescripritionForgot)`
  color: #8c8a97;
  font-size: 14px;
  height: 20px;
  width: 49%;
  align-self: flex-start;
  text-align: flex-start;
  /* border: 1px solid black; */
`;

export const LocalizationText = styled(DoctorArea)`
  font-family: Quicksand_600SemiBold;
`;

export const RoutineTextCard = styled(AgeTextCard)`
  margin-top: 6px;
  height: 20px;
  color: #8c8a97;
`;

export const HourText = styled.Text`
  margin-top: 8px;
  height: 30px;
  color: #49b3ba;
  font-size: 14px;
  font-family: Quicksand_600SemiBold;
`;
export const HourTextGray = styled(HourText)`
  color: #4e4b59;
`;

export const CancelCard = styled.Text`
  margin-top: 4%;
  /* margin-left: 32%; */
  font-family: MontserratAlternates_500Medium;
  color: #c81d25;
  font-size: 14px;
`;

export const SeeMedicalRecord = styled(CancelCard)`
  color: #344f8f;
`;
export const DescriptionCancel = styled.Text`
  margin-top: 15px;
  width: 90%;
  font-size: 16px;
  font-family: Quicksand_500Medium;
  color: #4e4b59;
  text-align: center;
`;

export const RateText = styled.Text`
  font-size: 14px;
  font-family: Quicksand_600SemiBold;
  color: #f9a620;
`;

export const SmallDescriptionModal2 = styled(DescripritionForgot)`
  font-size: 13px;
  align-self: flex-start;
  color: #5f5c6b;
  width: 100%;
  text-align: none;
  margin-bottom: 0px;
`;

export const SmallDescriptionModal = styled(DescripritionForgot)`
  font-size: 13px;
  align-self: flex-start;
  color: #5f5c6b;
  width: 100%;
  text-align: none;
  margin-bottom: 20px;
`;

export const TextSplash = styled.Text`
  color: #fff;
  font-family: Quicksand_600SemiBold;
  font-size: 18px;
  text-align: center;
  width: 203px;
`;
