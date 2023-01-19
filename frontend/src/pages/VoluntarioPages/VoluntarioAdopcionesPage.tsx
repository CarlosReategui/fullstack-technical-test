import { Title } from "@mantine/core";
import React, { useCallback, useContext, useEffect } from "react";
import { AdopcionesReadTable } from "../../components/Tables";
import VoluntarioAppShell from "../../components/VoluntarioAppShell/VoluntarioAppShell";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { TAdopcion } from "../../types";

type Props = {};

export const VoluntarioAdopcionesPage = (props: Props) => {
  const { logout } = useContext(AuthContext);
  const [adopciones, setAdopciones] = React.useState<[TAdopcion] | null>(null);

  const getAdopciones = useCallback(async () => {
    try {
      const response = await api.adopciones.get();
      setAdopciones(response.data);
      console.log(response.data);
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const req = async () => {
      await getAdopciones();
    };
    req();
  }, [getAdopciones]);

  return (
    <VoluntarioAppShell>
      <Title order={3}>Adopciones</Title>
      <AdopcionesReadTable adopciones={adopciones} />
    </VoluntarioAppShell>
  );
};
