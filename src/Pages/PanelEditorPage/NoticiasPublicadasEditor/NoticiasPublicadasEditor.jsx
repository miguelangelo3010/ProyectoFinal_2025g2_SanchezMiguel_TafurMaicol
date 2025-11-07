import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../Firebase/ConfigFirebase";
import Noticia from "../../../Components/Noticia/Noticia.jsx";
import HeaderEditor from "../../../Components/HeaderEditor/HeaderEditor.jsx";
import "./NoticiasPublicadasEditor.css";

const NoticiasPublicadasEditor = () => {
  const [usuario, setUsuario] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        await obtenerNoticias(user.uid);
      } else {
        navigate("/login");
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔍 Obtener noticias publicadas por el editor autenticado
  const obtenerNoticias = async (editorId) => {
    try {
      const noticiasRef = collection(db, "noticias");
      const q = query(
        noticiasRef,
        where("estado", "==", "Publicado"),
        where("aprobadoPor", "==", editorId)
      );

      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNoticias(lista);
    } catch (error) {
      console.error("Error al obtener noticias publicadas:", error);
    }
  };

  // 🚫 Función para desactivar noticia
  const handleDesactivar = async (id) => {
    try {
      const docRef = doc(db, "noticias", id);
      await updateDoc(docRef, {
        estado: "Desactivada",
        fechaActualizacion: serverTimestamp(),
      });

      // Actualiza la interfaz quitando la noticia
      setNoticias((prev) => prev.filter((n) => n.id !== id));

      setMensaje("🚫 Noticia desactivada correctamente.");
      setTimeout(() => setMensaje(""), 2000);
    } catch (error) {
      console.error("Error al desactivar noticia:", error);
      setMensaje("❌ Error al desactivar la noticia.");
    }
  };

  if (cargando) return <p className="loading">Cargando noticias publicadas...</p>;

  return (
    <div className="panel-editor-container">
      <HeaderEditor />

      <header className="panel-header">
        <h1 className="titulo-panel">✅ Noticias Publicadas</h1>
        {usuario && (
          <h2 className="saludo">
            Publicadas por <span>{usuario.displayName || usuario.email}</span>
          </h2>
        )}
      </header>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {noticias.length === 0 ? (
        <p className="sin-noticias">No tienes noticias publicadas aún.</p>
      ) : (
        <div className="noticias-grid">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="noticia-card-wrapper">
              <Noticia noticia={noticia} />
              <button
                onClick={() => handleDesactivar(noticia.id)}
                className="btn-desactivar"
              >
                🚫 Desactivar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticiasPublicadasEditor;
