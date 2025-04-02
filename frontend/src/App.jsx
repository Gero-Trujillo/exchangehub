import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
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
import EditArticle from "./components/EditArticle";
import MyProducts from "./components/MyProducts";
import TermsPage from "./pages/TermsPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";
import AOS from "aos";
import "aos/dist/aos.css";
import ProfileAnyUserPage from "./pages/ProfileAnyUserPage";
import ConfirmAccountPage from "./pages/ConfirmAccountPage";
import RegisterResponsePage from "./pages/RegisterResponsePage";
import { getExchangeByUserId } from "./api/exchanges";
import RatingModal from "./components/RatingModal";

function App() {
  const reconnectSocketOnLoad = useAuthStore(
    (state) => state.reconnectSocketOnLoad
  ); // Recupera la función para reconectar el socket desde el estado global
  const [exchangesToRating, setExchangesToRating] = useState([]); // Estado para almacenar los intercambios pendientes de calificación
  const user = JSON.parse(localStorage.getItem("authUser")); // Obtiene el usuario autenticado desde el almacenamiento local

  // Reconecta el socket al cargar la aplicación
  useEffect(() => {
    reconnectSocketOnLoad();
  }, []);

  // Obtiene los intercambios completados del usuario autenticado
  useEffect(() => {
    if (!user || !user.idUser) {
      console.error("User is not defined"); // Loguea un error si el usuario no está definido
      return;
    }

    const fetchExchanges = async () => {
      try {
        const res = await getExchangeByUserId(user.idUser); // Solicita los intercambios del usuario
        if (res.data.length > 0) {
          // Filtra los intercambios completados
          const exchanges = res.data.filter(
            (exchange) => exchange.status === "completado"
          );
          setExchangesToRating(exchanges); // Actualiza el estado con los intercambios pendientes de calificación
        }
      } catch (error) {
        console.error("Error fetching exchanges:", error); // Loguea un error si falla la solicitud
      }
    };

    fetchExchanges();
  }, []);

  // Inicializa las animaciones de AOS
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
              {/* Rutas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/Premium" element={<SuscriptionPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/Inicio" element={<HomePage />} />
              <Route path="/Productos" element={<ArticlesPage />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/confirm/:idUser" element={<ConfirmAccountPage />} />
              <Route
                path="/register/response"
                element={<RegisterResponsePage />}
              />

              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/Mensajes" element={<ChatHomePage />} />
                <Route path="/Perfil" element={<ProfilePage />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route
                  path="/EditArticle/:articleId"
                  element={<EditArticle />}
                />
                <Route path="/Ofertar" element={<OfertarPage />} />
                <Route path="/MyProducts" element={<MyProducts />} />
                <Route path="/Settings" element />
                <Route
                  path="/Perfil/Usuario/:id"
                  element={<ProfileAnyUserPage />}
                />
              </Route>
            </Routes>
            <FooterWrapper />
            {/* Renderiza el modal de calificación si hay intercambios pendientes */}
            {exchangesToRating.length > 0 &&
              exchangesToRating.map((exchange) => {
                const otherUserId =
                  exchange.idUserOne === user.idUser
                    ? exchange.idUserTwo
                    : exchange.idUserOne;

                const hasRated =
                  (exchange.idUserOne === user.idUser &&
                    exchange.ratedByUserOne) ||
                  (exchange.idUserTwo === user.idUser &&
                    exchange.ratedByUserTwo);

                if (!hasRated) {
                  return (
                    <RatingModal
                      key={exchange.idExchange}
                      idUser={user.idUser}
                      idUserToRate={otherUserId} // Enviar el ID del usuario contrario
                      exchangeId={exchange.idExchange}
                    />
                  );
                }
                return null;
              })}
          </BrowserRouter>
        </ArticleProvider>
      </AuthProvider>
    </>
  );
}

// Componente para mostrar el footer solo si no estamos en la página de mensajes
function FooterWrapper() {
  const location = useLocation();
  return location.pathname !== "/Mensajes" ? <Footer /> : null;
}

export default App;
