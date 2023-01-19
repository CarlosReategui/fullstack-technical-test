import axios from "axios";
import { TAnimal } from "../types";

const BASE_URL = "http://localhost:8000/";

const ApiWithToken = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

ApiWithToken.interceptors.request.use(
  (config) => {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
      config.headers.Authorization = `Bearer ${JSON.parse(authTokens).access}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

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
  animal: {
    post: (animal: TAnimal) => {
      return ApiWithToken.post(`${BASE_URL}api/animales/`, animal);
    },
    get: () => {
      return ApiWithToken.get(`${BASE_URL}api/animales/`);
    },
    put: (animal: TAnimal, id: number) => {
      return ApiWithToken.put(`${BASE_URL}api/animales/${id}/`, animal);
    },
    delete: (id: number) => {
      return ApiWithToken.delete(`${BASE_URL}api/animales/${id}/`);
    },
  },
};

export default api;
