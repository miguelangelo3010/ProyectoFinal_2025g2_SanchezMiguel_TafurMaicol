// src/components/NavSecciones/NavSecciones.jsx
import React from 'react';
import './NavSecciones.css';

const NavSecciones = () => {
  const secciones = ["Tecnología", "Arte", "Música", "Juegos", "Mundo", "Deportes"];

  return (
    <nav className="nav-secciones">
      <ul>
        {secciones.map((nombre, index) => (
          <li key={index}>
            <a href={`/seccion/${nombre.toLowerCase()}`}>{nombre}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavSecciones;
