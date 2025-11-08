// src/pages/NoticiaDetalle/NoticiaDetalle.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import Header from "../../Components/Header/Header";
import NavSecciones from "../../Components/NavSecciones/NavSecciones";
import "./NoticiaDetalle.css";

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNoticia({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error al obtener noticia:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerNoticia();
  }, [id]);

  if (cargando) return <p className="loading">Cargando noticia...</p>;
  if (!noticia) return <p className="error">❌ No se encontró la noticia.</p>;

  const fechaCreacion = noticia.fechaCreacion?.toDate
    ? noticia.fechaCreacion.toDate().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : noticia.fechaCreacion || "—";

  return (
    <div className="detalle-page">
      <Header />
      <NavSecciones />

      <article className="noticia-detalle">
        <h1 className="detalle-titulo">{noticia.titulo}</h1>
        <p className="detalle-fecha">🗓️ {fechaCreacion}</p>

        {noticia.imagen && (
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="detalle-imagen"
          />
        )}

        <div className="detalle-contenido">
          <p>{noticia.contenido}</p>
        </div>

        <footer className="detalle-footer">
          <div className="autor-info">
            <p><strong>✍️ Reportero:</strong> {noticia.autorNombre || "Desconocido"}</p>
            <p><strong>🧑‍💼 Editor:</strong> {noticia.editorNombre || "Sin publicar"}</p>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default NoticiaDetalle;
