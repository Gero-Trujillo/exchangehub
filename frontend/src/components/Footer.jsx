import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
          <Link
          to="/contact"
          className="link link-hover text-emerald-600 dark:text-emerald-300">
            Contacto
          </Link>
          <Link
          to="/terms"
          className="link link-hover text-emerald-600 dark:text-emerald-300">
            Términos y condiciones
          </Link>
          <Link
          to="/privacy"
          className="link link-hover text-emerald-600 dark:text-emerald-300">
            Política de privacidad
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.instagram.com/exchangehub__official/"target="_blank" className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300">
              <FaInstagram />
              
            </a>
            <a href="https://x.com/ExchangeHub_" target="_blank" className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300">
              <FaXTwitter />
            </a>
            <a href="https://www.tiktok.com/@exchangehub_official" target="_blank" className="text-2xl cursor-pointer text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300">
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
