import React from "react";
import { Text } from "@mantine/core";
import VoluntarioAppShell from "../../components/VoluntarioAppShell/VoluntarioAppShell";

type Props = {};

export const VoluntarioPage = (props: Props) => {
  return (
    <VoluntarioAppShell>
      <Text size="xl" weight={500} align="center">
        ¡Bienvenido! Seleccione una opción del menú lateral.
      </Text>
    </VoluntarioAppShell>
  );
};
