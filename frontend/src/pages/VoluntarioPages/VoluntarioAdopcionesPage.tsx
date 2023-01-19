import { Badge, Table, Title } from "@mantine/core";
import React, { useCallback, useContext, useEffect } from "react";
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
      <Table mt="lg">
        <thead>
          <tr>
            <th>Animal</th>
            <th>Adoptante</th>
            <th>Voluntario</th>
            <th>Fecha</th>
            <th>Estado animal</th>
          </tr>
        </thead>
        {adopciones && (
          <tbody>
            {adopciones.map((adopcion) => (
              <tr key={adopcion.id}>
                <td>{adopcion.animal.nombre}</td>
                <td>{`${adopcion.adoptante.first_name} ${adopcion.adoptante.last_name} | ${adopcion.adoptante.email}`}</td>
                <td>{`${adopcion.voluntario.first_name} ${adopcion.voluntario.last_name} | ${adopcion.adoptante.email}`}</td>
                <td>{adopcion.fecha}</td>
                <td>
                  <Badge color="teal" variant="light">
                    {adopcion.animal.estado}
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
