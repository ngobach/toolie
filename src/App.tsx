import { Route, Routes } from "react-router-dom";
import {
  ContactUsPage,
  GrossToNetPage,
  HomePage,
  NotFoundPage,
  ToolsHubPage,
} from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/tools" element={<ToolsHubPage />} />
      <Route path="/tools/gross-to-net" element={<GrossToNetPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
