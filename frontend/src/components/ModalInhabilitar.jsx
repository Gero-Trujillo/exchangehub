import "./ModalInhabilitar.css";
import axios from "axios";
import PropTypes from "prop-types";
import {useAuth} from '../context/AuthContext' 

function ModalInhabilitar({ onClose }) {

  const { user, logout } = useAuth();
  const handleDesactivate = async (userId) => {
    if (!userId) {
      alert("Error: ID de usuario no válido");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/api/users/${userId}/state`, {
        state: "inActive", // o "desactivado"
      });

      alert("Cuenta desactivada con éxito");
      onClose();
      logout();
      
    } catch (error) {
      console.error(error);
      alert("Hubo un error al desactivar la cuenta");
    }
  };

  return (
    <div className="overlay">
      <div className="cardModal">
        <div className="header dark:bg-zinc-900">
          <div className="image">
            <svg
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <div className="content">
            <span className="title dark:text-white">¿Desactivar Cuenta?</span>
            <p className="message dark:text-white">
              ¿Estás seguro de que deseas desactivar tu cuenta? Será
              permanentemente removida hasta que se indique lo contrario.
            </p>
          </div>
          <div className="actions dark:bg-zinc-900">
            <button className="desactivate" type="button"  onClick={() => handleDesactivate(user.idUser)}>
              Desactivar
            </button>
            <button className="cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalInhabilitar.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default ModalInhabilitar;
