import { useArticle } from "../context/ArticleContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

function YourProducts({ id }) {
  // Extraemos el usuario autenticado desde el contexto de autenticación
  const { user } = useAuth();

  // Estado para controlar la visibilidad del modal para agregar artículos
  const [showAddArt, setShowAddArt] = useState(false);

  // Estado para almacenar las imágenes de los artículos
  const [articlesImages, setArticlesImages] = useState([]);

  // Extraemos funciones y datos del contexto de artículos
  const {
    getAllArticles, // Función para obtener todos los artículos
    articles, // Lista de artículos
    getArticlesImages, // Función para obtener las imágenes de un artículo
    articleImgs, // Imágenes de los artículos
    getArticlesOfUser, // Función para obtener los artículos de un usuario específico
  } = useArticle();

  // Efecto para obtener los artículos del usuario al montar el componente o cuando cambia el ID
  useEffect(() => {
    getArticlesOfUser(id); // Llama a la función para obtener los artículos del usuario
  }, [id]);

  // Efecto para obtener las imágenes de los artículos cuando la lista de artículos cambia
  useEffect(() => {
    // Función para obtener las imágenes de los artículos
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

  return (
    <>
      {/* Contenedor principal del componente */}
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-100 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        {/* Encabezado de la sección */}
        <div className="flex flex-col gap-4 md:flex-row items-center justify-evenly">
          <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">
            Articulos
          </h1>
        </div>

        {/* Contenedor de los artículos */}
        <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-scroll">
          {/* Mensaje cuando no hay artículos disponibles */}
          {articles.length === 0 && (
            <h1 className="text-center text-4xl text-neutral-200 dark:text-emerald-300 font-semibold">
              Este usuario no tiene artículos
            </h1>
          )}

          {/* Renderiza una tarjeta para cada artículo */}
          {articles.map((article) => (
            <ProductCard
              key={article.idArticle} // Clave única para cada tarjeta
              idArticle={article.idArticle} // ID del artículo
              name={article.name} // Nombre del artículo
              user={article.idOwner} // ID del propietario del artículo
              description={article.description} // Descripción del artículo
              images={articlesImages[article.idArticle]} // Imágenes asociadas al artículo
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default YourProducts;
