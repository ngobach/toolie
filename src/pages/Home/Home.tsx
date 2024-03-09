import { Layout } from "@/components";
import { useDocumentTitle } from "@mantine/hooks";
import { Hero } from "./Hero";

export function HomePage() {
  useDocumentTitle("Home");
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
