import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ConfirmAccountPage() {
  const { idUser } = useParams();
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const res = await axios.patch(
          `http://localhost:3000/api/confirm/${idUser}`
        );
        if (res.data.message === "OK") {
          setIsOk(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    confirmAccount();
  }, []);

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
