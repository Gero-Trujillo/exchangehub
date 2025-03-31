import React from "react";
import OptionsArticles from "../components/OptionsArticles";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useArticle } from "../context/ArticleContext.jsx";

function ArticlesPage() {
  // Extraemos funciones y datos del contexto de artículos
  const {
    getAllArticles, // Función para obtener todos los artículos
    articles, // Lista de todos los artículos
    getArticlesImages, // Función para obtener las imágenes de un artículo
    articleImgs, // Imágenes de los artículos
    articlesFound, // Artículos encontrados mediante búsqueda
    articlesCategory, // Artículos filtrados por categoría
  } = useArticle();

  // Estado para almacenar las imágenes de los artículos
  const [articlesImages, setArticlesImages] = useState([]);

  // Estado para almacenar los artículos filtrados combinados
  const [filteredArticles, setFilteredArticles] = useState([]);

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

  // Efecto para combinar los artículos encontrados y los filtrados por categoría
  useEffect(() => {
    const combinedArticles = [
      ...new Map(
        [...articlesFound, ...articlesCategory].map((article) => [
          article.idArticle,
          article,
        ])
      ).values(), // Combina los artículos eliminando duplicados por ID
    ];
    setFilteredArticles(combinedArticles); // Actualiza el estado con los artículos combinados
  }, [articlesFound, articlesCategory]);

  return (
    <>
      {/* Contenedor principal de la página con diseño responsivo */}
      <section
        data-aos="fade-left"
        className="flex flex-col gap-4 m-2 p-2 bg-neutral-100 dark:bg-zinc-900 rounded-xl md:m-4 lg:m-6 md:p-4 lg:p-6 md:gap-8 lg:gap-12 min-h-screen"
      >
        {/* Título de la página */}
        <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-bold">
          Todos los articulos
        </h1>

        {/* Componente de opciones para buscar y filtrar artículos */}
        <OptionsArticles />

        {/* Contenedor de las tarjetas de artículos */}
        <div className="w-full flex flex-wrap justify-center gap-2 md:gap-6 lg:gap-8">
          {/* Renderiza los artículos filtrados si existen, de lo contrario muestra todos los artículos */}
          {filteredArticles.length > 0
            ? filteredArticles.map((article) => {
                return (
                  <ProductCard
                    key={article.idArticle} // Clave única para cada tarjeta
                    idArticle={article.idArticle} // ID del artículo
                    name={article.name} // Nombre del artículo
                    user={article.idOwner} // ID del propietario del artículo
                    ownerName={article.ownerName} // Nombre del propietario
                    description={article.description} // Descripción del artículo
                    images={articlesImages[article.idArticle]} // Imágenes asociadas al artículo
                  />
                );
              })
            : articles.map((article) => {
                return (
                  <ProductCard
                    key={article.idArticle} // Clave única para cada tarjeta
                    idArticle={article.idArticle} // ID del artículo
                    name={article.name} // Nombre del artículo
                    user={article.idOwner} // ID del propietario del artículo
                    ownerName={article.ownerName} // Nombre del propietario
                    description={article.description} // Descripción del artículo
                    images={articlesImages[article.idArticle]} // Imágenes asociadas al artículo
                  />
                );
              })}
        </div>
      </section>
    </>
  );
}

export default ArticlesPage;
