import { useEffect } from "react";

/**
 * Componente `PayPalCard` para integrar el botón de pago de PayPal.
 * Permite a los usuarios realizar pagos de manera segura y muestra un resumen de los beneficios de la suscripción.
 */
export default function PayPalCard() {
  useEffect(() => {
    // Crea y carga el script del SDK de PayPal
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Ad5o1ctQ6qf6P2NNLVY1om0m-heJpDr20v5EeH9-gGJAUFt_r2p_rFBIxjd8F3AKh4ojrUqCP3EN6x3s&currency=USD";
    script.async = true;

    // Configura el botón de PayPal una vez que el script se haya cargado
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: "horizontal", // Diseño horizontal del botón
            color: "white", // Color del botón
            shape: "pill", // Forma del botón
            label: "pay", // Etiqueta del botón
            height: 35, // Altura del botón
          },
          // Crea una orden de pago
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{ amount: { value: "9.99" } }], // Monto del pago
            });
          },
          // Maneja la aprobación del pago
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Enviar la orden al backend para verificar el pago
              fetch("http://localhost:3000/payments/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: data.orderID }),
              })
                .then((response) => response.json())
                .then((result) => {
                  if (result.success) {
                    localStorage.setItem("paymentStatus", "completed"); // Guarda el estado del pago
                    alert(
                      "Pago exitoso, gracias " +
                        details.payer.name.given_name
                    ); // Muestra un mensaje de éxito
                  } else {
                    alert("Error al verificar el pago."); // Muestra un mensaje de error
                  }
                })
                .catch((error) => {
                  console.error("Error en la verificación del pago:", error);
                  alert("Hubo un problema con la verificación del pago.");
                });
            });
          },
        }).render("#paypal-button-container"); // Renderiza el botón en el contenedor especificado
      } else {
        console.error("PayPal SDK no se ha cargado correctamente.");
      }
    };

    document.body.appendChild(script); // Agrega el script al DOM

    // Limpia el script y cierra el botón de PayPal cuando el componente se desmonta
    return () => {
      document.body.removeChild(script);
      if (window.paypal) {
        window.paypal.Buttons().close();
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col border-2 rounded-3xl max-w-sm mx-auto dark:text-slate-100 text-center md:text-start border-emerald-600"
    >
      {/* Contenido de la tarjeta */}
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <h2 className="text-lg font-medium tracking-tighter text-emerald-600 lg:text-3xl">
          Elite Exchange
        </h2>
        <p className="mt-2 text-sm">
          🔹 <span className="font-semibold">Trueques Premium:</span> Accede a los mejores productos y ofertas exclusivas. <br />
          🔹 <span className="font-semibold">Mayor Seguridad:</span> Verificación avanzada para transacciones seguras. <br />
          🔹 <span className="font-semibold">Más Confianza:</span> Perfil destacado y prioridad en intercambios. <br />
          🔹 <span className="font-semibold">Soporte VIP:</span> Atención preferencial para resolver cualquier duda. <br />
        </p>
        <p className="mt-2 text-sm">🚀 ¡Únete y lleva tus intercambios al siguiente nivel!</p>
        <p className="mt-4">
          <span className="text-5xl font-light tracking-tight">$9.99</span>
          <span className="text-base font-medium"> /mo </span>
        </p>
      </div>

      {/* Contenedor del botón de PayPal */}
      <div className="flex justify-center px-6 pb-8 sm:px-8">
        <div id="paypal-button-container" className="w-auto"></div>
      </div>
    </div>
  );
}
