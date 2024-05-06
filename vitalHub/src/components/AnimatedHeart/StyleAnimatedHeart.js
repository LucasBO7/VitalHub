import LottieView from "lottie-react-native";
import styled from "styled-components";
import heartBeat from "../../assets/heartBeat.json";
import heartRed from "../../assets/heartRed.json";
import AnimationHeart from "../../assets/AnimationHeart.json";

export const HeartAnimatedStyle = styled(LottieView).attrs({
  source: AnimationHeart,
  autoPlay: true,
  loop: true,
})`
  width: 400px;
  height: 300px;
`;

export const ContainerLottieStyle = styled.View`
  width: 400px;
  height: 300px;
`;
