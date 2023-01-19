import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Group,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { FaPaw } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  mainLinks: JSX.Element;
  user: JSX.Element;
};

const GeneralAppShell: React.FC<Props> = ({ children, mainLinks, user }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="xs"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt="xs">
            {mainLinks}
          </Navbar.Section>
          <Navbar.Section>{user}</Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="xs" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="xs"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group sx={{ height: "100%" }} px={10} position="apart">
              <Group spacing={5}>
                <FaPaw size={20} />
                <Text size="xl" weight={500}>
                  AdoptaUnAmigo
                </Text>
              </Group>
            </Group>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default GeneralAppShell;
