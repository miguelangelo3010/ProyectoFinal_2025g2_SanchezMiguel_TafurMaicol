import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../Firebase/ConfigFirebase";
import Header from "../../Components/Header/Header";
import HeaderReportero from "../../Components/HeaderReportero/HeaderReportero";
import HeaderEditor from "../../Components/HeaderEditor/HeaderEditor";
import NavSecciones from "../../Components/NavSecciones/NavSecciones";
import "./NoticiaDetalle.css";

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [rol, setRol] = useState("publico"); 

  // obtener rol del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setRol(data.rol || "publico");
          } else {
            setRol("publico");
          }
        } catch (error) {
          console.error("Error al obtener rol del usuario:", error);
          setRol("publico");
        }
      } else {
        setRol("publico");
      }
    });
    return () => unsubscribe();
  }, []);

  //  Obtener la noticia
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
  if (!noticia) return <p className="error">No se encontró la noticia.</p>;

  const fechaCreacion = noticia.fechaCreacion?.toDate
    ? noticia.fechaCreacion.toDate().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : noticia.fechaCreacion || "—";

  // Seleccionar header según el rol
  const renderHeader = () => {
    if (rol === "reportero") return <HeaderReportero />;
    if (rol === "editor") return <HeaderEditor />;
    return <Header />;
  };

  // Mostrar Nav solo si es público
  const renderNav = () => {
    if (rol === "publico") {
      return <NavSecciones />;
    }
    return null;
  };

  return (
    <div className="detalle-page">
      {renderHeader()}
      {renderNav()}

      <article className="noticia-detalle">
        <h1 className="detalle-titulo">{noticia.titulo}</h1>
        <p className="detalle-fecha">{fechaCreacion}</p>

        {noticia.imagen && (
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="detalle-imagen"
          />
        )}
        <div className="detalle-subtitulo">
          <p>{noticia.subtitulo}</p>
        </div>

        <div className="detalle-contenido">
          <p>{noticia.contenido}</p>
        </div>
        

        <footer className="detalle-footer">
          <div className="autor-info">
            <p>
              <strong>Reportero:</strong>{" "}
              {noticia.autorNombre || "Desconocido"}
            </p>
            <p>
              <strong>Editor:</strong>{" "}
              {noticia.editorNombre || "Sin publicar"}
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default NoticiaDetalle;
