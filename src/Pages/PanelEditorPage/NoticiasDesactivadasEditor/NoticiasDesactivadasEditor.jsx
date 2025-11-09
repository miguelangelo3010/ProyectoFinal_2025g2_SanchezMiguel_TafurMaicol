import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../Firebase/ConfigFirebase";
import Noticia from "../../../Components/Noticia/Noticia.jsx";
import HeaderEditor from "../../../Components/HeaderEditor/HeaderEditor.jsx";
import "./NoticiasDesactivadasEditor.css";

const NoticiasDesactivadasEditor = () => {
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

  //  Obtener noticias desactivadas por el editor autenticado
  const obtenerNoticias = async (editorId) => {
    try {
      const noticiasRef = collection(db, "noticias");
      const q = query(
        noticiasRef,
        where("estado", "==", "Desactivada"),
        where("aprobadoPor", "==", editorId)
      );

      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNoticias(lista);
    } catch (error) {
      console.error("Error al obtener noticias desactivadas:", error);
    }
  };

  //  Reactivar noticia 
  const handleReactivar = async (id) => {
    try {
      const docRef = doc(db, "noticias", id);
      await updateDoc(docRef, {
        estado: "Publicado",
        fechaActualizacion: serverTimestamp(),
      });

      setNoticias((prev) => prev.filter((n) => n.id !== id));
      setMensaje("Noticia reactivada correctamente.");
      setTimeout(() => setMensaje(""), 2000);
    } catch (error) {
      console.error("Error al reactivar noticia:", error);
      setMensaje("Error al reactivar la noticia.");
    }
  };

  if (cargando) return <p className="loading">Cargando noticias desactivadas...</p>;

  return (
    <>
    <HeaderEditor />
    <div className="panel-editor-container">
      

      <header className="panel-header">
        <h1 className="titulo-panel">Noticias Desactivadas</h1>
        {usuario && (
          <h2 className="saludo">
            Desactivadas por <span>{usuario.displayName || usuario.email}</span>
          </h2>
        )}
      </header>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {noticias.length === 0 ? (
        <p className="sin-noticias">No tienes noticias desactivadas actualmente.</p>
      ) : (
        <div className="noticias-grid">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="noticia-card-wrapper">
              <Noticia noticia={noticia} />
              <button
                onClick={() => handleReactivar(noticia.id)}
                className="btn-reactivar"
              >
                Reactivar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default NoticiasDesactivadasEditor;
