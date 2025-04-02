import { useState, useEffect } from "react";
import ProductCardOnlyInfo from "../components/ProductCardOnlyInfo";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useArticleStore } from "../store/useArticleStore";
import { useAuth } from "../context/AuthContext";
import { useArticle } from "../context/ArticleContext";
import { useChatStore } from "../store/useChatStore";
import ProductCardOfferView from "../components/ProductCardOfferView";
import { Link, useNavigate } from "react-router-dom";
import { createExchange, sendNotificationEmail } from "../api/exchanges.js";

function OfertarPage() {
  // Extraemos los artículos seleccionados desde el store de artículos
  const { articleToOffer: article, articleToGive } = useArticleStore();

  // Estado para almacenar las imágenes de los artículos
  const [articlesImages, setArticlesImages] = useState([]);

  // Extraemos el usuario autenticado desde el contexto de autenticación
  const { user } = useAuth();

  // Extraemos funciones y datos del contexto de artículos
  const {
    getAllArticles, // Función para obtener todos los artículos
    articles, // Lista de artículos
    getArticlesImages, // Función para obtener las imágenes de un artículo
    articleImgs, // Imágenes de los artículos
    getArticlesOfUser, // Función para obtener los artículos de un usuario específico
  } = useArticle();

  // Extraemos funciones y datos del store de chat
  const { selectedUser, addMessage, sendMessage, getUser } = useChatStore();

  // Hook para redireccionar a otras rutas
  const navigate = useNavigate();

  // Efecto para obtener los artículos del usuario al montar el componente
  useEffect(() => {
    getArticlesOfUser(user.idUser); // Llama a la función para obtener los artículos del usuario
  }, []);

  // Efecto para obtener las imágenes de los artículos cuando cambia la lista de artículos
  useEffect(() => {
    const fetchArticlesImages = async () => {
      try {
        const images = {}; // Objeto para almacenar las imágenes por ID de artículo
        for (const article of articles) {
          const articleImages = await getArticlesImages(article.idArticle); // Obtiene las imágenes del artículo
          images[article.idArticle] = articleImages; // Asocia las imágenes al ID del artículo
        }

        setArticlesImages(images); // Actualiza el estado con las imágenes obtenidas
      } catch (error) {
        console.error("Error fetching article images:", error); // Manejo de errores
      }
    };

    if (articles.length > 0) {
      fetchArticlesImages(); // Llama a la función si hay artículos disponibles
    }
  }, [articles]);

  // Función para manejar el envío de un mensaje especial con la oferta
  const handleSendSpecialMessage = async () => {
    if (!article || !articleToGive) return;

    // Encontrar la imagen principal del artículo
    let mainImage = "";
    for (const image of article.images) {
      if (image.is_main) {
        mainImage = image.url;
      }
    }

    const offerDetails = {
      articleToOffer: article, // Artículo ofrecido
      articleToGive: articleToGive, // Artículo solicitado
    };

    // Detalles del intercambio
    const exchangeDetails = {
      idUserOne: article.user, // ID del usuario que ofrece
      idProductoOne: article.idArticle, // ID del artículo ofrecido
      idUserTwo: articleToGive.user, // ID del usuario que recibe la oferta
      idProductoTwo: articleToGive.idArticle, // ID del artículo solicitado
      status: "pendiente", // Estado inicial del intercambio
    };

    try {
      await createExchange(exchangeDetails); // Crea el intercambio en la base de datos
    } catch (error) {
      console.error("Error creating exchange:", error); // Manejo de errores
    }

    // Agregar el mensaje especial al chat
    addMessage({
      text: "¡Hola! Tengo una oferta para ti",
      image: mainImage,
      idSender: user.idUser,
      sentAt: new Date().toISOString(),
      isSpecial: true,
      offerDetails,
    });

    // Enviar el mensaje al usuario seleccionado
    await sendMessage(
      {
        text: "¡Hola! Tengo una oferta para ti",
        image: mainImage,
        sentAt: new Date().toISOString(),
        isSpecial: true,
        offerDetails,
      },
      user.idUser
    );

    // Enviar notificación por correo al usuario seleccionado
    const notificationData = {
      email: selectedUser.email,
    };

    try {
      await sendNotificationEmail(notificationData); // Llama a la API para enviar el correo
    } catch (error) {
      console.error("Error sending notification email:", error); // Manejo de errores
    }

    // Navegar a la página de mensajes
    getUser(selectedUser.idUser);
    navigate("/Mensajes");
  };

  return (
    <>
      {/* Contenedor principal de la página */}
      <section
        data-aos="fade-left"
        className="min-h-[60vh] flex flex-col justify-center items-center gap-20 p-20 bg-neutral-100 dark:bg-zinc-800 m-10 rounded-xl"
      >
        {/* Título de la página */}
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">
          Centro de administración de ofertas
        </h1>

        {/* Contenedor de los artículos seleccionados */}
        <div className="flex w-full flex-col lg:flex-row">
          {/* Artículo ofrecido */}
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
              Selecciona uno de la sección artículos
            </div>
          )}

          {/* Icono de intercambio */}
          <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
            <TbArrowsExchange2 />
          </div>

          {/* Artículo solicitado */}
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
              <button
                className="btn btn-active btn-ghost"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Cambiar elección
              </button>
            </div>
          ) : (
            <div
              className="card bg-neutral-200 dark:bg-zinc-700 rounded-box grid h-32 flex-grow place-items-center cursor-pointer"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              <p>Selecciona uno de tus artículos para ofertar</p>
            </div>
          )}
        </div>

        {/* Botón para enviar la oferta */}
        <button
          className="btn btn-outline border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-300 dark:text-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-zinc-950"
          onClick={handleSendSpecialMessage}
        >
          Enviar oferta
        </button>

        {/* Modal para seleccionar un artículo */}
        <dialog id="my_modal_4" className="modal backdrop-blur-sm">
          <div className="modal-box w-11/12 max-w-5xl bg-neutral-100 dark:bg-zinc-800 flex flex-col gap-4">
            <h3 className="font-bold text-lg">
              Selecciona uno de tus productos
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Renderiza las tarjetas de los artículos del usuario */}
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
                {/* Botón para cerrar el modal */}
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
