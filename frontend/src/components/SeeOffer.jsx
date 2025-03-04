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
  const { user } = useAuth();
  const { updateIsSpecialStatus } = useChatStore();

  const handleCancelOffer = async () => {
    try {
      const res = await getExchangesByArticles(
        offer.articleToOffer.idArticle,
        offer.articleToGive.idArticle
      );
      const exchange = res.data;
      await cancelExchange(exchange.idExchange, "cancelado");
      updateIsSpecialStatus(idMessage);
      document.getElementById("seeOfferModal").close();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptOffer = async () => {
    try {
      const res = await getExchangesByArticles(
        offer.articleToOffer.idArticle,
        offer.articleToGive.idArticle
      );
      const exchange = res.data;
      await updateExchangeStatus(exchange.idExchange, "aceptado");
      updateIsSpecialStatus(idMessage);
      document.getElementById("seeOfferModal").close();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectOffer = async () => {
    try {
      const res = await getExchangesByArticles(
        offer.articleToOffer.idArticle,
        offer.articleToGive.idArticle
      );
      const exchange = res.data;
      await updateExchangeStatus(exchange.idExchange, "rechazado");
      updateIsSpecialStatus(idMessage);
      document.getElementById("seeOfferModal").close();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog id="seeOfferModal" className="modal backdrop-blur-sm">
      <div className="modal-box flex flex-col h-auto gap-4 max-w-5xl bg-neutral-100 dark:bg-zinc-800 p-20">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-emerald-600 dark:text-emerald-300 text-3xl text-center">
          Detalles de la oferta
        </h3>

        {offer.articleToOffer.user === user.idUser ? (
          <section className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row">
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

              <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
                <TbArrowsExchange2 />
              </div>

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

              <div className="divider lg:divider-horizontal text-8xl text-emerald-600 dark:text-emerald-300">
                <TbArrowsExchange2 />
              </div>

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
