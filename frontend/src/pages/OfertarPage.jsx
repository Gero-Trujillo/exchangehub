import { useState, useEffect } from "react";
import ProductCardOnlyInfo from "../components/ProductCardOnlyInfo";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useArticleStore } from "../store/useArticleStore";
import { useAuth } from "../context/AuthContext";
import { useArticle } from "../context/ArticleContext";
import ProductCardOfferView from "../components/ProductCardOfferView";

function OfertarPage() {
  const { articleToOffer: article, articleToGive } = useArticleStore();
  const [articlesImages, setArticlesImages] = useState([]);
  const { user } = useAuth();
  const {
    getAllArticles,
    articles,
    getArticlesImages,
    articleImgs,
    getArticlesOfUser,
  } = useArticle();

  useEffect(() => {
    getArticlesOfUser(user.idUser);
  }, []);

  useEffect(() => {
    // Función para obtener las imágenes de los artículos
    const fetchArticlesImages = async () => {
      try {
        const images = {};
        for (const article of articles) {
          const articleImages = await getArticlesImages(article.idArticle);
          images[article.idArticle] = articleImages;
        }
       
        setArticlesImages(images);
      } catch (error) {
        console.error("Error fetching article images:", error);
      }
    };

    if (articles.length > 0) {
      fetchArticlesImages();
    }
  }, [articles]);

  console.log(articleToGive)

  return (
    <>
      <section className="min-h-[60vh] flex flex-col justify-center items-center gap-20 p-20 bg-neutral-100 dark:bg-zinc-800 m-10 rounded-xl">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">
          Centro de administración de ofertas
        </h1>
        <div className="flex w-full flex-col lg:flex-row">
          {article ? (
            <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10">
              <ProductCardOnlyInfo
                key={article.idArticle}
                idArticle={article.idArticle}
                name={article.name}
                user={article.user}
                ownerName={article.ownerName}
                description={article.description}
                images={article.images}
              />
            </div>
          ) : (
            <div className="card bg-neutral-200 dark:bg-zinc-700 rounded-box grid h-auto flex-grow place-items-center text-wrap">
              Selecciona uno de la seccion articulos
            </div>
          )}

          <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
            <TbArrowsExchange2 />
          </div>
          {articleToGive ? (
            <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10 gap-4">
              <ProductCardOnlyInfo
                key={articleToGive.idArticle}
                idArticle={articleToGive.idArticle}
                name={articleToGive.name}
                user={articleToGive.user}
                ownerName={articleToGive.ownerName}
                description={articleToGive.description}
                images={articleToGive.images}
              />
              <button className="btn btn-active btn-ghost" onClick={() => document.getElementById("my_modal_4").showModal()}>Cambiar elección</button>
            </div>
          ) : (
            <div
              className="card bg-neutral-200 dark:bg-zinc-700 rounded-box grid h-32 flex-grow place-items-center cursor-pointer"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              <p>Selecciona uno de tus articulos para ofertar</p>
            </div>
          )}
        </div>
        <button className="btn btn-outline border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-300 dark:text-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-zinc-950">
          Enviar oferta
        </button>

        <dialog id="my_modal_4" className="modal backdrop-blur-sm">
          <div className="modal-box w-11/12 max-w-5xl bg-neutral-100 dark:bg-zinc-800 flex flex-col gap-4">
            <h3 className="font-bold text-lg">
              Selecciona uno de tus productos
            </h3>
            <div className="flex flex-wrap gap-4">
              {articles.map((article) => (
                <ProductCardOfferView
                  key={article.idArticle}
                  idArticle={article.idArticle}
                  name={article.name}
                  ownerName={article.ownerName}
                  user={article.idOwner}
                  description={article.description}
                  images={articlesImages[article.idArticle]}
                />
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 dark:bg-emerald-300 dark:border-emerald-300 dark:text-zinc-950 dark:hover:bg-emerald-400 dark:hover:border-emerald-400">
                  Cerrar
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
}

export default OfertarPage;
