// src/components/HeaderEditor/HeaderEditor.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import "./HeaderReportero.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/ConfigFirebase";

const HeaderReportero = () => {
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
          navigate("/");
  };

  return (
    <header className="header">
      {/* Botón menú izquierda */}
      <button className="menu-btn" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

      {/* Título central */}
      <h1 className="titulo-sitio">🗞️ Noticias El Ahora</h1>

      {/* Icono usuario derecha */}
      <div className="acciones">
        <button className="usuario-btn" onClick={toggleUserMenu}>
          <User size={24} />
        </button>

        {/* Menú desplegable usuario */}
        {userMenuAbierto && (
          <div className="user-dropdown">
            <p><strong>{usuario?.displayName || "Editor"}</strong></p>
            <p>{usuario?.email}</p>
            <hr />
            <button onClick={handleCerrarSesion} className="btn-logout">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Menú lateral */}
      <nav className={`menu-lateral ${menuAbierto ? "abierto" : ""}`}>
        <ul>
          <li>
            <Link to="/panel/editor" onClick={toggleMenu}>
              🕵️‍♂️ Noticias para Revisión
            </Link>
          </li>
          <li>
            <Link to="/panel/editor/publicadas" onClick={toggleMenu}>
              ✅ Noticias Publicadas
            </Link>
          </li>
          <li>
            <Link to="/panel/editor/desactivadas" onClick={toggleMenu}>
              🚫 Noticias Desactivadas
            </Link>
          </li>
        </ul>
      </nav>

      {/* Capa para cerrar el menú al hacer clic fuera */}
      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default HeaderReportero;
