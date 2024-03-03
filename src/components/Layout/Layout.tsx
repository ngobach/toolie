import { Container } from "@mantine/core";
import { Header } from "../Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container size="md" mt="lg">
        <main>{children}</main>
      </Container>
    </>
  );
}
