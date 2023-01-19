import { Button, Grid, Modal, Select, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AdoptanteAppShell from "../../components/AdoptanteAppShell/AdoptanteAppShell";
import AnimalCard from "../../components/Animal/AnimalCard";
import { ColWrapper as Col } from "../../components/Grid/_col-wrapper";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { TAnimal, TUser } from "../../types";

type Props = {};

export const AdoptanteAnimalesPage = (props: Props) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [animales, setAnimales] = React.useState<[TAnimal] | null>(null);
  const [voluntarios, setVoluntarios] = React.useState<[TUser] | null>(null);
  const [voluntarioSeleccionado, setVoluntarioSeleccionado] = React.useState<
    string | null
  >("");
  const [adoptarModalOpened, setAdoptarModalOpened] = React.useState(false);
  const [animalPorAdoptar, setAnimalPorAdoptar] =
    React.useState<TAnimal | null>(null);

  const [selectError, setSelectError] = React.useState<string>("");

  const openModal = (animal: TAnimal) => {
    setAdoptarModalOpened(true);
    setAnimalPorAdoptar(animal);
  };

  const getDataFromServer = useCallback(async () => {
    try {
      const animalesRes = await api.animales.getNoAdoptados();
      const voluntariosRes = await api.voluntarios.get();
      setAnimales(animalesRes.data);
      setVoluntarios(voluntariosRes.data);
      console.log(animalesRes.data);
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const req = async () => {
      await getDataFromServer();
    };
    req();
  }, [getDataFromServer]);

  const onDropdownChange = (value: string | null) => {
    setVoluntarioSeleccionado(value);
  };

  const crearAdopcion = async () => {
    if (!voluntarioSeleccionado) {
      setSelectError("Debe seleccionar un voluntario");
    } else if (animalPorAdoptar?.id) {
      try {
        await api.adopciones.adoptanteCrearAdopcion(
          parseInt(voluntarioSeleccionado),
          animalPorAdoptar.id
        );
        navigate(0);
      } catch (error: any) {
        if (error.response?.status === 401) logout();
      }
    }
  };

  return (
    <AdoptanteAppShell>
      <Title order={3}>Animales</Title>
      <Grid mt="lg">
        {animales?.map((animal) => (
          <Col md={4} sm={6} xs={6}>
            <AnimalCard animal={animal} openModal={openModal} />
          </Col>
        ))}
      </Grid>
      {voluntarios && (
        <Modal
          opened={adoptarModalOpened}
          onClose={() => {
            setAdoptarModalOpened(false);
            setVoluntarioSeleccionado("");
          }}
        >
          <Title order={3}>Adoptar a {animalPorAdoptar?.nombre}</Title>
          <Select
            onChange={(value) => onDropdownChange(value)}
            label="Asesor de adopción"
            value={voluntarioSeleccionado || ""}
            error={selectError}
            data={voluntarios.map((voluntario) => ({
              value: voluntario.id?.toString() || "",
              label: `${voluntario.first_name} ${voluntario.last_name} | ${voluntario.email}`,
            }))}
            placeholder="Seleccione a su asesor de adopción"
            mt="lg"
          />
          <Button variant="light" fullWidth mt="lg" onClick={crearAdopcion}>
            Abrir proceso de adopción
          </Button>
        </Modal>
      )}
    </AdoptanteAppShell>
  );
};
