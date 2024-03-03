import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./AppRouter";

export function App() {
  return (
    <MantineProvider>
      <AppRouter />
    </MantineProvider>
  );
}
