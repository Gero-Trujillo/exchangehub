import { useArticle } from "../context/ArticleContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

function YourProducts({ id }) {
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


  useEffect(() => {
    getArticlesOfUser(id);
  }, [id]);

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
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-100 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        <div className="flex flex-col gap-4 md:flex-row items-center justify-evenly">
          <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">
            Articulos
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-scroll">
          {articles.length === 0 && (
            <h1 className="text-center text-4xl text-neutral-200 dark:text-emerald-300 font-semibold">
              Este usuario no tiene artículos
            </h1>
          )}
          {articles.map((article) => (
            <ProductCard
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

export default YourProducts;
