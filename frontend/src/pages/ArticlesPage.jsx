import React from "react";
import OptionsArticles from "../components/OptionsArticles";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useArticle } from "../context/ArticleContext.jsx";
function ArticlesPage() {
  const {getAllArticles, articles, getArticlesImages, articleImgs} = useArticle();
  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4 m-2 p-2 bg-neutral-100 dark:bg-zinc-900 rounded-xl md:m-4 lg:m-6 md:p-4 lg:p-6 md:gap-8 lg:gap-12 min-h-screen">
        <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-bold">
          Todos los articulos
        </h1>
        <OptionsArticles />
        <div className="w-full flex flex-wrap justify-center gap-2 md:gap-6 lg:gap-8">
          {articles.map((article) => (
            <ProductCard
              key={article.idArticle}
              idArticle={article.idArticle}
              name={article.name}
              user={article.idOwner}
              description={article.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ArticlesPage;
