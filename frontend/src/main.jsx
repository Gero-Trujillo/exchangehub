import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderizar la aplicación en el DOM
import App from './App.jsx'; // Importa el componente principal de la aplicación
import './index.css'; // Importa los estilos globales de la aplicación
import { useChatStore } from "./store/useChatStore"; // Importa el estado global relacionado con el chat

// Componente principal que envuelve la aplicación
const Main = () => {
  const { subscribeToMessages, unsubscribeFromMessages } = useChatStore(); 
  // Obtiene las funciones para suscribirse y desuscribirse de los mensajes desde el estado global

  React.useEffect(() => {
    subscribeToMessages(); // Se suscribe a los mensajes cuando el componente se monta
    return () => unsubscribeFromMessages(); // Se desuscribe de los mensajes cuando el componente se desmonta
  }, [subscribeToMessages, unsubscribeFromMessages]); // Dependencias para asegurarse de que las funciones estén actualizadas

  return <App />; // Renderiza el componente principal de la aplicación
};

// Renderiza la aplicación en el elemento con el ID "root" en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main /> {/* Renderiza el componente Main dentro del modo estricto de React */}
  </React.StrictMode>
);