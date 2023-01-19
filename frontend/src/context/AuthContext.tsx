import { createContext, useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import api from "../services/api";
import { showNotification } from "@mantine/notifications";

interface IUser {
  email: string;
  exp: number;
  first_name: string;
  iat: number;
  jti: string;
  last_name: string;
  role: string;
  token_type: string;
  user_id: number;
}

interface AuthContextProps {
  loading: boolean;
  logout: () => void;
  login: (values: { email: string; password: string }) => void;
  authTokens: { access: string; refresh: string } | null;
  user: IUser | null;
  register: (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => void;
  updateTokenElseLogout: () => Promise<void>;
}

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>(null!);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const storageAuthTokens = localStorage.getItem("authTokens");
  const [authTokens, setAuthTokens] = useState(() =>
    storageAuthTokens ? JSON.parse(storageAuthTokens) : null
  );
  const [user, setUser] = useState<IUser | null>(() =>
    storageAuthTokens ? jwtDecode(storageAuthTokens) : null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenLoading, setTokenLoading] = useState<boolean>(false);

  const login = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await api.login(values.email, values.password);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data);
      const newUser: IUser = jwtDecode(response.data.access);
      setUser(newUser);
      switch (newUser.role) {
        case "ADMIN":
          navigate("/admin/animales");
          break;
        case "ADOPTANTE":
          navigate("/adoptante");
          break;
        case "VOLUNTARIO":
          navigate("/voluntario");
          break;
      }
      showNotification({
        title: "Éxito",
        message: "Usuario logueado con éxito.",
        color: "green",
      });
    } catch {
      showNotification({
        title: "Error",
        message: "Email o contraseña incorrectos.",
        color: "red",
      });
    }
    setLoading(false);
  };

  const register = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => {
    setLoading(true);
    console.log(values);
    const body = {
      email: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      role: values.role,
    };
    try {
      if (values.role === "ADOPTANTE") {
        const response = await api.registerAdoptante(body);
        console.log(response.data);
      } else if (values.role === "VOLUNTARIO") {
        const response = await api.registerVoluntario(body);
        console.log(response.data);
      }
      await login({ email: values.email, password: values.password });
    } catch (error: any) {
      const errors: string[] = [];
      Object.entries(error.response.data).forEach((entry) => {
        const [key, value] = entry;
        errors.push(`${key}: ${value}`);
      });
      showNotification({
        title: "Error",
        message: errors.join(". "),
        color: "red",
      });
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    setUser(null);
    navigate("/");
  };

  const logoutCallback = useCallback(logout, [navigate]);

  const updateTokenElseLogout = useCallback(async () => {
    console.log("Update token called");
    try {
      const response = await api.tokenRefresh(authTokens.refresh);
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } catch {
      logoutCallback();
    }

    if (tokenLoading) {
      setTokenLoading(false);
    }
  }, [authTokens?.refresh, tokenLoading, logoutCallback]);

  useEffect(() => {
    if (tokenLoading) {
      updateTokenElseLogout();
    }
    const minutes = 1 * 60 * 1000;
    const interval = setInterval(() => {
      if (authTokens) {
        updateTokenElseLogout();
      }
    }, minutes);
    return () => clearInterval(interval);
  }, [tokenLoading, authTokens, updateTokenElseLogout]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        logout,
        login,
        register,
        authTokens,
        user,
        updateTokenElseLogout,
      }}
    >
      {tokenLoading ? null : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextProps };
