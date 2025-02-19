import { useEffect, useState } from "react";

export default function PayPalCard() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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
              purchase_units: [{ amount: { value: "9.99" } }],
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
    <div
      className={`flex flex-col border-2 rounded-3xl max-w-sm mx-auto text-center ${
        theme === "dark" ? "bg-black border-emerald-900 text-white" : "bg-white border-emerald-600 text-black"
      }`}
    >
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
      <div className="flex justify-center px-6 pb-8 sm:px-8">
        <div id="paypal-button-container" className="w-auto"></div>
      </div>
      <div className="block content-center">
              <button
                className="text-3xl cursor-pointer text-emerald-600 dark:text-emerald-300"
                onClick={handleTheme}
              >
                {theme === "light" ? (
                  <ion-icon name="sunny-outline"></ion-icon>
                ) : (
                  <ion-icon name="moon-outline"></ion-icon>
                )}
              </button>
            </div>
    </div>
  );
}
