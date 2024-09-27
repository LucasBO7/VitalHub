import styled from "styled-components";

export const TextBar = styled.Text`
  /* color: #607ec5;
  font-size: 12px; */
  font-family: Quicksand_500Medium;
`;

// export const TextBarNormal = styled.Text`
//     color: #595663;
//     font-family: Quicksand_500Medium;
//     margin-bottom: 2px;
// `

export const BarContent = styled.View.attrs({
  focus: true
})`
  flex-direction: row;

  align-items: center;
  justify-content: center;
  gap: 5px;


  border-radius: 18px;
  padding: 9px 12px;

  background-color: ${props => `${props.tabBarActiveBackgroundColor}`}

`;
