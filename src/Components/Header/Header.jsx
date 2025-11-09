import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import logo from "../../Assets/LogoNoticias.png";
import "./Header.css";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [subMenuAbierto, setSubMenuAbierto] = useState(false);
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    const obtenerSecciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "secciones"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSecciones(lista);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };
    obtenerSecciones();
  }, []);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const toggleSubMenu = () => setSubMenuAbierto(!subMenuAbierto);

  return (
    <header className="header">
      {/* Menú hamburguesa */}
      <button className="menu-btn" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

      {/* Título central */}
      
      <h1 className="titulo-sitio"> <img  className="logo" src={logo} alt="" /> Noticias <span className="footer__badge">El Ahora</span></h1>

      {/* Botones de sesión */}
      <div className="acciones">
        <Link to="/login" className="btn-sesion">Inicia Sesión</Link>
        <Link to="/registro" className="btn-registro">Regístrate</Link>
      </div>

      {/* Menú lateral */}
      <nav className={`menu-lateral ${menuAbierto ? "abierto" : ""}`}>
        <ul>
          <li><Link to="/">Inicio</Link></li>

          {/* Menú de Secciones */}
          <li className="submenu">
            <button className="submenu-btn" onClick={toggleSubMenu}>
              Secciones <ChevronDown size={16} />
            </button>
            {subMenuAbierto && (
              <ul className="submenu-lista">
                {secciones.length > 0 ? (
                  secciones.map((sec) => (
                    <li key={sec.id}>
                      <Link to={`/seccion/${sec.nombre}`}>{sec.nombre}</Link>
                    </li>
                  ))
                ) : (
                  <li className="no-secciones">No hay secciones</li>
                )}
              </ul>
            )}
          </li>

          <li><a href="#noticias">Noticias</a></li>
          <li><a href="#acerda-de">Acerca de</a></li>
          <li><a href="#footer">Contacto</a></li>
        </ul>
      </nav>

      {/* Capa oscura para cerrar el menú */}
      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
