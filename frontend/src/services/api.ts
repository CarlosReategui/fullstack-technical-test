import axios from "axios";
import { TAnimal, TUser } from "../types";

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
    getNoAdoptados: () => {
      return ApiWithToken.get(`${BASE_URL}api/animalesNAdoptados/`);
    },
  },
  adoptante: {
    post: (adoptante: TUser) => {
      return ApiWithToken.post(`${BASE_URL}api/adoptantes/`, adoptante);
    },
    get: () => {
      return ApiWithToken.get(`${BASE_URL}api/adoptantes/`);
    },
    put: (adoptante: TUser, id: number) => {
      return ApiWithToken.put(`${BASE_URL}api/adoptantes/${id}/`, adoptante);
    },
    delete: (id: number) => {
      return ApiWithToken.delete(`${BASE_URL}api/adoptantes/${id}/`);
    },
  },
  voluntarios: {
    post: (voluntario: TUser) => {
      return ApiWithToken.post(`${BASE_URL}api/voluntarios/`, voluntario);
    },
    get: () => {
      return ApiWithToken.get(`${BASE_URL}api/voluntarios/`);
    },
    put: (voluntario: TUser, id: number) => {
      return ApiWithToken.put(`${BASE_URL}api/voluntarios/${id}/`, voluntario);
    },
    delete: (id: number) => {
      return ApiWithToken.delete(`${BASE_URL}api/voluntarios/${id}/`);
    },
  },
  adopciones: {
    get: () => {
      return ApiWithToken.get(`${BASE_URL}api/adopciones/`);
    },
    misAdopciones: () => {
      return ApiWithToken.get(`${BASE_URL}api/misAdopciones/`);
    },
  },
};

export default api;
