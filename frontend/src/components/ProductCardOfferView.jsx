import { useState, useEffect } from "react";
import { useArticleStore } from "../store/useArticleStore";

function ProductCardOfferView(props) {
  const { idArticle, name, user, description, images } = props;
  const [mainImage, setMainImage] = useState(null);
  const { articleToGive, setArticleToGive } = useArticleStore();

  useEffect(() => {
    if (images && images.length > 0) {
      const mainImageFind = images.find((img) => img.is_main);
      setMainImage(mainImageFind || images[0]);
    }
  }, [images]);

  const handleSelect = () => {
    setArticleToGive({
      idArticle,
      name,
      user,
      description,
      images,
    });
  };

  return (
    <div className="card bg-neutral-100 dark:bg-zinc-800 w-96 shadow-xl">
      <figure className="h-60">
        <img src={mainImage ? mainImage.url : ""} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-emerald-600 dark:text-emerald-300">
          {name}
        </h2>
        <p>{description}</p>
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
