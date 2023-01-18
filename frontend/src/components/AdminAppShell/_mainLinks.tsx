import React from "react";
import {
  IconGitPullRequest,
  IconAlertCircle,
  IconMessages,
  IconDatabase,
} from "@tabler/icons";
import { MdPets } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { RiHandHeartFill } from "react-icons/ri";
import { FaDog } from "react-icons/fa";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
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
  },
  { icon: <AiFillHeart size={16} />, color: "teal", label: "Adoptantes" },
  {
    icon: <RiHandHeartFill size={16} />,
    color: "violet",
    label: "Voluntarios",
  },
  { icon: <FaDog size={16} />, color: "grape", label: "Adopciones" },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
