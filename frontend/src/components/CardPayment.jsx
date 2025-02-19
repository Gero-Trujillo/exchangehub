import { useEffect } from "react";

export default function PayPalCard() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Ad5o1ctQ6qf6P2NNLVY1om0m-heJpDr20v5EeH9-gGJAUFt_r2p_rFBIxjd8F3AKh4ojrUqCP3EN6x3s&currency=USD";
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: "horizontal",
            color: "white",
            shape: "pill",
            label: "pay",
            height: 35,
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "9.99",
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert("Pago exitoso, gracias " + details.payer.name.given_name);
            });
          },
        }).render("#paypal-button-container");
      } else {
        console.error("PayPal SDK no se ha cargado correctamente.");
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col bg-black border-2 border-emerald-900 rounded-3xl max-w-sm mx-auto text-center">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <h2 className="text-lg font-medium tracking-tighter text-emerald-600 lg:text-3xl">
        Elite Exchange
        </h2>
        <p className="mt-2 text-sm text-gray-100">
          <span className="font-semibold text-white">🔹 Trueques Premium:</span> Accede a los mejores productos y ofertas exclusivas. <br />
          <span className="font-semibold text-white">🔹 Mayor Seguridad:</span> Verificación avanzada para transacciones seguras. <br />
          <span className="font-semibold text-white">🔹 Más Confianza:</span> Perfil destacado y prioridad en intercambios. <br />
          <span className="font-semibold text-white">🔹 Soporte VIP:</span> Atención preferencial para resolver cualquier duda. <br />
        </p>
        <p className="mt-2 text-sm text-gray-100">🚀 ¡Únete y lleva tus intercambios al siguiente nivel!</p>
        <p className="mt-4">
          <span className="text-5xl font-light tracking-tight text-white">$9.99</span>
          <span className="text-base font-medium text-white"> /mo </span>
        </p>
      </div>
      <div className="flex justify-center px-6 pb-8 sm:px-8">
        <div
          id="paypal-button-container"
          className="w-auto flex items-center justify-center px-4 py-1.5 text-white duration-100 bg-emerald-600 border-2 border-emerald-600 rounded-full hover:bg-transparent hover:border-emerald-600 hover:text-emerald-600 focus:outline-none focus-visible:outline-emerald-600 text-sm focus-visible:ring-emerald-600"
        ></div>
      </div>
    </div>
  );
}
