import { Text } from "@mantine/core";
import React from "react";
import AdminAppShell from "../../components/AdminAppShell/AdminAppShell";

type Props = {};

export const AdminPage = (props: Props) => {
  return (
    <div>
      <AdminAppShell>
        <Text size="xl" weight={500} align="center">
          ¡Bienvenido! Seleccione una opción del menú lateral.
        </Text>
      </AdminAppShell>
    </div>
  );
};
