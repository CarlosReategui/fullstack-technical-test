import React from "react";
import LoginRegisterHeader from "../components/Header/LoginRegisterHeader";
import {
  TextInput,
  Button,
  Group,
  Title,
  PasswordInput,
  Container,
  Radio,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import api from "../services/api";
import { showNotification } from "@mantine/notifications";

type Props = {};

const RegisterPage = (props: Props) => {
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido."),
      password: (value) => (value.length > 0 ? null : "Ingrese su contraseña."),
      firstName: (value) => (value.length > 0 ? null : "Ingrese su nombre."),
      lastName: (value) => (value.length > 0 ? null : "Ingrese su apellido."),
      role: (value) => (value == "" ? "Seleccione un rol." : null),
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    // try {
    //   const response = await api.login(values.email, values.password);
    //   console.log(response.data);
    // } catch {
    //   showNotification({
    //     title: "Error",
    //     message: "Email o contraseña incorrectos.",
    //     color: "red",
    //   });
    // }
    setLoading(false);
  };

  return (
    <div>
      <LoginRegisterHeader />
      <Container size={300} mt="md">
        <Title order={4}>Registro</Title>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            mt="sm"
            withAsterisk
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="sm"
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <TextInput
            mt="sm"
            withAsterisk
            label="Nombre"
            placeholder="Nombre"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            mt="sm"
            withAsterisk
            label="Apellido"
            placeholder="Apellido"
            {...form.getInputProps("lastName")}
          />
          <Radio.Group
            mt="sm"
            name="role"
            label="Seleccione su rol"
            withAsterisk
            {...form.getInputProps("role")}
          >
            <Radio checked value="ADOPTANTE" label="Adoptante" />
            <Radio value="VOLUNTARIO" label="Voluntario" />
          </Radio.Group>
          <Group position="center" mt="md">
            <Button type="submit" loading={isLoading} variant="light">
              Log In
            </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
};

export default RegisterPage;
