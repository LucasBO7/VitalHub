import axios from "axios";

//declarar a porta da api

const externalApiUrl = '4466';

//declarar o ip da maquina 


const ip = ' 192.168.21.101';


//definir a url padrao
const apiUrlLocal = `http://192.168.21.101:4466/api`;

//trazer a configuracao do axios

const api = axios.create({
  baseURL: apiUrlLocal
});

export default api;


