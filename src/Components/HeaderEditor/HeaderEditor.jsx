import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  AccountCircle,
  CheckCircle,
  HighlightOff,
  AssignmentTurnedIn,
  Category,
  Logout,
} from "@mui/icons-material";
import "./HeaderEditor.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/ConfigFirebase";
import logo from "../../Assets/LogoNoticias.png";
import { useNavigate } from "react-router-dom";

const HeaderEditor = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [userMenuAbierto, setUserMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const toggleUserMenu = () => setUserMenuAbierto(!userMenuAbierto);

  const handleCerrarSesion = async () => {
    await signOut(auth);
    navigate("/HomePage");
  };

  return (
    <header className="header-editor">
      {/* Botón menú izquierda */}
      <button className="menu-btn" onClick={toggleMenu}>
        <MenuIcon fontSize="large" />
      </button>

      {/* Logo y título */}
      <h1 className="titulo-sitio">
        <img className="logo" src={logo} alt="Logo" />
        Noticias <span className="badge">El Ahora</span>
      </h1>

      {/* Icono usuario */}
      <div className="acciones">
        <button className="usuario-btn" onClick={toggleUserMenu}>
          <AccountCircle fontSize="large" />
        </button>

        {userMenuAbierto && (
          <div className="user-dropdown">
            <p><strong>{usuario?.displayName || "Editor"}</strong></p>
            <p className="email">{usuario?.email}</p>
            <hr />
            <button onClick={handleCerrarSesion} className="btn-logout">
              <Logout fontSize="small" /> Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Menú lateral */}
      <nav className={`menu-lateral ${menuAbierto ? "abierto" : ""}`}>
        <ul>
          <li>
            <Link to="/panel/editor" onClick={toggleMenu}>
              <AssignmentTurnedIn /> Noticias para Revisión
            </Link>
          </li>
          <li>
            <Link to="/panel/editor/publicadas" onClick={toggleMenu}>
              <CheckCircle /> Noticias Publicadas
            </Link>
          </li>
          <li>
            <Link to="/panel/editor/desactivadas" onClick={toggleMenu}>
              <HighlightOff /> Noticias Desactivadas
            </Link>
          </li>
          <li>
            <Link to="/panel/editor/secciones" onClick={toggleMenu}>
              <Category /> Secciones
            </Link>
          </li>
        </ul>
      </nav>

      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default HeaderEditor;
