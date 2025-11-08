// src/components/NavSecciones/NavSecciones.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import "./NavSecciones.css";
import { Link } from "react-router-dom";

const NavSecciones = () => {
  const [secciones, setSecciones] = useState([]);

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
      <ul>
        {secciones.map((sec) => (
          <li key={sec.id}>
            <Link to={`/seccion/${sec.nombre.toLowerCase()}`}>{sec.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavSecciones;
