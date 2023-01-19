import { Card, Group, Image, Text, Badge, List, Button } from "@mantine/core";
import React from "react";
import { FaPaw } from "react-icons/fa";
import { TAnimal } from "../../types";

type Props = {
  animal: TAnimal;
  openModal: (animal: TAnimal) => void;
};

const AnimalCard = ({ animal, openModal }: Props) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={animal.foto} height={150} alt="Foto de mascota" />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{animal.nombre}</Text>
        <Badge color={animal.tipo === "PERRO" ? "green" : "orange"}>
          {animal.tipo}
        </Badge>
      </Group>
      <List spacing="xs" size="sm" icon={<FaPaw />}>
        <List.Item>{animal.raza}</List.Item>
        <List.Item>{animal.edad} año(s)</List.Item>
      </List>
      <Button
        variant="light"
        color="blue"
        mt="md"
        radius="md"
        fullWidth
        onClick={() => openModal(animal)}
      >
        Adoptar
      </Button>
    </Card>
  );
};

export default AnimalCard;
