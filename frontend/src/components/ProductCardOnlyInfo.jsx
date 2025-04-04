import { useEffect, useState } from "react";
import "./ProductCard.css";
import { RxCrossCircled } from "react-icons/rx";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useArticle } from "../context/ArticleContext";
import { useChatStore } from "../store/useChatStore";
import { useArticleStore } from "../store/useArticleStore";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  // Extraemos funciones y datos del contexto de artículos
  const { getArticlesImages, articleImgs } = useArticle();

  // Desestructuramos las propiedades recibidas como props
  const { name, user, description, images, idArticle, ownerName } = props;

  // Estado para controlar la visibilidad del modal del producto
  const [product, setProduct] = useState(false);

  // Estado para almacenar la imagen principal del producto
  const [mainImage, setMainImage] = useState(null);

  // Extraemos funciones de los stores de chat y artículos
  const { setSelectedUser, getUser } = useChatStore();
  const { setArticleToOffer } = useArticleStore();

  // Hook para redireccionar a otras rutas
  const navigate = useNavigate();

  // Estado para manejar el índice de la imagen actual en el carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para manejar el clic en el botón de imagen anterior en el carrusel
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Función para manejar el clic en el botón de imagen siguiente en el carrusel
  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Efecto para establecer la imagen principal al cargar las imágenes
  useEffect(() => {
    if (images && images.length > 0) {
      const mainImageFind = images.find((img) => img.is_main); // Busca la imagen principal
      setMainImage(mainImageFind || images[0]); // Si no hay imagen principal, usa la primera
      const index = images.findIndex((img) => img.is_main); // Encuentra el índice de la imagen principal
      setCurrentImageIndex(index);
    }
  }, [images]);

  // Función para alternar la visibilidad del modal del producto
  const handleProduct = () => {
    setProduct(!product);
  };

  return (
    <>
      {/* Modal del producto, visible solo si el estado "product" es true */}
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
              {/* Encabezado con el nombre del producto */}
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row justify-between w-full items-center">
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                    {name}
                  </h3>
                  <div className="flex flex-col items-end gap-2">
                    {/* Calificación del producto */}
                    <div className="text-xs">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-emerald-600 dark:text-emerald-300 text-lg font-bold">
                          4.6
                        </p>
                        <div className="rating">
                          <input className="mask mask-star-2 bg-emerald-600 dark:bg-emerald-300" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-300">{ownerName}</p>
                  </div>
                </div>
              </div>

              {/* Descripción del producto */}
              <div className="flex flex-row justify-between w-full gap-2">
                <p className="text-md">{description}</p>
              </div>

              {/* Carrusel de imágenes del producto */}
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
          </div>
        </section>
      )}

      {/* Tarjeta del producto */}
      <div className="w-60 h-80 bg-white dark:bg-zinc-950 flex flex-col gap-1 rounded-br-3xl">
        {/* Imagen principal del producto */}
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

        {/* Información del producto */}
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col w-4/5">
              <span className="text-xl text-emerald-600 font-bold truncate overflow-hidden whitespace-nowrap">
                {name}
              </span>
              <p className="text-xs text-gray-400">{ownerName}</p>
            </div>
          </div>

          {/* Botón para abrir el modal del producto */}
          <button
            className="hover:bg-emerald-700 text-gray-50 bg-emerald-600 py-2 rounded-br-xl dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-400"
            onClick={handleProduct}
          >
            Ver mas
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
