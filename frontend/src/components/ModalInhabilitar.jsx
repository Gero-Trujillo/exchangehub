import "./ModalInhabilitar.css"; // Importa los estilos específicos para el modal
import axios from "axios"; // Importa Axios para realizar solicitudes HTTP
import PropTypes from "prop-types"; // Importa PropTypes para validar las propiedades del componente
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación

/**
 * Componente `ModalInhabilitar` para desactivar la cuenta de un usuario.
 * Muestra un modal con un mensaje de confirmación y opciones para desactivar o cancelar.
 * @param {Function} onClose - Función para cerrar el modal.
 */
function ModalInhabilitar({ onClose }) {
  const { user, logout } = useAuth(); // Obtiene el usuario autenticado y la función para cerrar sesión desde el contexto

  /**
   * Maneja la desactivación de la cuenta del usuario.
   * @param {number} userId - ID del usuario a desactivar.
   */
  const handleDesactivate = async (userId) => {
    if (!userId) {
      alert("Error: ID de usuario no válido"); // Muestra un mensaje de error si el ID no es válido
      return;
    }

    try {
      // Realiza una solicitud PATCH para cambiar el estado del usuario a "inActive"
      await axios.patch(`http://localhost:3000/api/users/${userId}/state`, {
        state: "inActive", // Cambia el estado del usuario a "inActive"
      });

      alert("Cuenta desactivada con éxito"); // Muestra un mensaje de éxito
      onClose(); // Cierra el modal
      logout(); // Cierra la sesión del usuario
    } catch (error) {
      console.error(error); // Registra el error en la consola
      alert("Hubo un error al desactivar la cuenta"); // Muestra un mensaje de error
    }
  };

  return (
    <div className="overlay">
      {/* Contenedor principal del modal */}
      <div className="cardModal">
        <div className="header dark:bg-zinc-900">
          {/* Contenedor del ícono de advertencia */}
          <div className="image">
            <svg
              aria-hidden="true" // Oculta el ícono para lectores de pantalla
              stroke="currentColor" // Color del trazo
              strokeWidth="1.5" // Ancho del trazo
              viewBox="0 0 24 24" // Define el área visible del ícono
              fill="none" // Sin relleno
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                strokeLinejoin="round" // Define cómo se unen las líneas
                strokeLinecap="round" // Define los extremos de las líneas
              ></path>
            </svg>
          </div>

          {/* Contenido del modal */}
          <div className="content">
            <span className="title dark:text-white">¿Desactivar Cuenta?</span>
            <p className="message dark:text-white">
              ¿Estás seguro de que deseas desactivar tu cuenta? Será
              permanentemente removida hasta que se indique lo contrario.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="actions dark:bg-zinc-900">
            {/* Botón para desactivar la cuenta */}
            <button
              className="desactivate"
              type="button"
              onClick={() => handleDesactivate(user.idUser)} // Llama a la función para desactivar la cuenta
            >
              Desactivar
            </button>

            {/* Botón para cancelar y cerrar el modal */}
            <button className="cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define las propiedades esperadas para el componente
ModalInhabilitar.propTypes = {
  onClose: PropTypes.func.isRequired, // `onClose` es obligatorio y debe ser una función
  userId: PropTypes.number, // `userId` es opcional y debe ser un número
};

export default ModalInhabilitar; // Exporta el componente para su uso en otras partes de la aplicación
