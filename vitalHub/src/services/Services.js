import axios from "axios";

//declarar a porta da api

const externalApiUrl = '4466';

//declarar o ip da maquina 

const ip = '192.168.125.118';

//definir a url padrao
const apiUrlLocal = `http://${ip}/api`;

//trazer a configuracao do axios

const api = axios.create({
  baseURL: apiUrlLocal
});

export default api;