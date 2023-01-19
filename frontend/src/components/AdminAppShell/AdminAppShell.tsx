import React from "react";
import { MainLinks } from "./_mainLinks";
import { User } from "./_user";
import GeneralAppShell from "../GeneralAppShell/GeneralAppShell";

type Props = {
  children: React.ReactNode;
};

const AdminAppShell: React.FC<Props> = ({ children }) => {
  return (
    <GeneralAppShell mainLinks={<MainLinks />} user={<User />}>
      {children}
    </GeneralAppShell>
  );
};

export default AdminAppShell;
