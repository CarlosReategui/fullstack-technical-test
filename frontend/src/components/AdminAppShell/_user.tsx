import { useContext } from "react";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { AuthContext } from "../../context/AuthContext";

export function User() {
  const theme = useMantineTheme();
  const { user, logout } = useContext(AuthContext);

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,

          "&:hover": {
            backgroundColor: theme.colors.gray[0],
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

          <Button variant="light" color="dark" onClick={logout}>
            Logout
          </Button>
        </Group>
      </UnstyledButton>
    </Box>
  );
}
