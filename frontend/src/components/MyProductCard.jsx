import { useEffect, useState } from "react"; // Importa hooks de React para manejar estados y efectos
import "./ProductCard.css"; // Importa los estilos específicos para la tarjeta de producto
import { RxCrossCircled } from "react-icons/rx"; // Importa el ícono de cerrar
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"; // Importa íconos de flechas para navegación
import { useArticle } from "../context/ArticleContext"; // Importa el contexto de artículos
import { useChatStore } from "../store/useChatStore"; // Importa el estado global del chat
import { useArticleStore } from "../store/useArticleStore"; // Importa el estado global de artículos
import { useNavigate } from "react-router-dom"; // Importa el hook para navegación
import { deleteArticle } from "../api/articles"; // Importa la función para eliminar artículos
import EditArticle from "./EditArticle"; // Importa el componente para editar artículos

/**
 * Componente `MyProductCard` para mostrar información de un producto del usuario.
 * Incluye opciones para ver más detalles, editar o eliminar el producto.
 * @param {Object} props - Propiedades del componente.
 */
function MyProductCard(props) {
  const { getArticlesImages, articleImgs } = useArticle(); // Obtiene funciones relacionadas con imágenes de artículos
  const { name, user, description, images, idArticle, ownerName } = props; // Desestructura las propiedades del producto
  const [product, setProduct] = useState(false); // Estado para mostrar/ocultar los detalles del producto
  const [mainImage, setMainImage] = useState(null); // Imagen principal del producto
  const { setSelectedUser, getUser } = useChatStore(); // Funciones relacionadas con el chat
  const { setArticleToOffer } = useArticleStore(); // Función para establecer el artículo en una oferta
  const [showAddArt, setShowAddArt] = useState(false); // Estado para mostrar/ocultar el modal de edición
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual en el carrusel

  // Cambia a la imagen anterior en el carrusel
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Cambia a la siguiente imagen en el carrusel
  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Maneja la eliminación del producto
  const handleDeleteProduct = () => {
    deleteArticle(idArticle)
      .then(() => {
        window.location.reload(); // Recarga la página después de eliminar el producto
        alert("Producto eliminado con éxito"); // Muestra un mensaje de éxito
      })
      .catch((error) => {
        console.error("Error en borrar el producto:", error); // Registra el error en la consola
        alert("Ha ocurrido un error borrando el producto"); // Muestra un mensaje de error
      });
  };

  // Configura la imagen principal y el índice inicial al cargar las imágenes
  useEffect(() => {
    if (images && images.length > 0) {
      const mainImageFind = images.find((img) => img.is_main); // Busca la imagen principal
      setMainImage(mainImageFind || images[0]); // Establece la imagen principal o la primera imagen
      const index = images.findIndex((img) => img.is_main); // Obtiene el índice de la imagen principal
      setCurrentImageIndex(index);
    }
  }, [images]);

  // Alterna la visibilidad de los detalles del producto
  const handleProduct = () => {
    setProduct(!product);
  };

  // Alterna la visibilidad del modal de edición
  const handleShowAddArt = () => {
    setShowAddArt(!showAddArt);
    handleProduct();
  };

  return (
    <>
      {/* Modal para editar el artículo */}
      {showAddArt && (
        <EditArticle showAddArt={setShowAddArt} idArticle={idArticle} />
      )}

      {/* Modal para mostrar los detalles del producto */}
      {product && (
        <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000dd] z-50">
          <div className="flex flex-col gap-2 dark:text-white max-w-lg w-5/6 bg-white dark:bg-zinc-900 p-5 rounded-xl mt-8 shadow-md hover:duration-150 duration-150">
            {/* Botón para cerrar el modal */}
            <button className="w-full flex items-center justify-center text-4xl text-emerald-600 dark:text-emerald-300">
              <span onClick={handleProduct}>
                <RxCrossCircled />
              </span>
            </button>

            {/* Contenido del modal */}
            <div className="flex flex-col gap-2 md:flex-col-reverse">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row justify-between w-full items-center">
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                    {name}
                  </h3>
                  <p className="text-xs text-emerald-300">{ownerName}</p>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full gap-2">
                <p className="text-md">{description}</p>
              </div>

              {/* Carrusel de imágenes */}
              <div className="relative h-96">
                <img
                  src={images[currentImageIndex]?.url}
                  alt={`Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  onClick={handlePrevClick}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-neutral-300 hover:scale-110"
                >
                  <RiArrowLeftSLine />
                </button>
                <button
                  onClick={handleNextClick}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-neutral-300 hover:scale-110"
                >
                  <RiArrowRightSLine />
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="w-full flex flex-row gap-2">
              <button
                className="btn btn-outline btn-info"
                onClick={handleShowAddArt}
              >
                Editar artículo
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={handleDeleteProduct}
              >
                Eliminar artículo
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tarjeta del producto */}
      <div className="w-60 h-80 bg-white dark:bg-zinc-950 flex flex-col gap-1 rounded-br-3xl">
        {images && images.length > 0 ? (
          <div
            className="duration-500 h-48"
            style={{
              backgroundImage: `url(${mainImage?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            Cargando...
          </div>
        )}
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col w-4/5">
              <span className="text-xl text-emerald-600 font-bold truncate overflow-hidden whitespace-nowrap">
                {name}
              </span>
              <p className="text-xs text-gray-400">{ownerName}</p>
            </div>
          </div>
          <button
            className="hover:bg-emerald-700 text-gray-50 bg-emerald-600 py-2 rounded-br-xl dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-400"
            onClick={handleProduct}
          >
            Ver más
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProductCard; // Exporta el componente para su uso en otras partes de la aplicación
