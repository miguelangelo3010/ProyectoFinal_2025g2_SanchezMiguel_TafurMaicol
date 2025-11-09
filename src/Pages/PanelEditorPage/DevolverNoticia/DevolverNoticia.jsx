import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../Firebase/ConfigFirebase";
import "./DevolverNoticia.css";

const DevolverNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [noticia, setNoticia] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) navigate("/login");
      else setUsuario(user);
    });
    return () => unsubscribe();
  }, [navigate]);

  // Cargar noticia
  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setNoticia({ id: docSnap.id, ...docSnap.data() });
      } catch (error) {
        console.error("Error al obtener la noticia:", error);
      }
    };
    obtenerNoticia();
  }, [id]);

  const handleDevolver = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || !usuario) return alert("Debes escribir un mensaje.");

    setGuardando(true);
    try {
      // Subcolección de devoluciones
      const devolucionesRef = collection(db, "noticias", id, "devoluciones");
      await addDoc(devolucionesRef, {
        editorId: usuario.uid,
        editorNombre: usuario.displayName || usuario.email,
        mensaje,
        fecha: serverTimestamp(),
      });

      // Actualizar la noticia principal
      const docRef = doc(db, "noticias", id);
      await updateDoc(docRef, {
        estado: "Edición",
        ultimaDevolucion: {
          editorId: usuario.uid,
          editorNombre: usuario.displayName || usuario.email,
          mensaje,
          fecha: serverTimestamp(),
        },
        fechaActualizacion: serverTimestamp(),
      });

      alert("Noticia devuelta al reportero.");
      navigate("/panel/editor");
    } catch (error) {
      console.error("Error al devolver noticia:", error);
      alert("Error al devolver la noticia.");
    } finally {
      setGuardando(false);
    }
  };

  if (!noticia) return <p className="loading">Cargando noticia...</p>;

  return (
    <div className="devolver-container">
      <h2>Devolver noticia al reportero</h2>
      <p><strong>Título:</strong> {noticia.titulo}</p>
      <p><strong>Subtítulo:</strong> {noticia.subtitulo || "(sin subtítulo)"}</p>

      <form onSubmit={handleDevolver} className="devolver-form">
        <label>Mensaje para el reportero:</label>
        <textarea
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={6}
          placeholder="Explica qué ajustes o mejoras se deben realizar..."
        ></textarea>

        <div className="acciones">
          <button type="submit" disabled={guardando}>
            {guardando ? "Enviando..." : "Enviar y devolver"}
          </button>
          <button type="button" onClick={() => navigate("/panel/editor")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DevolverNoticia;
