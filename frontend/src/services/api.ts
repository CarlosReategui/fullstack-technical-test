import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const api = {
  login: (email: string, password: string) => {
    return axios.post(`${BASE_URL}api/token/`, { email, password });
  },
};

export default api;
