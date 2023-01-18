import { AppShell, Navbar, Header, Group, Text } from "@mantine/core";
import { MainLinks } from "./_mainLinks";
import { User } from "./_user";
import { FaPaw } from "react-icons/fa";

const AdminAppShell = () => {
  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Group spacing={5}>
              <FaPaw size={20} />
              <Text size="xl" weight={500}>
                AdoptaUnAmigo
              </Text>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      Your application goes here
    </AppShell>
  );
};

export default AdminAppShell;
