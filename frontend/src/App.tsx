import { ThemeProvider } from "./ThemeProvider";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdoptantePage from "./pages/AdoptantePage";
import VoluntarioPage from "./pages/VoluntarioPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/adoptante" element={<AdoptantePage />} />
              <Route path="/voluntario" element={<VoluntarioPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
