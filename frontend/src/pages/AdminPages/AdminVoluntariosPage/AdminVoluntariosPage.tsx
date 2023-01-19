import { Badge, Button, Group, Modal, Table, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import AdminAppShell from "../../../components/AdminAppShell/AdminAppShell";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";
import { TUser } from "../../../types";
import { AddVoluntarioForm, TForm } from "./_voluntarioForm";

type Props = {};

export const AdminVoluntariosPage = (props: Props) => {
  const navigate = useNavigate();

  const [voluntarios, setVoluntarios] = React.useState<[TUser] | null>(null);
  const [modalOpened, setModalOpened] = React.useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = React.useState(false);
  const { logout } = useContext(AuthContext);
  const [formValues, setFormValues] = React.useState<TForm | null>(null);
  const [id, setId] = React.useState<number | undefined>(undefined);

  const getVoluntarios = useCallback(async () => {
    try {
      const response = await api.voluntario.get();
      setVoluntarios(response.data);
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const req = async () => {
      await getVoluntarios();
    };

    req();
  }, [getVoluntarios]);

  const setEditValues = (values: TUser, id: number | undefined) => {
    setModalOpened(true);
    const formValues: TForm = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      is_active: values.is_active,
      password: "",
    };
    setFormValues(formValues);
    setId(id);
  };

  const onClickDelete = async (id: number | undefined) => {
    setDeleteModalOpened(true);
    setId(id);
  };

  const onClickAcceptDelete = async (id: number | undefined) => {
    if (id) {
      try {
        await api.voluntario.delete(id);
        navigate(0);
      } catch {
        showNotification({
          title: "Error",
          message: "No se pudo eliminar el voluntario.",
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
          <AddVoluntarioForm initialValues={formValues} id={id} />
        </Modal>
        <Modal
          opened={deleteModalOpened}
          size={300}
          onClose={() => setDeleteModalOpened(false)}
        >
          <Title order={3}>¿Seguro que desea borrar el voluntario?</Title>
          <Group mt="lg" position="center">
            <Button
              onClick={() => onClickAcceptDelete(id)}
              color="red"
              variant="light"
            >
              Sí
            </Button>
            <Button
              onClick={() => setDeleteModalOpened(false)}
              color="teal"
              variant="light"
            >
              No
            </Button>
          </Group>
        </Modal>
        <Group>
          <Title order={3}>Voluntarios</Title>
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
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Email</th>
              <th>¿Activo?</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {voluntarios && (
            <tbody>
              {voluntarios.map((voluntario) => (
                <tr key={voluntario.id}>
                  <td>{voluntario.first_name}</td>
                  <td>{voluntario.last_name}</td>
                  <td>{voluntario.email}</td>
                  <td>
                    {
                      <Badge
                        color={voluntario.is_active ? "teal" : "red"}
                        variant="light"
                      >
                        {voluntario.is_active ? "Sí" : "No"}
                      </Badge>
                    }
                  </td>
                  <td>
                    <Button
                      color="teal"
                      variant="light"
                      onClick={() => setEditValues(voluntario, voluntario.id)}
                    >
                      editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="red"
                      variant="light"
                      compact
                      onClick={() => onClickDelete(voluntario.id)}
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
