import { transporter } from "../libs/nodemailer.js"; // Importa el transportador de nodemailer para enviar correos electrónicos
import path from "path"; // Importa el módulo path para manejar rutas de archivos
import { fileURLToPath } from "url"; // Importa fileURLToPath para obtener la ruta del archivo actual

// Obtener el directorio actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url); // Convierte la URL del archivo en una ruta de archivo
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual

// Controlador para enviar un correo de notificación
export const sendNotificationEmail = async (req, res) => {
  const { email } = req.body; // Obtiene el correo electrónico del destinatario desde el cuerpo de la solicitud
  const logoPath = path.join(__dirname, "../assets/exchangeLogo.png"); // Define la ruta al logo que se adjuntará al correo

  // Configuración del correo electrónico
  const mailOptions = {
    from: '"ExchangeHub" <noresponder@exchangehub.com>', // Dirección del remitente
    to: email, // Dirección del destinatario
    subject: "Notificación de ExchangeHub", // Asunto del correo
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:logo" alt="ExchangeHub Logo" style="width: 150px;"/> <!-- Imagen del logo -->
        </div>
        <h1 style="color: #4CAF50; text-align: center;">¡Tienes una nueva oferta!</h1>
        <p style="font-size: 16px; color: #333;">
          Hola,
        </p>
        <p style="font-size: 16px; color: #333;">
          Has recibido una nueva oferta en ExchangeHub. Dirígete a la sección de mensajes para más detalles.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="http://localhost:5173/Mensajes" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver mensajes</a> <!-- Botón para redirigir al usuario -->
        </div>
        <p style="font-size: 14px; color: #777;">
          Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:support@exchangehub.com">support@exchangehub.com</a>.
        </p>
        <p style="font-size: 14px; color: #777;">
          Gracias por usar ExchangeHub.
        </p>
        <div style="text-align: center; margin-top: 20px;">
          <img src="cid:logo" alt="ExchangeHub Logo" style="width: 100px;"/> <!-- Imagen del logo al final -->
        </div>
      </div>
    `, // Contenido HTML del correo
    attachments: [
      {
        filename: "exchangeLogo.png", // Nombre del archivo adjunto
        path: logoPath, // Ruta al archivo del logo
        cid: "logo", // Identificador único para referenciar la imagen en el HTML
      },
    ],
  };

  try {
    // Envía el correo electrónico usando el transportador de nodemailer
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully"); // Loguea un mensaje de éxito
    res.status(200).json({ message: "Email sent successfully" }); // Devuelve una respuesta exitosa al cliente
  } catch (error) {
    console.error("Error sending email:", error); // Loguea el error si el envío falla
    res.status(500).json({ message: "Error sending email" }); // Devuelve un error 500 al cliente
  }
};
