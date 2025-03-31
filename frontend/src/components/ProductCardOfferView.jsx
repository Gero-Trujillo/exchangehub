import { useState, useEffect } from "react";
import { useArticleStore } from "../store/useArticleStore";

function ProductCardOfferView(props) {
  // Desestructuramos las propiedades recibidas como props
  const { idArticle, name, user, description, images, ownerName } = props;

  // Estado local para almacenar la imagen principal del producto
  const [mainImage, setMainImage] = useState(null);

  // Extraemos el estado y la función para establecer el artículo seleccionado desde el store
  const { articleToGive, setArticleToGive } = useArticleStore();

  // Efecto para establecer la imagen principal del producto al cargar las imágenes
  useEffect(() => {
    if (images && images.length > 0) {
      const mainImageFind = images.find((img) => img.is_main); // Busca la imagen principal
      setMainImage(mainImageFind || images[0]); // Si no hay imagen principal, usa la primera
    }
  }, [images]);

  // Función para manejar la selección del producto
  const handleSelect = () => {
    // Establece el artículo seleccionado en el store
    setArticleToGive({
      idArticle,
      name,
      user,
      ownerName,
      description,
      images,
    });
  };

  return (
    <div className="card bg-neutral-100 dark:bg-zinc-800 w-96 shadow-xl">
      {/* Contenedor de la imagen principal del producto */}
      <figure className="h-60">
        <img src={mainImage ? mainImage.url : ""} alt="Shoes" />
      </figure>
      <div className="card-body">
        {/* Título del producto */}
        <h2 className="card-title text-emerald-600 dark:text-emerald-300">
          {name}
        </h2>
        {/* Descripción del producto */}
        <p>{description}</p>
        {/* Botón para seleccionar el producto */}
        <div className="card-actions justify-end modal-action">
          <form method="dialog">
            <button
              className="btn bg-neutral-200 border-neutral-200 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white text-zinc-500 dark:text-zinc-300 dark:bg-zinc-700 dark:border-zinc-700 dark:hover:bg-emerald-300 dark:hover:border-emerald-300 dark:hover:text-zinc-950"
              onClick={handleSelect}
            >
              Seleccionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCardOfferView;
