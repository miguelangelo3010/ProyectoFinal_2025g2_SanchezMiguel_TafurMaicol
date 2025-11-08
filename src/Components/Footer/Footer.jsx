import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid container">
        {/* Identidad */}
        <div>
          <div className="footer__brand">
            <span className="footer__logo">DataNews</span>
            <span className="footer__badge">beta</span>
          </div>
          <p className="footer__tagline">
            Información clara, precisa y actual.
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Secciones del sitio" className="footer__nav">
          <ul className="footer__list">
            <li><a className="footer__link" href="/">Inicio</a></li>
            <li><a className="footer__link" href="/tecnologia">Tecnología</a></li>
            <li><a className="footer__link" href="/educacion">Educación</a></li>
            <li><a className="footer__link" href="/opinion">Opinión</a></li>
          </ul>
          <ul className="footer__list">
            <li><a className="footer__link" href="/contacto">Contacto</a></li>
            <li><a className="footer__link" href="/privacidad">Política de privacidad</a></li>
            <li><a className="footer__link" href="/terminos">Términos y condiciones</a></li>
            <li><a className="footer__link" href="/accesibilidad">Accesibilidad</a></li>
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h3 className="footer__title">Contacto</h3>
          <ul className="footer__contact">
            <li>
              <FaEnvelope className="footer__icon" />
              <a className="footer__link" href="mailto:contacto@datnews.com">
                contacto@datnews.com
              </a>
            </li>
            <li>
              <FaPhoneAlt className="footer__icon" />
              <a className="footer__link" href="tel:+573105551234">
                +57 310 555 1234
              </a>
            </li>
            <li>
              <FaMapMarkerAlt className="footer__icon" />
              Florencia, Caquetá, Colombia
            </li>
            <li>
              <FaClock className="footer__icon" />
              Lun–Vie 8:00 a. m. – 5:00 p. m.
            </li>
          </ul>
        </div>

        {/* Información */}
        <div>
          <h3 className="footer__title">Información</h3>

          {/* Redes */}
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="chip" target="_blank" rel="noreferrer">
              <FaFacebookF className="icon" />
            </a>

            <a href="#" aria-label="Instagram" className="chip" target="_blank" rel="noreferrer">
              <FaInstagram className="icon" />
            </a>

            <a href="#" aria-label="Twitter / X" className="chip" target="_blank" rel="noreferrer">
              <FaXTwitter className="icon" />
            </a>

            <a href="#" aria-label="YouTube" className="chip" target="_blank" rel="noreferrer">
              <FaYoutube className="icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__legal">
          <p>© {new Date().getFullYear()} DataNews. Todos los derechos reservados.</p>
          <p>Desarrollado por el equipo académico de la Universidad de la Amazonia.</p>
        </div>
        <p className="footer__credit">
          Elaborado por <span>Stiven y Miguel</span>
        </p>
      </div>
    </footer>
  );
}
