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

function App() {
  const [IsLogin, SetIsLogin] = useState(false);
  return (
    <>
      {IsLogin ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/Inicio" element={<HomePage />} />
            <Route path="/Perfil" element={<ProfilePage />} />
            <Route path="/Mensajes" element />
            <Route path="/Productos" element={<ArticlesPage />} />
            <Route path="/Settings" element />
          </Routes>
          <Footer />
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
