import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const api = {
  login: (email: string, password: string) => {
    return axios.post(`${BASE_URL}api/token/`, { email, password });
  },
  tokenRefresh: (refresh: string) => {
    return axios.post(`${BASE_URL}api/token/refresh/`, { refresh });
  },
  registerVoluntario: (body: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => {
    return axios.post(`${BASE_URL}api/voluntarios/`, body);
  },
  registerAdoptante: (body: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => {
    return axios.post(`${BASE_URL}api/adoptantes/`, body);
  },
};

export default api;
