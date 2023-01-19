import { Badge, Select, Table, Title } from "@mantine/core";
import React, { useCallback, useContext, useEffect } from "react";
import VoluntarioAppShell from "../../components/VoluntarioAppShell/VoluntarioAppShell";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { TAnimal } from "../../types";

type Props = {};

export const VoluntarioAnimalesPage = (props: Props) => {
  const { logout } = useContext(AuthContext);
  const [animales, setAnimales] = React.useState<[TAnimal] | null>(null);

  const getAnimales = useCallback(async () => {
    try {
      const response = await api.animal.get();
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

  const onDropdownChange = async (value: string | null, animal: TAnimal) => {
    console.log(value, animal);
    if (value) animal.estado = value;
    if (animal.id) {
      try {
        await api.animal.put(animal, animal.id);
        getAnimales();
      } catch {
        logout();
      }
    }
  };

  return (
    <VoluntarioAppShell>
      <Title order={3}>Animales</Title>
      <Table mt="lg">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Foto</th>
            <th>Edad</th>
            <th>Raza</th>
            <th>Tipo</th>
            <th>Estado</th>
          </tr>
        </thead>
        {animales && (
          <tbody>
            {animales.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.nombre}</td>
                <td>
                  <Badge
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(animal.foto)}
                  >
                    ver
                  </Badge>
                </td>
                <td>{animal.edad}</td>
                <td>{animal.raza}</td>
                <td>
                  <Badge color="orange">{animal.tipo}</Badge>
                </td>
                <td>
                  <Select
                    onChange={(value) => onDropdownChange(value, animal)}
                    value={animal.estado}
                    data={[
                      { value: "ADOPTADO", label: "Adoptado" },
                      { value: "EN_ADOPCION", label: "En adopción" },
                      {
                        value: "EN_ESPERA_DE_ADOPCION",
                        label: "En espera de adopción",
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </VoluntarioAppShell>
  );
};
