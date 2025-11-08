// src/pages/CrearNoticiaPage.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../Firebase/ConfigFirebase";
import { onAuthStateChanged } from "firebase/auth";
import "./CrearNoticiaPage.css";

const CrearNoticiaPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [secciones, setSecciones] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // 🧩 Obtener usuario actual
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUsuario(user);
      else window.location.href = "/login";
    });
  }, []);

  // 🗂️ Cargar secciones activas desde Firestore
  useEffect(() => {
    const obtenerSecciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "secciones"));
        const lista = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sec) => sec.estado === "activo"); // 👈 solo activas
        setSecciones(lista);
      } catch (error) {
        console.error("Error al cargar secciones:", error);
      }
    };
    obtenerSecciones();
  }, []);

  // 📰 Guardar noticia
  const handleCrearNoticia = async (e) => {
    e.preventDefault();

    if (!titulo.trim() || !contenido.trim() || !categoria) {
      setMensaje("⚠️ Todos los campos son obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "noticias"), {
        titulo,
        subtitulo,
        contenido,
        categoria,
        imagen,
        autorId: usuario.uid,
        autorNombre: usuario.displayName || usuario.email,
        estado: "Edición",
        fechaCreacion: serverTimestamp(),
      });

      setMensaje("✅ Noticia creada correctamente.");
      setTimeout(() => navigate("/panel/reportero"), 1500);
    } catch (error) {
      console.error("Error al crear noticia:", error);
      setMensaje("❌ Error al guardar la noticia.");
    }
  };

  return (
    <div className="crear-noticia-container">
      <h1>📰 Crear Nueva Noticia</h1>

      <form onSubmit={handleCrearNoticia}>
        <label>Título</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

        <label>Subtítulo</label>
        <input value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} />

        <label>Categoría (Sección)</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecciona una sección</option>
          {secciones.map((sec) => (
            <option key={sec.id} value={sec.nombre}>
              {sec.nombre}
            </option>
          ))}
        </select>

        <label>Imagen (URL)</label>
        <input
          type="text"
          placeholder="https://..."
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <label>Contenido</label>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows="5"
          required
        ></textarea>

        <button type="submit">💾 Guardar Noticia</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default CrearNoticiaPage;
