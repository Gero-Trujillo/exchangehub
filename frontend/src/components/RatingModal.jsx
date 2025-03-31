import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { addRating } from "../api/ratings";

function RatingModal({ idUserToRate, exchangeId, idUser }) {
  // Extraemos la función para obtener información del usuario desde el store de chat
  const { getUser } = useChatStore();

  // Estado para almacenar la información del usuario a calificar
  const [userToRate, setUserToRate] = useState(null);

  // Estado para manejar la calificación seleccionada (por defecto, 5 estrellas)
  const [rating, setRating] = useState(5);

  // Efecto para obtener la información del usuario a calificar al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(idUserToRate); // Llama a la función para obtener los datos del usuario
      setUserToRate(res); // Almacena la información del usuario en el estado
    };
    fetchUser();
  }, [idUserToRate, getUser]);

  // Función para manejar el cambio de calificación
  const handleRatingChange = (value) => {
    setRating(value); // Actualiza el estado con la calificación seleccionada
  };

  // Función para enviar la calificación a la API
  const handleSendRating = async () => {
    try {
      const ratingData = {
        idUser: idUser, // ID del usuario que realiza la calificación
        idUserToRate: idUserToRate, // ID del usuario que está siendo calificado
        rating, // Calificación seleccionada
        idExchange: exchangeId, // ID del intercambio asociado
      };
      await addRating(ratingData); // Llama a la API para registrar la calificación
    } catch (error) {
      console.error("Error sending rating:", error); // Manejo de errores en caso de fallo
    }
  };

  return (
    <section>
      {/* Modal para calificar al usuario */}
      <dialog id="my_modal_1" className="modal backdrop-blur-md" open>
        <div className="modal-box bg-neutral-200 dark:bg-zinc-800">
          <div className="modal-action flex flex-col gap-10 items-end">
            {/* Contenido principal del modal */}
            <div className="w-full flex flex-col items-center gap-4">
              {/* Imagen de perfil del usuario a calificar */}
              <img
                src={userToRate?.profileImageUrl}
                className="w-28 h-28 rounded-full"
              />
              {/* Nombre completo del usuario */}
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                {userToRate?.name} {userToRate?.lastname}
              </h2>
              {/* Mensaje de instrucción */}
              <p className="text-zinc-800 dark:text-neutral-100 text-xl text-center">
                Califica tu experiencia con este usuario. Esto ayudará a otros
                usuarios a mejorar su seguridad en la plataforma.
              </p>
              {/* Sistema de calificación con estrellas */}
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="1 star"
                  onClick={() => handleRatingChange(1)} // Captura 1 estrella
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="2 stars"
                  onClick={() => handleRatingChange(2)} // Captura 2 estrellas
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="3 stars"
                  onClick={() => handleRatingChange(3)} // Captura 3 estrellas
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="4 stars"
                  onClick={() => handleRatingChange(4)} // Captura 4 estrellas
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-emerald-600 dark:bg-emerald-300"
                  aria-label="5 stars"
                  defaultChecked
                  onClick={() => handleRatingChange(5)} // Captura 5 estrellas
                />
              </div>
            </div>
            {/* Botón para enviar la calificación */}
            <form method="dialog">
              {/* Si hay un botón en el formulario, cerrará el modal */}
              <button
                className="btn outline-none rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-400"
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
