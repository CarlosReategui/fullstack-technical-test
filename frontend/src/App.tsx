import { ThemeProvider } from "./ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdoptantePage from "./pages/AdoptantePage";
import VoluntarioPage from "./pages/VoluntarioPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <ThemeProvider>
      {/* <Stack align="center" mt={50}>
        <Text size="xl" weight={500}>
          Welcome to Mantine!
        </Text>
        <Button>Click the button</Button>
      </Stack> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adoptante" element={<AdoptantePage />} />
          <Route path="/voluntario" element={<VoluntarioPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}