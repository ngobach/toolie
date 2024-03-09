import { Container, Group, Burger, Title, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useHistory, useLocation } from "react-router-dom";
import classes from "./Header.module.css";

type NavLink = {
  link: string;
  label: string;
};

const links: NavLink[] = [
  { link: "/", label: "Home" },
  { link: "/salary-calculator", label: "Salary Calculator" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogoClick = () => {
    history.push("/");
  };

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={link.link === currentPath || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <Box component="header" className={classes.header} bg="white" py="lg">
      <Container size="md" className={classes.inner}>
        <Title
          order={1}
          className={classes.title}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          Toolie
        </Title>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </Box>
  );
}
