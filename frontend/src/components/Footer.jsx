import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer footer-center bg-neutral-100 dark:bg-zinc-800 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <ScrollLink
            to="aboutus"
            smooth={true}
            duration={500}
            className="link link-hover text-emerald-600 dark:text-emerald-300 cursor-pointer"
          >
            Equipo de desarrollo
          </ScrollLink>
          <a className="link link-hover text-emerald-600 dark:text-emerald-300">
            Contacto
          </a>
          <Link
          to="/terms"
          className="link link-hover text-emerald-600 dark:text-emerald-300">
            Terminos y condiciones
          </Link>
          <Link
          to="/privacy"
          className="link link-hover text-emerald-600 dark:text-emerald-300">
            Politica de privacidad
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300">
              <FaInstagram />
            </a>
            <a className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300">
              <FaFacebook />
            </a>
            <a className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300">
              <FaTiktok />
            </a>
          </div>
        </nav>
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

export default Footer;
