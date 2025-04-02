import { createPool } from "mysql2/promise"; // Importa la función `createPool` de la librería mysql2 para manejar conexiones a la base de datos

// Crea un pool de conexiones a la base de datos
export const pool = createPool({
    host: "localhost", // Dirección del servidor de la base de datos
    user: "root", // Usuario de la base de datos
    password: "", // Contraseña del usuario de la base de datos
    database: "exchangehubdb", // Nombre de la base de datos
    port: 3306, // Puerto en el que se ejecuta el servidor de la base de datos
});