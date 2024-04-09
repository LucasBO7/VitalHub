import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";

import moment from "moment";

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}

export const userDecodeToken = async () => {
  const token = await AsyncStorage.getItem("token");
  // const token = await JSON.parse(AsyncStorage.getItem("token")).token;

  if (token === null) {
    return null;
  }

  //decodifica o token recebido
  const decode = jwtDecode(token);

  return {
    name: decode.name,
    email: decode.email,
    role: decode.role,
    id: decode.jti,
    token: token
  };
};
export const userTokenLogout = async () => {
  const token = await AsyncStorage.removeItem("token");
};
// export const registerConsult = async ({ idConsultInserted, bananaInserted }) => {
//   await AsyncStorage.setItem("consult", {
//     idConsult: idConsultInserted != null ? idConsultInserted,
//     banana: bananaInserted != null ? bananaInserted :
//   });
// };

export const getAge = (birthdateText) => {
  // Converte  a data string para Date
  const birthdate = new Date(birthdateText);

  // birthdate.setMonth('02');

  // Pega a data atual
  const actualDate = new Date();

  // 
  function hasDoneBirthdate() {
    // 04 < 09 == true && 05 < 29 == true
    // 09 < 09 == false && 05 < 29 == true
    // 10 < 09 == false && 29 < 29 == 
    // actualDate.getMonth() < birthdate.getMonth() && actualDate.getDay() < birthdate.getDay() ? false : true;
    actualDate.getMonth() < birthdate.getMonth() ? false : true;
  }

  // actualDate.getFullYear() - birthdate.getFullYear();F
  const age = hasDoneBirthdate() === false
    // Se não fez aniversário ainda
    ? actualDate.getFullYear() - birthdate.getFullYear() + 1
    // se fez aniversário
    : actualDate.getFullYear() - birthdate.getFullYear();

  console.log(`Data de nascimento: $${birthdate} e data atual ${actualDate}, Idade = ${age}`);
  return age;
}