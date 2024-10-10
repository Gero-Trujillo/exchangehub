import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/Inicio" element={<HomePage />} />
          <Route path="/Perfil" element={<ProfilePage />} />
          <Route path="/Mensajes" element />
          <Route path="/Productos" element/>
          <Route path="/Settings" element />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
