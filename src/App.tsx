import { Navigate, Route, Routes } from "react-router-dom";
import {
  ContactUsPage,
  GrossToNetPage,
  OldHomePage,
  NotFoundPage,
  ToolsHubPage,
} from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tools" replace />} />
      <Route path="/old" element={<OldHomePage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/tools" element={<ToolsHubPage />} />
      <Route path="/tools/gross-to-net" element={<GrossToNetPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
