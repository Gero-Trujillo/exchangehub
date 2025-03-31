import React, { useEffect, useState } from "react";
import AdvantagesHome from "../components/AdvantagesHome";
import ProductCard from "../components/ProductCard";
import Button1 from "../components/Button1";
import { useArticle } from "../context/ArticleContext.jsx";
import AdSubscription from "../components/AdSubscription.jsx";
import StatsHome from "../components/StatsHome.jsx";
import MembersGroup from "../components/MembersGroup.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useChatStore } from "../store/useChatStore.js";

function HomePage() {
  // Extraemos funciones y datos del contexto de artículos
  const { getAllArticles, articles, getArticlesImages, articleImgs } =
    useArticle();

  // Extraemos funciones y datos del store de chat
  const { getUser, selectedUser, setSelectedUser } = useChatStore();

  // Estado para almacenar las imágenes de los artículos
  const [articlesImages, setArticlesImages] = useState([]);

  // Estado para almacenar los usuarios premium
  const [premiumUsers, setPremiumUsers] = useState({});

  // Efecto para obtener todos los artículos al montar el componente
  useEffect(() => {
    getAllArticles(); // Llama a la función para obtener todos los artículos
  }, []);

  // Efecto para obtener las imágenes de los artículos cuando cambia la lista de artículos
  useEffect(() => {
    const fetchArticlesImages = async () => {
      try {
        const images = {}; // Objeto para almacenar las imágenes por ID de artículo
        for (const article of articles) {
          const articleImages = await getArticlesImages(article.idArticle); // Obtiene las imágenes del artículo
          images[article.idArticle] = articleImages; // Asocia las imágenes al ID del artículo
        }

        setArticlesImages(images); // Actualiza el estado con las imágenes obtenidas
      } catch (error) {
        console.error("Error fetching article images:", error); // Manejo de errores
      }
    };

    if (articles.length > 0) {
      fetchArticlesImages(); // Llama a la función si hay artículos disponibles
    }
  }, [articles]);

  // Efecto para obtener los usuarios premium asociados a los artículos
  useEffect(() => {
    const fetchPremiumUsers = async () => {
      try {
        const users = {}; // Objeto para almacenar los usuarios premium por ID
        for (const article of articles) {
          const user = await getUser(article.idOwner); // Obtiene los datos del propietario del artículo
          setSelectedUser(null); // Limpia el usuario seleccionado
          if (user && user.isPremium) {
            users[article.idOwner] = user; // Almacena solo los usuarios premium
          }
        }

        setPremiumUsers(users); // Actualiza el estado con los usuarios premium obtenidos
      } catch (error) {
        console.error("Error fetching premium users:", error); // Manejo de errores
      }
    };

    if (articles.length > 0) {
      fetchPremiumUsers(); // Llama a la función si hay artículos disponibles
    }
  }, [articles]);

  // Efecto para inicializar las animaciones de AOS al montar el componente
  useEffect(() => {
    AOS.init({
      duration: 1500, // Duración de la animación en milisegundos
      once: false, // Permitir que la animación ocurra cada vez que el elemento entre en la vista
      mirror: true, // Permitir que la animación ocurra al hacer scroll hacia arriba
    });
  }, []);

  return (
    <>
      {/* Sección principal con el título y descripción de la página */}
      <section
        className="flex justify-center items-center min-h-full p-20 w-full max-w-full"
        data-aos="fade-up"
      >
        <div className="flex flex-col gap-2 max-w-full items-center justify-center md:justify-start md:items-start">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-wrap animate-fade-left text-zinc-900 dark:text-slate-100 text-center md:text-start">
            ¿Productos que no utilizas?
          </h1>
          <span className="text-emerald-600 animate-pulse animate-ease-in text-5xl md:text-6xl lg:text-8xl font-bold">
            Exchange<span className="text-emerald-300">Hub</span>
          </span>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-slate-100 text-center md:text-start">
            Encuentra productos que te interesen y cámbialos por los tuyos aquí
          </p>
          <Button1 />
        </div>
      </section>

      {/* Sección de los artículos más populares */}
      <section
        className="bg-neutral-100 dark:bg-zinc-900 m-10 rounded-lg p-10 h-auto flex flex-col justify-center items-center gap-10"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-300">
          Más populares
        </h1>
        <div className="flex flex-wrap gap-8 w-full justify-center">
          {/* Renderiza las tarjetas de los artículos cuyos propietarios son usuarios premium */}
          {articles.map((article) => {
            const user = premiumUsers[article.idOwner];
            if (user && user.isPremium) {
              return (
                <ProductCard
                  key={article.idArticle} // Clave única para cada tarjeta
                  idArticle={article.idArticle} // ID del artículo
                  name={article.name} // Nombre del artículo
                  user={article.idOwner} // ID del propietario del artículo
                  ownerName={article.ownerName} // Nombre del propietario
                  description={article.description} // Descripción del artículo
                  images={articlesImages[article.idArticle]} // Imágenes asociadas al artículo
                  data-aos="fade-up" // Animación al cargar
                />
              );
            }
            return null; // No renderiza si el propietario no es premium
          })}
        </div>
      </section>

      {/* Sección de suscripción premium */}
      <AdSubscription />

      {/* Sección de estadísticas */}
      <StatsHome />

      {/* Sección de miembros destacados */}
      <MembersGroup />

      {/* Sección de ventajas de la plataforma */}
      <AdvantagesHome />

      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </>
  );
}

export default HomePage;
