import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { addRating } from "../api/ratings";

function RatingModal({ idUserToRate, exchangeId, idUser }) {
  const { getUser } = useChatStore();
  const [userToRate, setUserToRate] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(idUserToRate);
      setUserToRate(res);
    };
    fetchUser();
  }, []);

  const handleRatingChange = (value) => {
    setRating(value); // Actualizar el estado con la calificación seleccionada
  };

  const handleSendRating = async () => {
    try {
        const ratingData = {
            idUser: idUser,
            idUserToRate: idUserToRate,
            rating,
            idExchange: exchangeId,
          };
          await addRating(ratingData);
    } catch (error) {
      console.error("Error sending rating:", error);
    }
  }

  return (
    <section>
      <dialog id="my_modal_1" className="modal backdrop-blur-md" open>
        <div className="modal-box bg-neutral-200 dark:bg-zinc-800">
          <div className="modal-action flex flex-col gap-10 items-end">
            <div className="w-full flex flex-col items-center gap-4">
              <img
                src={userToRate?.profileImageUrl}
                className="w-28 h-28 rounded-full"
              />
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                {userToRate?.name} {userToRate?.lastname}
              </h2>
              <p className="text-zinc-800 dark:text-neutral-100 text-xl text-center">
                Califica tu experiencia con este usuario. Esto ayudará a otros
                usuarios a mejorar su seguridad en la plataforma.
              </p>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="1 star"
                  onClick={() => handleRatingChange(1)} // Capturar 1 estrella
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="2 stars"
                  onClick={() => handleRatingChange(2)} // Capturar 2 estrellas
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="3 stars"
                  onClick={() => handleRatingChange(3)} // Capturar 3 estrellas
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="4 stars"
                  onClick={() => handleRatingChange(4)} // Capturar 4 estrellas
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="5 stars"
                  defaultChecked
                  onClick={() => handleRatingChange(5)} // Capturar 5 estrellas
                />
              </div>
            </div>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn outline-none rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-400"
              onClick={handleSendRating}
              >
                Enviar calificación
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
}

export default RatingModal;
