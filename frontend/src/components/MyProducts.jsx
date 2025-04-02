import { useArticle } from "../context/ArticleContext"; // Importa el contexto de artículos
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import CreateArticle from "./CreateArticle"; // Importa el componente para crear un artículo
import MyProductCard from "./MyProductCard"; // Importa el componente para mostrar una tarjeta de producto
import { useState, useEffect } from "react"; // Importa hooks de React para manejar estados y efectos

/**
 * Componente `MyProducts` para mostrar los productos del usuario autenticado.
 * Permite agregar nuevos productos y ver los existentes.
 */
function MyProducts() {
  const { user } = useAuth(); // Obtiene el usuario autenticado desde el contexto
  const [showAddArt, setShowAddArt] = useState(false); // Estado para mostrar/ocultar el modal de creación de artículos
  const [articlesImages, setArticlesImages] = useState([]); // Estado para almacenar las imágenes de los artículos
  const {
    getAllArticles, // Función para obtener todos los artículos
    articles, // Lista de artículos
    getArticlesImages, // Función para obtener las imágenes de un artículo
    articleImgs, // Imágenes de los artículos
    getArticlesOfUser, // Función para obtener los artículos del usuario autenticado
  } = useArticle();

  // Alterna la visibilidad del modal de creación de artículos
  const handleShowAddArt = () => setShowAddArt(!showAddArt);

  // Obtiene los artículos del usuario al cargar el componente
  useEffect(() => {
    getArticlesOfUser(user.idUser); // Llama a la función para obtener los artículos del usuario
  }, []); // Se ejecuta solo una vez al montar el componente

  // Obtiene las imágenes de los artículos cuando cambian los artículos
  useEffect(() => {
    // Función para obtener las imágenes de los artículos
    const fetchArticlesImages = async () => {
      try {
        const images = {}; // Objeto para almacenar las imágenes de cada artículo
        for (const article of articles) {
          const articleImages = await getArticlesImages(article.idArticle); // Obtiene las imágenes del artículo
          images[article.idArticle] = articleImages; // Asocia las imágenes al ID del artículo
        }

        setArticlesImages(images); // Actualiza el estado con las imágenes de los artículos
      } catch (error) {
        console.error("Error fetching article images:", error); // Registra el error en la consola
      }
    };

    if (articles.length > 0) {
      fetchArticlesImages(); // Llama a la función si hay artículos disponibles
    }
  }, [articles]); // Se ejecuta cuando cambia la lista de artículos

  return (
    <>
      {/* Modal para crear un nuevo artículo */}
      {showAddArt && <CreateArticle showAddArt={setShowAddArt} />}

      {/* Contenedor principal */}
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-100 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        {/* Encabezado y botón para agregar un nuevo producto */}
        <div className="flex flex-col gap-4 md:flex-row items-center justify-evenly">
          <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">
            Mis productos
          </h1>
          <button
            className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600"
            onClick={handleShowAddArt} // Muestra el modal de creación de artículos
          >
            Agregar nuevo
          </button>
        </div>

        {/* Contenedor de las tarjetas de productos */}
        <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-scroll">
          {/* Mensaje si no hay productos */}
          {articles.length === 0 && (
            <h1 className="text-center text-4xl text-neutral-200 dark:text-emerald-300 font-semibold">
              No tienes productos
            </h1>
          )}

          {/* Muestra las tarjetas de productos */}
          {articles.map((article) => (
            <MyProductCard
              key={article.idArticle} // Clave única para cada tarjeta
              idArticle={article.idArticle} // ID del artículo
              name={article.name} // Nombre del artículo
              user={article.idOwner} // ID del propietario del artículo
              description={article.description} // Descripción del artículo
              images={articlesImages[article.idArticle]} // Imágenes del artículo
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default MyProducts; // Exporta el componente para su uso en otras partes de la aplicación
