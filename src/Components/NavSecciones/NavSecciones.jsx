// src/components/NavSecciones/NavSecciones.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import { Link, useLocation } from "react-router-dom";
import "./NavSecciones.css";

const NavSecciones = () => {
  const [secciones, setSecciones] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const obtenerSecciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "secciones"));
        const lista = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sec) => sec.estado === "activo");
        setSecciones(lista);
      } catch (error) {
        console.error("Error al cargar secciones:", error);
      }
    };
    obtenerSecciones();
  }, []);

  return (
    <nav className="nav-secciones">
      <div className="nav-container">
        <ul className="nav-list">
          {/* 🔹 Botón fijo de Inicio */}
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              <span className="nav-pill">Inicio</span>
            </Link>
          </li>

          {/* 🔹 Secciones dinámicas desde Firestore */}
          {secciones.map((sec) => {
            const path = `/seccion/${sec.nombre.toLowerCase()}`;
            const isActive = location.pathname === path;
            return (
              <li key={sec.id} className="nav-item">
                <Link
                  to={path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <span className="nav-pill">{sec.nombre}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavSecciones;
