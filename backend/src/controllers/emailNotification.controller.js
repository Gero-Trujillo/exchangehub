import { transporter } from "../libs/nodemailer.js";
import path from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendNotificationEmail = async (req, res) => {
  const { email } = req.body;
  const logoPath = path.join(__dirname, "../assets/exchangeLogo.png");

  const mailOptions = {
    from: '"ExchangeHub" <noresponder@exchangehub.com>',
    to: email,
    subject: "Notificación de ExchangeHub",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:logo" alt="ExchangeHub Logo" style="width: 150px;"/>
        </div>
        <h1 style="color: #4CAF50; text-align: center;">¡Tienes una nueva oferta!</h1>
        <p style="font-size: 16px; color: #333;">
          Hola,
        </p>
        <p style="font-size: 16px; color: #333;">
          Has recibido una nueva oferta en ExchangeHub. Dirigete a la sección de mensajes para mas detalles.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="http://localhost:5173/Mensajes" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver mensajes</a>
        </div>
        <p style="font-size: 14px; color: #777;">
          Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:support@exchangehub.com">support@exchangehub.com</a>.
        </p>
        <p style="font-size: 14px; color: #777;">
          Gracias por usar ExchangeHub.
        </p>
        <div style="text-align: center; margin-top: 20px;">
          <img src="cid:logo" alt="ExchangeHub Logo" style="width: 100px;"/>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "exchangeLogo.png",
        path: logoPath, // Ruta al logo
        cid: "logo", // cid debe coincidir con el src de la imagen en el HTML
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};
