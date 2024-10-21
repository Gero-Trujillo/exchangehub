import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlesPage from "./pages/ArticlesPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import LoginRegister from "./components/LoginRegister";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/Inicio" element={<HomePage />} />
            <Route path="/Productos" element={<ArticlesPage />} />
            <Route path="/login" element={<LoginRegister />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Mensajes" element />
              <Route path="/Perfil" element={<ProfilePage />} />
              <Route path="/Settings" element />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
