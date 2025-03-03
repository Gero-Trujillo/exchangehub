import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlesPage from "./pages/ArticlesPage";
import { AuthProvider } from "./context/AuthContext";
import LoginRegister from "./components/LoginRegister";
import ProtectedRoute from "./ProtectedRoute";
import { ArticleProvider } from "./context/ArticleContext";
import ChatHomePage from "./pages/ChatHomePage";
import { useAuthStore } from "./store/useAuthStore";
import SuscriptionPage from "./pages/SuscriptionPage";
import EditProfile from "./components/EditProfile";
import OfertarPage from "./pages/OfertarPage";
import TermsPage from "./pages/TermsPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import WhatsAppButton from "./components/WhatsAppButton";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
      AOS.init({
        duration: 1500, // Duración de la animación en milisegundos
        once: false, // Permitir que la animación ocurra cada vez que el elemento entre en la vista
        mirror: true, // Permitir que la animación ocurra al hacer scroll hacia arriba
      });
    }, []);

  return (
    <>
      <AuthProvider>
        <ArticleProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Premium" element={<SuscriptionPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/Inicio" element={<HomePage />} />
              <Route path="/Productos" element={<ArticlesPage />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />


              <Route element={<ProtectedRoute />}>
                <Route path="/Mensajes" element={<ChatHomePage />} />
                <Route path="/Perfil" element={<ProfilePage />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/Ofertar" element={<OfertarPage />} />
                <Route path="/Settings" element />
              </Route>
            </Routes>
            <WhatsAppButton />
            <FooterWrapper />
          </BrowserRouter>
        </ArticleProvider>
      </AuthProvider>
    </>
  );
}

function FooterWrapper() {
  const location = useLocation();
  return location.pathname !== "/Mensajes" ? <Footer /> : null;
}

export default App;
