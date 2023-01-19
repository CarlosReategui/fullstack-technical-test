import { Badge, Table } from "@mantine/core";
import React from "react";
import { TAdopcion } from "../../types";

type Props = {
  adopciones: [TAdopcion] | null;
};

export const AdopcionesReadTable = ({ adopciones }: Props) => {
  return (
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
  );
};
