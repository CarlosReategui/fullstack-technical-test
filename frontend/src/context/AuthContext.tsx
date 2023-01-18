import { createContext, useState, useEffect } from "react";
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
}

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const storageAuthTokens = localStorage.getItem("authTokens");
  const [authTokens, setAuthTokens] = useState(() =>
    storageAuthTokens ? JSON.parse(storageAuthTokens) : null
  );
  const [user, setUser] = useState<IUser | null>(() =>
    storageAuthTokens ? jwtDecode(storageAuthTokens) : null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await api.login(values.email, values.password);
      console.log(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      if (user) {
        switch (user.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "ADOPTANTE":
            navigate("/adoptante");
            break;
          case "VOLUNTARIO":
            navigate("/voluntario");
            break;
        }
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

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const decodedToken: any = jwtDecode(token);
  //       if (decodedToken.exp * 1000 < Date.now()) {
  //         localStorage.removeItem("token");
  //       } else {
  //         setUser(decodedToken);
  //       }
  //     }
  //   }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ loading, logout, login, authTokens, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
