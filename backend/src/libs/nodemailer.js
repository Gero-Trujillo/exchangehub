import nodemailer from "nodemailer"; // Importa la librería nodemailer para enviar correos electrónicos

// Configuración del transportador de nodemailer
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor SMTP de Gmail
  port: 465, // Puerto seguro para conexiones SMTP (465 para SSL)
  secure: true, // Usa `true` para conexiones seguras (SSL/TLS)
  auth: {
    user: "gtutos3@gmail.com", // Dirección de correo electrónico del remitente
    pass: "ihfo jayz lrhf toob", // Contraseña o clave de aplicación del correo
    // **Nota:** En un entorno de producción, estas credenciales deben almacenarse en variables de entorno para mayor seguridad
  },
});

// Verifica la conexión con el servidor SMTP
transporter.verify().then(() => {
  console.log("Ready to send emails"); // Loguea un mensaje indicando que el transportador está listo para enviar correos
});
