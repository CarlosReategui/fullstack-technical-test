import { Grid, Title } from "@mantine/core";
import React, { useCallback, useContext, useEffect } from "react";
import AdoptanteAppShell from "../../components/AdoptanteAppShell/AdoptanteAppShell";
import AnimalCard from "../../components/Animal/AnimalCard";
import { ColWrapper as Col } from "../../components/Grid/_col-wrapper";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { TAnimal } from "../../types";

type Props = {};

export const AdoptanteAnimalesPage = (props: Props) => {
  const { logout } = useContext(AuthContext);
  const [animales, setAnimales] = React.useState<[TAnimal] | null>(null);

  const getAnimales = useCallback(async () => {
    try {
      const response = await api.animales.getNoAdoptados();
      setAnimales(response.data);
      console.log(response.data);
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const req = async () => {
      await getAnimales();
    };
    req();
  }, [getAnimales]);

  return (
    <AdoptanteAppShell>
      <Title order={3}>Animales</Title>
      <Grid mt="lg">
        {animales?.map((animal) => (
          <Col md={4} sm={6} xs={6}>
            <AnimalCard animal={animal} />
          </Col>
        ))}
      </Grid>
    </AdoptanteAppShell>
  );
};
