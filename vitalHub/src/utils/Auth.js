import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}

export const userDecodeToken = async () => {
  const token = await AsyncStorage.getItem("token");

  if (token === null) {
    return null;
  }

  //decodifica o token recebido
  const decode = jwtDecode(token);

  return {
    name: decode.name,
    email: decode.email,
    role: decode.role,
  };
};
export const userTokenLogout = async () => {
  const token = await AsyncStorage.removeItem("token");
  console.log(token);
};
