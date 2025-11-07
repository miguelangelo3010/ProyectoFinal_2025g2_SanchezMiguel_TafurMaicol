// src/components/Header/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; // ícono de menú
import "./Header.css";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="header">
      {/* Botón menú a la izquierda */}
      <button className="menu-btn" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

      {/* Título central */}
      <h1 className="titulo-sitio">🗞️ Noticias El Ahora</h1>

      {/* Botones de sesión */}
      <div className="acciones">
        <Link to="/login" className="btn-sesion">
          Inicia Sesión
        </Link>
        <Link to="/registro" className="btn-registro">
          Regístrate
        </Link>
      </div>

      {/* Menú lateral */}
      <nav className={`menu-lateral ${menuAbierto ? "abierto" : ""}`}>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/secciones">Secciones</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>

      {/* Capa para cerrar el menú al hacer clic fuera */}
      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
