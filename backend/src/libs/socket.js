import { Server } from "socket.io"; // Importa la clase Server de la librería socket.io para manejar conexiones en tiempo real
import http from "http"; // Importa el módulo HTTP para crear un servidor
import express from "express"; // Importa Express para manejar rutas y middleware

const app = express(); // Crea una instancia de Express
const server = http.createServer(app); // Crea un servidor HTTP utilizando Express

// Configura el servidor de Socket.IO con soporte para CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Permite conexiones desde el cliente en esta URL
  },
});

// Mapa para almacenar la relación entre los IDs de los usuarios y sus sockets
const userSocketMap = {};

/**
 * Función para obtener el socket ID de un usuario específico
 * @param {string} userId - El ID del usuario
 * @returns {string | undefined} - El socket ID del usuario, o `undefined` si no está conectado
 */
export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // Devuelve el socket ID asociado al usuario
}

// Evento que se ejecuta cuando un cliente se conecta al servidor de Socket.IO
io.on("connection", (socket) => {
  console.log("User connected", socket.id); // Loguea el ID del socket conectado

  // Obtiene el ID del usuario desde los parámetros de la conexión (handshake)
  const userId = socket.handshake.query.userId;
  console.log("User id", userId);

  // Si el usuario tiene un ID válido, lo agrega al mapa de sockets
  if (userId) userSocketMap[userId] = socket.id;
  console.log("User socket map", userSocketMap); // Loguea el mapa actualizado

  // Emite un evento a todos los clientes con la lista de usuarios en línea
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Evento que se ejecuta cuando un cliente se desconecta
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id); // Loguea el ID del socket desconectado
    delete userSocketMap[userId]; // Elimina al usuario del mapa de sockets
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Actualiza la lista de usuarios en línea
  });

  // Manejar eventos de notificaciones
  socket.on('sendNotification', (notification) => {
    io.emit('newNotification', notification);
  });
});

// Exporta las instancias de `io`, `server` y `app` para usarlas en otras partes de la aplicación
export { io, server, app };
