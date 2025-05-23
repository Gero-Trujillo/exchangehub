import React from "react";
import buho from "../assets/buho.png"; // Importa la imagen utilizada en el componente

/**
 * Componente `AdSubscription` para mostrar una sección promocional
 * que invita a los usuarios a suscribirse a una cuenta premium.
 */
function AdSubscription() {
  return (
    <>
      <div data-aos="zoom-in" className="mx-auto max-w-7xl my-20 lg:px-8">
        {/* Contenedor principal con estilos y animación */}
        <div className="relative isolate overflow-hidden bg-emerald-600 dark:bg-emerald-950 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          {/* Fondo decorativo con un gradiente radial */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#6ee7b7" />
                <stop offset={1} stopColor="#6ee7b7" />
              </radialGradient>
            </defs>
          </svg>

          {/* Contenido textual de la sección */}
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Potencia tus intercambios. Hazte premium!
            </h2>
            <p className="mt-6 text-pretty text-lg/8 text-gray-300">
              Desbloquea todas las funcionalidades de la plataforma y haz que
              tus productos sean más visibles.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              {/* Botón para redirigir a la página de suscripción premium */}
              <a
                href="/Premium"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-emerald-300 dark:text-black"
              >
                Ver más <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Imagen decorativa de la sección */}
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot"
              src={buho}
              width={1824}
              height={1080}
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdSubscription; // Exporta el componente para su uso en otras partes de la aplicación
