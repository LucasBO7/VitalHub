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
    token: token
  };
};
export const userTokenLogout = async () => {
  const token = await AsyncStorage.removeItem("token");
  console.log(token);
};

const [savedItems, setSavedItems] = useState([]);

const handleSaveItem = async (newItem) => {
  const updatedItems = [...savedItems];
  updatedItems.push(newItem);
  setSavedItems(updatedItems);

  // Optionally, handle the API call here if needed
};




export const consultStatus = async ({}) => {
  const prioridade = await AsyncStorage.getItem("status");
  console.log(prioridade);
};
