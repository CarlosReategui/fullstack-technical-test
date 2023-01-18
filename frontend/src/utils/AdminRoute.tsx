import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextProps, AuthContext } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

const AdminRoute: React.FC<Props> = ({ children }) => {
  const { user } = useContext<AuthContextProps>(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role === "VOLUNTARIO") {
      navigate("/voluntario");
    } else if (user.role === "ADOPTANTE") {
      navigate("/adoptante");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default AdminRoute;
