import { Title } from "@mantine/core";
import React, { useCallback, useContext, useEffect } from "react";
import AdoptanteAppShell from "../../components/AdoptanteAppShell/AdoptanteAppShell";
import { AdopcionesReadTable } from "../../components/Tables";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { TAdopcion } from "../../types";

type Props = {};

export const AdoptanteMisAdopcionesPage = (props: Props) => {
  const { logout } = useContext(AuthContext);
  const [adopciones, setAdopciones] = React.useState<[TAdopcion] | null>(null);

  const getAdopciones = useCallback(async () => {
    try {
      const response = await api.adopciones.misAdopciones();
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
    <AdoptanteAppShell>
      <Title order={3}>Mis adopciones</Title>
      <AdopcionesReadTable adopciones={adopciones} />
    </AdoptanteAppShell>
  );
};
