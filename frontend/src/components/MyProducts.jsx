import { useArticle } from "../context/ArticleContext";
import { useAuth } from "../context/AuthContext";
import CreateArticle from "./CreateArticle";
import MyProductCard from "./MyProductCard";
import { useState, useEffect } from "react";

function MyProducts() {
  const { user } = useAuth();
  const [showAddArt, setShowAddArt] = useState(false);
  const [articlesImages, setArticlesImages] = useState([]);
  const {
    getAllArticles,
    articles,
    getArticlesImages,
    articleImgs,
    getArticlesOfUser,
  } = useArticle();

  const handleShowAddArt = () => setShowAddArt(!showAddArt);

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

  return (
    <>
      {showAddArt && <CreateArticle showAddArt={setShowAddArt} />}
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-100 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        <div className="flex flex-col gap-4 md:flex-row items-center justify-evenly">
          <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">
            Mis productos
          </h1>
          <button
            className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600"
            onClick={handleShowAddArt}
          >
            Agregar nuevo
          </button>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-scroll">
          {articles.length === 0 && (
            <h1 className="text-center text-4xl text-neutral-200 dark:text-emerald-300 font-semibold">
              No tienes productos
            </h1>
          )}
          {articles.map((article) => (
            <MyProductCard
              key={article.idArticle}
              idArticle={article.idArticle}
              name={article.name}
              user={article.idOwner}
              description={article.description}
              images={articlesImages[article.idArticle]}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default MyProducts;
