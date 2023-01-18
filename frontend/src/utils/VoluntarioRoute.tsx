import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextProps, AuthContext } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

export const VoluntarioRoute: React.FC<Props> = ({ children }) => {
  const { user } = useContext<AuthContextProps>(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role === "ADMIN") {
      navigate("/admin");
    } else if (user.role === "ADOPTANTE") {
      navigate("/adoptante");
    }
  }, [user, navigate]);

  return <>{children}</>;
};
