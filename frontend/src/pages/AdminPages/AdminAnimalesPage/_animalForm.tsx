import {
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../services/api";
import { TAnimal } from "../../../types";

export type TForm = {
  nombre: string;
  edad: number;
  raza: string;
  tipo: string;
  estado: string;
};

type Props = { initialValues: TForm | null; id: number | undefined };

const createInitialValues = {
  nombre: "",
  edad: 0,
  raza: "",
  tipo: "PERRO",
  estado: "ADOPTADO",
};

export const AddAnimalForm = (props: Props) => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: props.initialValues
      ? props.initialValues
      : createInitialValues,
    validate: {
      nombre: (value) => (value.length > 0 ? null : "Ingrese el nombre."),
      raza: (value) => (value.length > 0 ? null : "Ingrese la raza."),
      tipo: (value) => (value !== "" ? null : "Ingrese el tipo."),
      estado: (value) => (value !== "" ? null : "Ingrese el estado."),
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: TForm) => {
    setLoading(true);
    const animal: TAnimal = {
      nombre: values.nombre,
      raza: values.raza,
      edad: values.edad,
      tipo: values.tipo,
      estado: values.estado,
    };
    let success = true;
    if (!props.initialValues) {
      try {
        await api.animal.post(animal);
        navigate(0);
      } catch {
        success = false;
      }
    } else {
      if (props.id) {
        try {
          await api.animal.put(animal, props.id);
          navigate(0);
        } catch {
          success = false;
        }
      }
    }
    if (!success) {
      showNotification({
        title: "Error",
        message: props.initialValues
          ? "No se pudo actualizar"
          : "No se pudo crear",
        color: "red",
      });
    }
    console.log(values);
    setLoading(false);
  };

  return (
    <>
      <Title order={4}>
        {props.initialValues ? "Actualizar" : "Crear"} animal
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          mt="sm"
          withAsterisk
          label="Nombre"
          placeholder="Nombre"
          {...form.getInputProps("nombre")}
        />
        <NumberInput
          mt="sm"
          label="Edad"
          placeholder="Edad"
          {...form.getInputProps("edad")}
        />
        <TextInput
          mt="sm"
          label="Raza"
          placeholder="Raza"
          {...form.getInputProps("raza")}
        />
        <Select
          {...form.getInputProps("tipo")}
          mt="sm"
          label="Tipo"
          data={[
            { value: "PERRO", label: "Perro" },
            { value: "GATO", label: "Gato" },
          ]}
        />
        <Select
          {...form.getInputProps("estado")}
          mt="sm"
          label="Estado"
          data={[
            { value: "ADOPTADO", label: "Adoptado" },
            { value: "EN_ADOPCION", label: "En adopción" },
            { value: "EN_ESPERA_DE_ADOPCION", label: "En espera de adopción" },
          ]}
        />
        <Group position="center" mt="md">
          <Button type="submit" loading={loading} variant="light">
            {props.initialValues ? "Actualizar" : "Crear"}
          </Button>
        </Group>
      </form>
    </>
  );
};
