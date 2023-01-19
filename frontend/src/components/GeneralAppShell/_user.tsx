import { useContext } from "react";
import {
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  Button,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import { AuthContext } from "../../context/AuthContext";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { FiLogOut } from "react-icons/fi";

export function User() {
  const theme = useMantineTheme();
  const { user, logout } = useContext(AuthContext);

  return (
    <Menu position="right">
      <Box
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <Menu.Target>
          <UnstyledButton
            sx={{
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                radius="xl"
              />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {`${user?.first_name} ${user?.last_name}`}
                </Text>
                <Text color="dimmed" size="xs">
                  {user?.email}
                </Text>
              </Box>

              {theme.dir === "ltr" ? (
                <IconChevronRight size={18} />
              ) : (
                <IconChevronLeft size={18} />
              )}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Sesión</Menu.Label>
          <Menu.Item onClick={() => logout()} icon={<FiLogOut size={14} />}>
            Cerrar Sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Box>
    </Menu>
  );
}
