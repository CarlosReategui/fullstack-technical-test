import React from "react";
import LoginRegisterHeader from "../components/Header/LoginRegisterHeader";
import {
  TextInput,
  Button,
  Group,
  Title,
  PasswordInput,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

type Props = {};

export const LoginPage = (props: Props) => {
  const { login, loading } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido."),
      password: (value) => (value.length > 0 ? null : "Ingrese su contraseña."),
    },
  });

  return (
    <div>
      <LoginRegisterHeader />
      <Container size={300} mt="md">
        <Title order={4}>Log in</Title>
        <form onSubmit={form.onSubmit(login)}>
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
          <Group position="center" mt="md">
            <Button type="submit" loading={loading} variant="light">
              Log In
            </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
};
