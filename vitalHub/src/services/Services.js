import axios from "axios";

export const externalApiUrl = `https://viacep.com.br/ws/`;


const api = axios.create({
  baseURL: externalApiUrl,
});

export default api;