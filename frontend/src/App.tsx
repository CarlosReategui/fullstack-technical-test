import { ThemeProvider } from "./ThemeProvider";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { AdminRoute, AdoptanteRoute, VoluntarioRoute } from "./utils/index";

import {
  AdoptantePage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "./pages/index";

import {
  AdminPage,
  AdminAnimalesPage,
  AdminAdopcionesPage,
  AdminAdoptantesPage,
  AdminVoluntariosPage,
} from "./pages/AdminPages/index";

import {
  VoluntarioPage,
  VoluntarioAdopcionesPage,
  VoluntarioAdoptantesPage,
  VoluntarioAnimalesPage,
} from "./pages/VoluntarioPages/index";

export default function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                }
              />
              <Route
                path="admin/animales"
                element={
                  <AdminRoute>
                    <AdminAnimalesPage />
                  </AdminRoute>
                }
              />
              <Route
                path="admin/adopciones"
                element={
                  <AdminRoute>
                    <AdminAdopcionesPage />
                  </AdminRoute>
                }
              />
              <Route
                path="admin/voluntarios"
                element={
                  <AdminRoute>
                    <AdminVoluntariosPage />
                  </AdminRoute>
                }
              />
              <Route
                path="admin/adoptantes"
                element={
                  <AdminRoute>
                    <AdminAdoptantesPage />
                  </AdminRoute>
                }
              />
              <Route
                path="adoptante"
                element={
                  <AdoptanteRoute>
                    <AdoptantePage />
                  </AdoptanteRoute>
                }
              />
              <Route
                path="voluntario"
                element={
                  <VoluntarioRoute>
                    <VoluntarioPage />
                  </VoluntarioRoute>
                }
              />
              <Route
                path="voluntario/animales"
                element={
                  <VoluntarioRoute>
                    <VoluntarioAnimalesPage />
                  </VoluntarioRoute>
                }
              />
              <Route
                path="voluntario/adoptantes"
                element={
                  <VoluntarioRoute>
                    <VoluntarioAdoptantesPage />
                  </VoluntarioRoute>
                }
              />
              <Route
                path="voluntario/adopciones"
                element={
                  <VoluntarioRoute>
                    <VoluntarioAdopcionesPage />
                  </VoluntarioRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
