// src/components/Noticia/Noticia.jsx
import React, { useState } from "react";
import "./Noticia.css";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";

const Noticia = ({ noticia, modoReportero = false, modoEditor = false }) => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState(noticia.estado || "Edición");
  const [enviando, setEnviando] = useState(false);

  // 🟢 Enviar noticia a revisión (solo reportero)
  const handleEnviarRevision = async () => {
    if (estado !== "Edición") return; // 🔹 Solo si está en edición

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

  // 🟣 Verifica si la noticia es editable
  const puedeEditar = estado === "Edición";

  return (
    <div className="noticia-card">
      {noticia.imagen && (
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="noticia-img"
        />
      )}

      <div className="noticia-content">
        <h3 className="noticia-titulo">{noticia.titulo}</h3>
        <p className="noticia-subtitulo">{noticia.subtitulo}</p>
        <p className="noticia-categoria">Categoría: {noticia.categoria}</p>
        <p className="noticia-autor">Autor: {noticia.autorNombre}</p>
        <p className="noticia-estado">
          Estado: <strong>{estado}</strong>
        </p>

        <div className="noticia-botones">
          {/* 👁️ Todos pueden leer */}
          <button
            onClick={() => navigate(`/noticia/${noticia.id}`)}
            className="noticia-btn"
          >
            Leer más
          </button>

          {/* ✏️ Si es reportero, puede editar y enviar solo si está en edición */}
          {modoReportero && (
            <>
              <button
                onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
                className="noticia-btn editar-btn"
                disabled={!puedeEditar}
              >
                ✏️ Editar
              </button>

              <button
                onClick={handleEnviarRevision}
                disabled={!puedeEditar || enviando}
                className={`noticia-btn revision-btn ${
                  !puedeEditar ? "disabled" : ""
                }`}
              >
                {estado === "Terminado"
                  ? "✅ Enviado"
                  : estado === "Publicado"
                  ? "🟢 Publicado"
                  : enviando
                  ? "Enviando..."
                  : "📤 Enviar a revisión"}
              </button>
            </>
          )}

          {/* 👨‍💼 Si es editor, puede editar siempre */}
          {modoEditor && (
            <button
              onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
              className="noticia-btn editar-btn"
            >
              ✏️ Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noticia;
