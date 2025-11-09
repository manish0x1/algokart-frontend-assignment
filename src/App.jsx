import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ResumePage from "./pages/ResumePage";

function RequireAuth({ children }) {
  const isAuthenticated = !!localStorage.getItem("ir_user");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/resume/*"
        element={
          <RequireAuth>
            <ResumePage />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/resume" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
