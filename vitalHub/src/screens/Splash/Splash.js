
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { CommonActions } from '@react-navigation/native'
import { GradientScreen } from '../../components/Container/StyleContainer'
import { BrandLogoWhite } from '../../components/Images/StyleImages'
import { TextSplash } from '../../components/Descriptions/StyledDescriptions'
import { HeartAnimated } from '../../components/AnimatedHeart/AnimatedHeart'



export default function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      }))
    }, 5000);
  })

  return (
    <GradientScreen>
      <StatusBar style='light' />
      <BrandLogoWhite source={require('../../assets/VitalHub_LogoWhite.png')}/>
      <HeartAnimated/>
      <TextSplash>
        Ajudando você a cuidar da sua saúde!
      </TextSplash>
    </GradientScreen>
  )
}