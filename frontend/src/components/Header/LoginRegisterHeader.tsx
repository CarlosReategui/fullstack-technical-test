import { HeaderResponsive } from "./HeaderResponsive";

const LoginRegisterHeader = () => {
  return (
    <HeaderResponsive
      links={[
        { link: "/login", label: "Login" },
        { link: "/register", label: "Registro" },
      ]}
    />
  );
};

export default LoginRegisterHeader;
