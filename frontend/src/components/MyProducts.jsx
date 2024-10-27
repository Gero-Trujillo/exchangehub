import { useArticle } from "../context/ArticleContext";
import { useAuth } from "../context/AuthContext";
import CreateArticle from "./CreateArticle";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

function MyProducts() {
  const { user } = useAuth();
  const [showAddArt, setShowAddArt] = useState(false);
  const { getArticlesOfUser, articles } = useArticle();

  const handleShowAddArt = () => setShowAddArt(!showAddArt);

  useEffect(() => {
    getArticlesOfUser(user.idUser);
  }, []);

  return (
    <>
      {showAddArt && <CreateArticle showAddArt={setShowAddArt} />}
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-100 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        <div className="flex items-center justify-evenly">
          <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">
            Mis productos
          </h1>
          <button className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600" onClick={handleShowAddArt}>
            Agregar nuevo
          </button>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-scroll">
          {articles.map((article) => (
            <ProductCard
              key={article.idArticle}
              name={article.name}
              user={article.idOwner}
              description={article.description}
              image={article.imageUrl}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default MyProducts;
