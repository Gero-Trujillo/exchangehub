import { useAuth } from "../context/AuthContext";
import { TbArrowsExchange2 } from "react-icons/tb";
import ProductCardOnlyInfo from "./ProductCardOnlyInfo";
import {
  cancelExchange,
  getExchangesByArticles,
  updateExchangeStatus,
} from "../api/exchanges.js";
import { useChatStore } from "../store/useChatStore.js";

function SeeOffer({ offer, idMessage }) {
  // Extraemos el usuario autenticado desde el contexto de autenticación
  const { user } = useAuth();

  // Extraemos la función para actualizar el estado especial del mensaje desde el store de chat
  const { updateIsSpecialStatus } = useChatStore();

  // Función para manejar la cancelación de la oferta
  const handleCancelOffer = async () => {
    try {
      // Obtiene el intercambio relacionado con los artículos de la oferta
      const res = await getExchangesByArticles(
        offer.articleToOffer.idArticle,
        offer.articleToGive.idArticle
      );
      const exchange = res.data;

      // Cancela el intercambio y actualiza su estado a "cancelado"
      await cancelExchange(exchange.idExchange, "cancelado");

      // Actualiza el estado especial del mensaje y cierra el modal
      updateIsSpecialStatus(idMessage);
      document.getElementById("seeOfferModal").close();

      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.log(error); // Manejo de errores
    }
  };

  // Función para manejar la aceptación de la oferta
  const handleAcceptOffer = async () => {
    try {
      // Obtiene el intercambio relacionado con los artículos de la oferta
      const res = await getExchangesByArticles(
        offer.articleToOffer.idArticle,
        offer.articleToGive.idArticle
      );
      const exchange = res.data;

      // Actualiza el estado del intercambio a "aceptado"
      await updateExchangeStatus(exchange.idExchange, "aceptado");

      // Actualiza el estado especial del mensaje y cierra el modal
      updateIsSpecialStatus(idMessage);
      document.getElementById("seeOfferModal").close();

      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.log(error); // Manejo de errores
    }
  };

  // Función para manejar el rechazo de la oferta
  const handleRejectOffer = async () => {
    try {
      // Obtiene el intercambio relacionado con los artículos de la oferta
      const res = await getExchangesByArticles(
        offer.articleToOffer.idArticle,
        offer.articleToGive.idArticle
      );
      const exchange = res.data;

      // Actualiza el estado del intercambio a "rechazado"
      await updateExchangeStatus(exchange.idExchange, "rechazado");

      // Actualiza el estado especial del mensaje y cierra el modal
      updateIsSpecialStatus(idMessage);
      document.getElementById("seeOfferModal").close();

      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.log(error); // Manejo de errores
    }
  };

  return (
    <dialog id="seeOfferModal" className="modal backdrop-blur-sm">
      <div className="modal-box flex flex-col h-auto gap-4 max-w-5xl bg-neutral-100 dark:bg-zinc-800 p-20">
        <form method="dialog">
          {/* Botón para cerrar el modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-emerald-600 dark:text-emerald-300 text-3xl text-center">
          Detalles de la oferta
        </h3>

        {/* Verifica si el usuario autenticado es el propietario del artículo ofrecido */}
        {offer.articleToOffer.user === user.idUser ? (
          <section className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row">
              {/* Tarjeta del artículo ofrecido */}
              <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10">
                <ProductCardOnlyInfo
                  key={offer.articleToOffer.idArticle}
                  idArticle={offer.articleToOffer.idArticle}
                  name={offer.articleToOffer.name}
                  user={offer.articleToOffer.user}
                  ownerName={offer.articleToOffer.ownerName}
                  description={offer.articleToOffer.description}
                  images={offer.articleToOffer.images}
                />
              </div>

              {/* Icono de intercambio */}
              <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
                <TbArrowsExchange2 />
              </div>

              {/* Tarjeta del artículo recibido en la oferta */}
              <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10 gap-4">
                <ProductCardOnlyInfo
                  key={offer.articleToGive.idArticle}
                  idArticle={offer.articleToGive.idArticle}
                  name={offer.articleToGive.name}
                  user={offer.articleToGive.user}
                  ownerName={offer.articleToGive.ownerName}
                  description={offer.articleToGive.description}
                  images={offer.articleToGive.images}
                />
              </div>
            </div>
            {/* Botones para aceptar o rechazar la oferta */}
            <div className="w-full flex justify-center gap-4">
              <button
                className="btn btn-outline btn-success"
                onClick={handleAcceptOffer}
              >
                Aceptar oferta
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={handleRejectOffer}
              >
                Rechazar oferta
              </button>
            </div>
          </section>
        ) : (
          <section className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row">
              {/* Tarjeta del artículo ofrecido */}
              <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10">
                <ProductCardOnlyInfo
                  key={offer.articleToOffer.idArticle}
                  idArticle={offer.articleToOffer.idArticle}
                  name={offer.articleToOffer.name}
                  user={offer.articleToOffer.user}
                  ownerName={offer.articleToOffer.ownerName}
                  description={offer.articleToOffer.description}
                  images={offer.articleToOffer.images}
                />
              </div>

              {/* Icono de intercambio */}
              <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
                <TbArrowsExchange2 />
              </div>

              {/* Tarjeta del artículo recibido en la oferta */}
              <div className="card rounded-box grid bg-neutral-200 dark:bg-zinc-700 flex-grow place-items-center py-10 gap-4">
                <ProductCardOnlyInfo
                  key={offer.articleToGive.idArticle}
                  idArticle={offer.articleToGive.idArticle}
                  name={offer.articleToGive.name}
                  user={offer.articleToGive.user}
                  ownerName={offer.articleToGive.ownerName}
                  description={offer.articleToGive.description}
                  images={offer.articleToGive.images}
                />
              </div>
            </div>
            {/* Botón para cancelar la oferta */}
            <div className="w-full flex justify-center">
              <button
                className="btn btn-outline btn-error"
                onClick={handleCancelOffer}
              >
                Cancelar oferta
              </button>
            </div>
          </section>
        )}
      </div>
    </dialog>
  );
}

export default SeeOffer;
