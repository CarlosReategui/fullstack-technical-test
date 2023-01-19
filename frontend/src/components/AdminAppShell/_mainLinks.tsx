import React from "react";
import { MdPets } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { RiHandHeartFill } from "react-icons/ri";
import { FaDog } from "react-icons/fa";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  route: string;
}

function MainLink({ icon, color, label, route }: MainLinkProps) {
  const navigate = useNavigate();
  return (
    <UnstyledButton
      onClick={() => navigate(route)}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.black,

        "&:hover": {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <MdPets size={16} />,
    color: "blue",
    label: "Animales",
    route: "/admin/animales",
  },
  {
    icon: <AiFillHeart size={16} />,
    color: "teal",
    label: "Adoptantes",
    route: "/admin/adoptantes",
  },
  {
    icon: <RiHandHeartFill size={16} />,
    color: "violet",
    label: "Voluntarios",
    route: "/admin/voluntarios",
  },
  {
    icon: <FaDog size={16} />,
    color: "grape",
    label: "Adopciones",
    route: "/admin/adopciones",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
