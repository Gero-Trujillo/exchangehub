import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useArticleStore } from "../store/useArticleStore";

function OfertarPage() {
  const { articleToOffer: article, articleToGive } = useArticleStore();
  const [articlesImages, setArticlesImages] = useState([]);

  return (
    <>
      <section className="min-h-[60vh] flex flex-col justify-center items-center gap-20 p-20 bg-neutral-100 dark:bg-zinc-800 m-10 rounded-xl">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">
          Centro de administración de ofertas
        </h1>
        <div className="flex w-full flex-col lg:flex-row">
          {article ? (
            <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10">
              <ProductCard
                key={article.idArticle}
                idArticle={article.idArticle}
                name={article.name}
                user={article.user}
                description={article.description}
                images={article.images}
              />
            </div>
          ) : (
            <div className="card bg-neutral-200 dark:bg-zinc-700 rounded-box grid h-auto flex-grow place-items-center">
              Ningun articulo seleccionado
            </div>
          )}

          <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
            <TbArrowsExchange2 />
          </div>
          {article ? (
            <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10">
              <ProductCard
                key={article.idArticle}
                idArticle={article.idArticle}
                name={article.name}
                user={article.user}
                description={article.description}
                images={article.images}
              />
            </div>
          ) : (
            <div className="card bg-neutral-200 dark:bg-zinc-700 rounded-box grid h-32 flex-grow place-items-center">
              Selecciona un articulo para ofertar
            </div>
          )}
        </div>
        <button className="btn btn-outline border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-300 dark:text-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-zinc-950">
          Enviar oferta
        </button>
      </section>
    </>
  );
}

export default OfertarPage;
