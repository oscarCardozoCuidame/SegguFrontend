import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PaginaInicialLayout from "../pages/PaginaInicial/PaginaInicial.layout";
import PaginaHome from "../pages/home/home";
// import PaginaPerfil from "../pages/perfil/PaginaPerfil";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      
      <Route path="/inicio/*" element={<PaginaInicialLayout />} />
      <Route path="/home/*" element={<PaginaHome />} />
    </Routes>
  );
};

export default PublicRoutes;
