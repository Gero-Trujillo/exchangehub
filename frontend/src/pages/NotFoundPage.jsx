import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      {/* Contenedor principal de la página de error 404 */}
      <section className="flex flex-col h-screen w-full items-center gap-1 p-10">
        {/* Mensaje indicando que la página no fue encontrada */}
        <p className="text-emerald-600 text-9xl font-semibold">Page not found</p>
        {/* Código de error 404 */}
        <h1 className="text-[200px] text-emerald-300 font-bold">404</h1>
        {/* Enlace para regresar a la página principal */}
        <Link to="/">
          <button
            type="button"
            className="bg-emerald-600 dark:bg-emerald-300 text-center w-48 rounded-2xl h-14 relative font-sans text-white dark:text-black text-xl font-semibold group"
          >
            {/* Animación del botón al pasar el cursor */}
            <div className="bg-emerald-300 dark:bg-emerald-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              {/* Ícono de flecha para indicar el regreso */}
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#000000"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </svg>
            </div>
            {/* Texto del botón para regresar */}
            <p className="translate-x-2">Go Back</p>
          </button>
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
