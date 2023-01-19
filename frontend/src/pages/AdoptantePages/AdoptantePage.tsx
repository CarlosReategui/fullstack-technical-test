import React from "react";
import AdoptanteAppShell from "../../components/AdoptanteAppShell/AdoptanteAppShell";
import { Text } from "@mantine/core";

type Props = {};

export const AdoptantePage = (props: Props) => {
  return (
    <AdoptanteAppShell>
      <Text size="xl" weight={500} align="center">
        ¡Bienvenido! Seleccione una opción del menú lateral.
      </Text>
    </AdoptanteAppShell>
  );
};
