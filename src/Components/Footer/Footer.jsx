import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__grid container">
        {/* Identidad */}
        <div>
          <div className="footer__brand">
            <span className="footer__logo">Noticias</span>
            <span className="footer__badge">El Ahora</span>
          </div>
          <p className="footer__tagline">
            Información clara, precisa y actual.
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Secciones del sitio" className="footer__nav">
          <ul className="footer__list">
            <li><a className="footer__link" href="/">Inicio</a></li>
            <li><Link to="/seccion/tecnología"  className="footer__link"> Tecnología </Link></li>
            <li><Link to="/seccion/educación"  className="footer__link"> Educación </Link></li>
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
              <a className="footer__link" href="#">
                contacto@noticiaselahora.com
              </a>
            </li>
            <li>
              <FaPhoneAlt className="footer__icon" />
              <a className="footer__link" href="#">
                +57 3026787135
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
            <a
              href="https://www.facebook.com/share/17hEjVYfss/?mibextid=wwXIfr"
              aria-label="Facebook"
              className="chip"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="icon" />
            </a>

            <a
              href="https://www.instagram.com/stiventafur_15?igsh=MWdkb3cydng0bXJ4aA=="
              aria-label="Instagram"
              className="chip"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="icon" />
            </a>

            <a
              href="https://www.tiktok.com/@stiventafur15?_r=1&_t=ZS-91EtygGiDCP"
              aria-label="TikTok"
              className="chip"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok className="icon" />
            </a>

            <a
              href="https://wa.me/573232034392"
              aria-label="WhatsApp"
              className="chip"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__legal">
          <p>© {new Date().getFullYear()} Noticias El Ahora. Todos los derechos reservados.</p>
          <p>Desarrollado por el equipo académico de la Universidad de la Amazonia.</p>
        </div>
        <p className="footer__credit">
          Elaborado por <span>Stiven y Miguel</span>
        </p>
      </div>
    </footer>
  );
}

