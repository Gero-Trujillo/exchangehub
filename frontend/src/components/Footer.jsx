import { FaInstagram, FaTiktok } from "react-icons/fa"; // Importa los íconos de Instagram y TikTok
import { FaXTwitter } from "react-icons/fa6"; // Importa el ícono de Twitter (X)
import { Link as ScrollLink } from "react-scroll"; // Importa el componente `Link` para desplazamiento suave
import { Link } from "react-router-dom"; // Importa el componente `Link` para navegación entre rutas

/**
 * Componente `Footer` para mostrar el pie de página de la aplicación.
 * Incluye enlaces de navegación, redes sociales y derechos de autor.
 */
function Footer() {
  return (
    <>
      {/* Contenedor principal del pie de página */}
      <footer className="footer footer-center bg-neutral-100 dark:bg-zinc-800 text-base-content rounded p-10">
        {/* Navegación principal */}
        <nav className="grid grid-flow-col gap-4">
          {/* Enlace al equipo de desarrollo con desplazamiento suave */}
          <ScrollLink
            to="aboutus"
            smooth={true}
            duration={500}
            className="link link-hover text-emerald-600 dark:text-emerald-300 cursor-pointer"
          >
            Equipo de desarrollo
          </ScrollLink>

          {/* Enlace a la página de contacto */}
          <Link
            to="/contact"
            className="link link-hover text-emerald-600 dark:text-emerald-300"
          >
            Contacto
          </Link>

          {/* Enlace a los términos y condiciones */}
          <Link
            to="/terms"
            className="link link-hover text-emerald-600 dark:text-emerald-300"
          >
            Términos y condiciones
          </Link>

          {/* Enlace a la política de privacidad */}
          <Link
            to="/privacy"
            className="link link-hover text-emerald-600 dark:text-emerald-300"
          >
            Política de privacidad
          </Link>
        </nav>

        {/* Navegación de redes sociales */}
        <nav>
          <div className="grid grid-flow-col gap-4">
            {/* Enlace a Instagram */}
            <a
              href="https://www.instagram.com/exchangehub__official/"
              target="_blank"
              className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300"
            >
              <FaInstagram />
            </a>

            {/* Enlace a Twitter (X) */}
            <a
              href="https://x.com/ExchangeHub_"
              target="_blank"
              className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300"
            >
              <FaXTwitter />
            </a>

            {/* Enlace a TikTok */}
            <a
              href="https://www.tiktok.com/@exchangehub_official"
              target="_blank"
              className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300"
            >
              <FaTiktok />
            </a>
          </div>
        </nav>

        {/* Derechos de autor */}
        <aside>
          <p className="text-zinc-400">
            Copyright © {new Date().getFullYear()} - Todos los derechos
            reservados por ExchangeHub
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer; // Exporta el componente para su uso en otras partes de la aplicación
