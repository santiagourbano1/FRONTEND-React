import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateTicket from "./pages/CreateTicket";

import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import { TicketsProvider } from "./context/TicketsContext";

function App() {
  return (
    <AuthProvider>
      <TicketsProvider>

        <Routes>

          {/* LOGIN */}
          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute fallback={<Navigate to="/login" />}>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* CREATE TICKET */}
          <Route
            path="/create-ticket"
            element={
              <PrivateRoute fallback={<Navigate to="/login" />}>
                <CreateTicket />
              </PrivateRoute>
            }
          />

          {/* DEFAULT */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" />}
          />

        </Routes>

      </TicketsProvider>
    </AuthProvider>
  );
}

export default App;