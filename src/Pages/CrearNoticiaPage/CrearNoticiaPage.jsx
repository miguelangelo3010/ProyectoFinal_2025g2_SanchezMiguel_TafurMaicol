// src/pages/CrearNoticiaPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../Firebase/ConfigFirebase";
import "./CrearNoticiaPage.css";

const CrearNoticiaPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("Tecnología");
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // ✅ Detectar usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  // 🧩 Función para crear noticia
  const handleCrearNoticia = async (e) => {
    e.preventDefault();
    if (!usuario) return alert("Debes iniciar sesión para crear una noticia.");

    try {
      setCargando(true);

      // 🔹 Subir imagen si existe
      let imagenURL = "";
      if (imagen) {
        const storageRef = ref(storage, `noticias/${Date.now()}_${imagen.name}`);
        await uploadBytes(storageRef, imagen);
        imagenURL = await getDownloadURL(storageRef);
      }

      // 🔹 Crear documento en Firestore
      await addDoc(collection(db, "noticias"), {
        titulo,
        subtitulo,
        contenido,
        categoria,
        imagen: imagenURL,
        autorId: usuario.uid,
        autorNombre: usuario.displayName || usuario.email,
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp(),
        estado: "Edición",
      });

      setMensaje("✅ Noticia creada correctamente.");
      setTitulo("");
      setSubtitulo("");
      setContenido("");
      setImagen(null);
      setTimeout(() => {
        navigate("/panel/reportero");
        }, 1500);

    } catch (error) {
      console.error("❌ Error al crear noticia:", error);
      setMensaje("Error al crear la noticia. Inténtalo nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="crear-noticia-container">
      <h2>📰 Crear nueva noticia</h2>

      <form onSubmit={handleCrearNoticia} className="crear-noticia-form">
        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label>Subtítulo</label>
        <input
          type="text"
          value={subtitulo}
          onChange={(e) => setSubtitulo(e.target.value)}
        />

        <label>Categoría</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Tecnología">Tecnología</option>
          <option value="Cultura">Cultura</option>
          <option value="Política">Política</option>
          <option value="Deportes">Deportes</option>
          <option value="Mundo">Mundo</option>
        </select>

        <label>Contenido</label>
        <textarea
          rows="5"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        ></textarea>

        <label>Imagen principal</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar Noticia"}
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default CrearNoticiaPage;
