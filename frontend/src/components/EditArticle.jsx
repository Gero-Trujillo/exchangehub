import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle } from "../api/articles";

// Lista de categorías disponibles
const categories = [
  "Tecnología",
  "Deportes",
  "Ropa",
  "Hogar",
  "Herramientas",
  "Accesorios",
];

const EditArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    name: "",
    description: "",
    category: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalArticle, setOriginalArticle] = useState({
    name: "",
    description: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleById(articleId);
        if (fetchedArticle) {
          setArticle({
            name: fetchedArticle.name || "",
            description: fetchedArticle.description || "",
            category: fetchedArticle.category || "",
            images: fetchedArticle.images || [],
          });
          setOriginalArticle({
            name: fetchedArticle.name || "",
            description: fetchedArticle.description || "",
            category: fetchedArticle.category || "",
            images: fetchedArticle.images || [],
          });
        } else {
          console.error("Article not found");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Si no se seleccionan nuevas imágenes, mantener las originales
      if (article.images.length === 0) {
        article.images = originalArticle.images;
      }
      // Verificar que los valores no sean null
      if (!article.name || !article.description || !article.category) {
        throw new Error("Todos los campos son obligatorios");
      }
      await updateArticle(articleId, article);
      navigate("/MyProducts");
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md m-10">
      <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold mb-6">
        Editar Artículo
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-emerald-600 dark:text-emerald-300 mb-1"
          >
            Nombre del artículo:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={article.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 bg-neutral-100 text-zinc-800 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-700 dark:text-white"
            required
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="description"
            className="block text-emerald-600 dark:text-emerald-300 mb-1"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={article.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 bg-neutral-100 text-zinc-800 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-700 dark:text-white"
            required
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="category"
            className="block text-emerald-600 dark:text-emerald-300 mb-1"
          >
            Categoría:
          </label>
          <select
            id="category"
            name="category"
            value={article.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 bg-neutral-100 text-zinc-800 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-700 dark:text-white"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label
            htmlFor="images"
            className="block text-emerald-600 dark:text-emerald-300 mb-1"
          >
            Imágenes del artículo:
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900 dark:file:text-emerald-300"
            multiple
          />
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <button
            type="submit"
            onClick={() => navigate("/Perfil")}
            className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-red-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-red-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-red-600 hover:text-red-300 dark:bg-zinc-900 dark:border-red-300 dark:before:bg-red-300 dark:text-red-300 dark:hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
