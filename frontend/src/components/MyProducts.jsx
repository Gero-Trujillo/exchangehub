import { getArticlesByUserId } from "../api/articles";
import { useState, useEffect } from "react";
import {useAuth} from '../context/AuthContext'
import ProductCard from "./ProductCard";

function MyProducts() {
  const {user} = useAuth();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getArticlesByUserId(user.idUser);
        console.log(res);
        setArticles(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, []);
  return (
    <>
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-100 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">
          Mis productos
        </h1>
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
