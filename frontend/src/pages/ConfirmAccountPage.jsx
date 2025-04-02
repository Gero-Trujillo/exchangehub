import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ConfirmAccountPage() {
  // Extraemos el parámetro "idUser" de la URL utilizando useParams
  const { idUser } = useParams();

  // Estado para manejar si la confirmación de la cuenta fue exitosa
  const [isOk, setIsOk] = useState(false);

  // Efecto para confirmar la cuenta al montar el componente
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        // Llama a la API para confirmar la cuenta del usuario
        const res = await axios.patch(
          `http://localhost:3000/api/confirm/${idUser}`
        );
        // Si la respuesta es "OK", actualiza el estado para indicar éxito
        if (res.data.message === "OK") {
          setIsOk(true);
        }
      } catch (error) {
        // Manejo de errores en caso de fallo en la solicitud
        console.error(error);
      }
    };
    confirmAccount(); // Ejecuta la función para confirmar la cuenta
  }, [idUser]);

  // Renderiza un mensaje de error si la confirmación no fue exitosa
  if (!isOk) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl text-emerald-600 dark:text-emerald-300">
          ¡Ha ocurrido un error!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Ha ocurrido un error al activar tu cuenta. Por favor, intenta de nuevo
          más tarde.
        </p>
      </div>
    );
  }

  // Renderiza un mensaje de éxito si la cuenta fue activada correctamente
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-emerald-600 dark:text-emerald-300">
        ¡Tu cuenta ha sido activada exitosamente!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Ahora puedes{" "}
        <Link to="/login" className="text-emerald-600 dark:text-emerald-300">
          iniciar sesión
        </Link>{" "}
        en tu cuenta y comenzar a disfrutar de nuestros servicios.
      </p>
    </div>
  );
}

export default ConfirmAccountPage;
