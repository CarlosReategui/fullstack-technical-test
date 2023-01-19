import { Badge, Table, Title } from "@mantine/core";
import React, { useCallback, useContext, useEffect } from "react";
import VoluntarioAppShell from "../../components/VoluntarioAppShell/VoluntarioAppShell";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { TUser } from "../../types";

type Props = {};

export const VoluntarioAdoptantesPage = (props: Props) => {
  const { logout } = useContext(AuthContext);
  const [adoptantes, setAdoptantes] = React.useState<[TUser] | null>(null);

  const getAdoptantes = useCallback(async () => {
    try {
      const response = await api.adoptante.get();
      setAdoptantes(response.data);
      console.log(response.data);
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const req = async () => {
      await getAdoptantes();
    };
    req();
  }, [getAdoptantes]);

  return (
    <VoluntarioAppShell>
      <Title order={3}>Adoptantes</Title>
      <Table mt="lg">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>¿Activo?</th>
          </tr>
        </thead>
        {adoptantes && (
          <tbody>
            {adoptantes.map((adoptante) => (
              <tr key={adoptante.id}>
                <td>{adoptante.first_name}</td>
                <td>{adoptante.last_name}</td>
                <td>{adoptante.email}</td>
                <td>
                  <Badge
                    color={adoptante.is_active ? "teal" : "red"}
                    variant="light"
                  >
                    {adoptante.is_active ? "Sí" : "No"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </VoluntarioAppShell>
  );
};
