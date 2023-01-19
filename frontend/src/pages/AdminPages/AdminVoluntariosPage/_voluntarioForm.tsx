import {
  Button,
  Group,
  PasswordInput,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../services/api";
import { TUser } from "../../../types";

export type TForm = {
  first_name: string;
  last_name: string;
  is_active: boolean;
  email: string;
  password: string;
};

type Props = { initialValues: TForm | null; id: number | undefined };

const createInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  is_active: false,
  password: "",
};

export const AddVoluntarioForm = (props: Props) => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: props.initialValues
      ? props.initialValues
      : createInitialValues,
    validate: {
      first_name: (value) => (value.length > 0 ? null : "Ingrese el nombre."),
      last_name: (value) => (value.length > 0 ? null : "Ingrese el apellido."),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido."),
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: TForm) => {
    console.log("buenas");
    setLoading(true);
    const user: TUser = {
      first_name: values.first_name,
      last_name: values.last_name,
      is_active: values.is_active,
      email: values.email,
    };
    let success = true;
    console.log("entre al on submit");
    if (!props.initialValues) {
      try {
        user.password = values.password;
        user.is_active = true;
        await api.voluntarios.post(user);
        navigate(0);
      } catch {
        success = false;
      }
    } else {
      console.log("trate hacer put");
      if (props.id) {
        try {
          await api.voluntarios.put(user, props.id);
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
        {props.initialValues ? "Actualizar" : "Crear"} voluntario
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          mt="sm"
          withAsterisk
          label="Nombres"
          placeholder="Nombres"
          {...form.getInputProps("first_name")}
        />
        <TextInput
          withAsterisk
          mt="sm"
          label="Apellidos"
          placeholder="Apellidos"
          {...form.getInputProps("last_name")}
        />
        <TextInput
          withAsterisk
          mt="sm"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        {!props.initialValues && (
          <PasswordInput
            withAsterisk
            mt="sm"
            label="Contraseña"
            placeholder="Contraseña"
            {...form.getInputProps("password")}
          />
        )}
        {props.initialValues && (
          <Switch
            mt="sm"
            label="Activo"
            {...form.getInputProps("is_active")}
            checked={form.values.is_active}
          />
        )}
        <Group position="center" mt="md">
          <Button type="submit" loading={loading} variant="light">
            {props.initialValues ? "Actualizar" : "Crear"}
          </Button>
        </Group>
      </form>
    </>
  );
};
