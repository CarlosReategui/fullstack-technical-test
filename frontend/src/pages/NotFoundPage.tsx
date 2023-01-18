import { Container, Text } from "@mantine/core";
import React from "react";
import LoginRegisterHeader from "../components/Header/LoginRegisterHeader";

type Props = {};

export const NotFoundPage = (props: Props) => {
  return (
    <>
      <LoginRegisterHeader />
      <Container size={300} mt="md">
        <Text size="xl" weight={600} align="center">
          Not Found 404
        </Text>
      </Container>
    </>
  );
};
