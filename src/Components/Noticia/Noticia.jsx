import React, { useState } from "react";
import "./Noticia.css";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";

const Noticia = ({ noticia, modoReportero = false, modoEditor = false, onEliminar }) => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState(noticia.estado || "Edición");
  const [enviando, setEnviando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  // Enviar noticia al editor
  const handleEnviarRevision = async () => {
    if (estado !== "Edición") return;
    try {
      setEnviando(true);
      const docRef = doc(db, "noticias", noticia.id);
      await updateDoc(docRef, {
        estado: "Terminado",
        fechaActualizacion: serverTimestamp(),
      });
      setEstado("Terminado");
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    } finally {
      setEnviando(false);
    }
  };

  // Eliminar noticia 
const handleEliminarNoticia = async () => {
  if (estado !== "Edición") {
    alert("Solo puedes eliminar noticias en estado 'Edición'.");
    return;
  }

  const confirmar = window.confirm(
    `¿Seguro que deseas eliminar la noticia "${noticia.titulo}"?`
  );
  if (!confirmar) return;

  try {
    setEliminando(true);
    const docRef = doc(db, "noticias", noticia.id);
    await deleteDoc(docRef);
    alert("Noticia eliminada correctamente.");

    // Informar al padre para actualizar la lista
    if (onEliminar) onEliminar(noticia.id);

  } catch (error) {
    console.error("Error al eliminar noticia:", error);
    alert("Error al eliminar la noticia.");
  } finally {
    setEliminando(false);
  }
};


  const puedeEditar = estado === "Edición";

  return (
    <div className="noticia-card noticia-card--elevada">
      {/* Imagen y categoría */}
      {noticia.imagen && (
        <div className="noticia-media">
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="noticia-img"
            loading="lazy"
          />
          {noticia.categoria && (
            <span className="chip-categoria">{noticia.categoria}</span>
          )}
          <span className="media-overlay" aria-hidden />
        </div>
      )}

      {/* Contenido */}
      <div className="noticia-content">
        <h3 className="noticia-titulo">{noticia.titulo}</h3>
        <p className="noticia-subtitulo">{noticia.subtitulo}</p>

        
        <div className="noticia-meta">
          <span className="meta-item">
            <span className="meta-dot" /> {noticia.autorNombre || "Autor"}
          </span>
          <span
            className={`pill-estado ${
              estado === "Publicado"
                ? "is-published"
                : estado === "Terminado"
                ? "is-ready"
                : "is-editing"
            }`}
          >
            {estado}
          </span>
        </div>

        {/* Botones */}
        <div className="noticia-botones">
          <button
            onClick={() => navigate(`/noticia/${noticia.id}`)}
            className="noticia-btn btn-primario"
          >
            Leer más
          </button>

          {modoReportero && (
            <>
              <button
                onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
                className="noticia-btn editar-btn"
                disabled={!puedeEditar}
              >
                Editar
              </button>

              <button
                onClick={handleEnviarRevision}
                disabled={!puedeEditar || enviando}
                className={`noticia-btn revision-btn ${
                  !puedeEditar ? "disabled" : ""
                }`}
              >
                {estado === "Terminado"
                  ? "Enviado"
                  : estado === "Publicado"
                  ? "Publicado"
                  : enviando
                  ? "Enviando..."
                  : "Enviar a revisión"}
              </button>

              {/* Botón eliminar */}
              <button
                onClick={handleEliminarNoticia}
                disabled={!puedeEditar || eliminando}
                className="noticia-btn eliminar-btn"
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </>
          )}

          {modoEditor && (
            <button
              onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
              className="noticia-btn editar-btn"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noticia;
