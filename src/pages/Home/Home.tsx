import { Layout } from "@/components";
import { useDocumentTitle } from "@mantine/hooks";

export function HomePage() {
  useDocumentTitle("Home");
  return <Layout>Hello?</Layout>;
}
