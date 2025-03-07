import { useEffect, useState } from "react";
import "./ProductCard.css";
import { RxCrossCircled } from "react-icons/rx";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useArticle } from "../context/ArticleContext";
import { useChatStore } from "../store/useChatStore";
import { useArticleStore } from "../store/useArticleStore";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from '../api/articles'
function ProductCard(props) {
  const { getArticlesImages, articleImgs } = useArticle();
  const { name, user, description, images, idArticle, ownerName } = props;
  const [product, setProduct] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const { setSelectedUser, getUser } = useChatStore();
  const { setArticleToOffer } = useArticleStore();
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDeleteProduct = () => {
    deleteArticle(idArticle)
     .then(() => {
        window.location.reload()
        alert('Producto eliminado con exito')
      })
     .catch((error) => {
        console.error('Error en borrar el producto:', error);
        alert('A ocurrido un error borrando el producto')
      });
    
  }

  useEffect(() => {
    if (images && images.length > 0) {
      const mainImageFind = images.find((img) => img.is_main);
      setMainImage(mainImageFind || images[0]);
      const index = images.findIndex((img) => img.is_main);
      setCurrentImageIndex(index);
    }
  }, [images]);

  const handleProduct = () => {
    setProduct(!product);
  };

  return (
    <>
      {product && (
        <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000dd] z-50">
          <div className="flex flex-col gap-2 dark:text-white max-w-lg w-5/6 bg-white dark:bg-zinc-900 p-5 rounded-xl mt-8 shadow-md hover:duration-150 duration-150">
            <button className="w-full flex items-center justify-center text-4xl text-emerald-600 dark:text-emerald-300">
              <span onClick={handleProduct}>
                <RxCrossCircled />
              </span>
            </button>
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

                <div className="text-xs">
                  <div className="flex flex-row">
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-emerald-600 dark:bg-emerald-300"
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-emerald-600 dark:bg-emerald-300"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-emerald-600 dark:bg-emerald-300"
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-emerald-600 dark:bg-emerald-300"
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-emerald-600 dark:bg-emerald-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

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

            <div className="w-full flex flex-row gap-2">
              <button className="btn btn-outline btn-info">Editar articulo</button>
              <button className="btn btn-outline btn-error" onClick={handleDeleteProduct}>Eliminar articulo</button>
            </div>
          </div>
        </section>
      )}
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
            Ver mas
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
