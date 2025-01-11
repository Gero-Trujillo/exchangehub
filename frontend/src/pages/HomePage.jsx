import AdvantagesHome from "../components/AdvantagesHome";
import ProductCard from "../components/ProductCard";
import Button1 from "../components/Button1";
import { useEffect, useState } from "react";
import { useArticle } from "../context/ArticleContext.jsx";
import AdSuscription from "../components/AdSuscription.jsx";
import StatsHome from "../components/StatsHome.jsx";
import MembersGroup from "../components/MembersGroup.jsx";
function HomePage() {
  const { getAllArticles, articles, getArticlesImages, articleImgs } =
    useArticle();

  const [articlesImages, setArticlesImages] = useState([]);

  useEffect(() => {
    getAllArticles();
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
      <section className="flex justify-center items-center min-h-full p-20 w-full max-w-full">
        <div className="flex flex-col gap-2 max-w-full items-center justify-center md:justify-start md:items-start">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-wrap animate-fade-left dark:text-slate-100 text-center md:text-start">
            Productos que no utilizas?
          </h1>
          <span className="text-emerald-600 animate-pulse animate-ease-in text-5xl md:text-6xl lg:text-8xl font-bold">
            Exchange<span className="text-emerald-300">Hub</span>
          </span>
          <p className="text-xl md:text-2xl dark:text-slate-100 text-center md:text-start">
            Encuentra productos que te interesen y cambialos por los tuyos aquí
          </p>
          <Button1 />
        </div>
      </section>
      <section className="bg-neutral-100 dark:bg-zinc-900 m-10 rounded-lg p-10 h-auto flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-300">
          Mas populares
        </h1>
        <div className="flex flex-wrap gap-8 w-full justify-center">
          {articles.map((article) => {
            return (
              <ProductCard
                key={article.idArticle}
                idArticle={article.idArticle}
                name={article.name}
                user={article.idOwner}
                description={article.description}
                images={articlesImages[article.idArticle]}
              />
            );
          })}
        </div>
      </section>
      <AdSuscription />
      <StatsHome />
      <MembersGroup />
      <AdvantagesHome />
    </>
  );
}

export default HomePage;
