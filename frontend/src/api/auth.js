import axios from './axios.js'; // Importa la instancia de Axios configurada para realizar solicitudes HTTP

// Registra un nuevo usuario
export const registerUser = (user) => axios.post('/register', user);
// Realiza una solicitud POST a la ruta "/register" para registrar un nuevo usuario
// `user` debe ser un objeto que contenga los datos del usuario (por ejemplo, nombre, correo, contraseña)

// Inicia sesión de un usuario
export const loginUser = (user) => axios.post('/login', user);
// Realiza una solicitud POST a la ruta "/login" para autenticar a un usuario
// `user` debe ser un objeto que contenga las credenciales del usuario (correo y contraseña)

// Cierra la sesión del usuario actual
export const logoutUser = () => axios.post('/logout');
// Realiza una solicitud POST a la ruta "/logout" para cerrar la sesión del usuario actual

// Verifica el token de acceso del usuario
export const verifyToken = () => axios.get('/verify');
// Realiza una solicitud GET a la ruta "/verify" para validar el token de acceso del usuario
// Devuelve información sobre si el token es válido o ha expirado
