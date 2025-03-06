import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "gtutos3@gmail.com",
    pass: "ihfo jayz lrhf toob",
  },
});

transporter.verify().then(() => {
  console.log("Ready to send emails");
});
