import styled, { css } from "styled-components";

export const CardContainer = styled.TouchableOpacity`
  /* box-shadow: 0px 0px 1px black; */
  elevation: 4px;
  margin-top: 12px;
  margin-bottom: 5px;
  align-self: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  height: 105px;
  flex-direction: row;
`;

export const SelectionCardContainer = styled.TouchableHighlight`
  elevation: 4px;
  margin-top: 12px;
  margin-bottom: 5px;
  align-self: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  height: 105px;
  flex-direction: row;
`;
export const CardContainerClinic = styled(SelectionCardContainer).attrs({
  underlayColor: "#EBEBEB"
})`
  ${(props) => (props.isSelected ? `border: 2px solid #496BBA` : ``)};
  height: 90px;
`;

export const CardContentDoctor = styled`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const AgeCard = styled.SafeAreaView`
  margin-left: 9%;
  margin-bottom: 0px;
  flex-direction: row;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
export const BoxRate = styled.SafeAreaView`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-left: 65px;
  height: 22px;
  width: 45px;
`;

// export const CardSelectDoctorContainer = styled(CardContainer)`

// `
