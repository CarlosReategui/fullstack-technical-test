import { Badge, Button, Group, Modal, Table, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import AdminAppShell from "../../../components/AdminAppShell/AdminAppShell";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";
import { TAnimal } from "../../../types";
import { AddAnimalForm, TForm } from "./_animalForm";

type Props = {};

export const AdminAnimalesPage = (props: Props) => {
  const navigate = useNavigate();

  const [animales, setAnimales] = React.useState<[TAnimal] | null>(null);
  const [modalOpened, setModalOpened] = React.useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = React.useState(false);
  const { logout } = useContext(AuthContext);
  const [formValues, setFormValues] = React.useState<TForm | null>(null);
  const [id, setId] = React.useState<number | undefined>(undefined);

  const getAnimals = useCallback(async () => {
    try {
      const response = await api.animal.get();
      setAnimales(response.data);
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const req = async () => {
      await getAnimals();
    };

    req();
  }, [getAnimals]);

  const setEditValues = (values: TAnimal, id: number | undefined) => {
    setModalOpened(true);
    setFormValues(values);
    setId(id);
  };

  const onClickDelete = async (id: number | undefined) => {
    setDeleteModalOpened(true);
    setId(id);
  };

  const onClickAcceptDelete = async (id: number | undefined) => {
    if (id) {
      try {
        await api.animal.delete(id);
        navigate(0);
      } catch {
        showNotification({
          title: "Error",
          message: "No se pudo eliminar el animal.",
          color: "red",
        });
      }
    }
  };

  return (
    <AdminAppShell>
      <>
        <Modal
          size={300}
          opened={modalOpened}
          onClose={() => {
            setModalOpened(false);
            setFormValues(null);
          }}
        >
          <AddAnimalForm initialValues={formValues} id={id} />
        </Modal>
        <Modal
          opened={deleteModalOpened}
          size={300}
          onClose={() => setDeleteModalOpened(false)}
        >
          <Title order={3}>¿Seguro que desea borrar el animal?</Title>
          <Group mt="lg" position="center">
            <Button onClick={() => onClickAcceptDelete(id)} color="red">
              Sí
            </Button>
            <Button onClick={() => setDeleteModalOpened(false)} color="teal">
              No
            </Button>
          </Group>
        </Modal>
        <Group>
          <Title order={3}>Animales</Title>
          <Button
            color="teal"
            variant="outline"
            onClick={() => setModalOpened(true)}
          >
            añadir
          </Button>
        </Group>
        <Table mt="lg">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Raza</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {animales && (
            <tbody>
              {animales.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.nombre}</td>
                  <td>{animal.edad}</td>
                  <td>{animal.raza}</td>
                  <td>
                    <Badge color="orange">{animal.tipo}</Badge>
                  </td>
                  <td>
                    <Badge color="cyan">{animal.estado}</Badge>
                  </td>
                  <td>
                    <Button
                      color="teal"
                      variant="light"
                      onClick={() => setEditValues(animal, animal.id)}
                    >
                      editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="red"
                      variant="light"
                      compact
                      onClick={() => onClickDelete(animal.id)}
                    >
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </>
    </AdminAppShell>
  );
};
