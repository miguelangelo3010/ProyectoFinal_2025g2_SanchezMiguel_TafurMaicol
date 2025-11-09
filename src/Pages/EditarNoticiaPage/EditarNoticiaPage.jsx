import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../Firebase/ConfigFirebase";
import { onAuthStateChanged } from "firebase/auth";
import "./EditarNoticiaPage.css";

const EditarNoticiaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState("");
  const [noticia, setNoticia] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  // Verificar autenticación y rol
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);

        // Obtener rol desde Firestore
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRol(userSnap.data().rol);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Cargar datos de la noticia
  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNoticia({ id: docSnap.id, ...docSnap.data() });
        } else {
          setMensaje("No se encontró la noticia.");
        }
      } catch (error) {
        console.error("Error al cargar la noticia:", error);
        setMensaje("Error al cargar la noticia.");
      } finally {
        setCargando(false);
      }
    };

    obtenerNoticia();
  }, [id]);

  // Actualizar noticia
  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      setMensaje("");
      const docRef = doc(db, "noticias", id);
      await updateDoc(docRef, {
        titulo: noticia.titulo,
        subtitulo: noticia.subtitulo,
        categoria: noticia.categoria,
        contenido: noticia.contenido,
        imagen: noticia.imagen || "",
        fechaActualizacion: serverTimestamp(),
      });

      setMensaje("Noticia actualizada correctamente.");

      // Redirigir según rol
      setTimeout(() => {
        if (rol === "editor") {
          navigate("/panel/editor");
        } else {
          navigate("/panel/reportero");
        }
      }, 1200);
    } catch (error) {
      console.error("Error al actualizar noticia:", error);
      setMensaje("Error al actualizar la noticia.");
    }
  };

  if (cargando) return <p>Cargando noticia...</p>;
  if (!noticia) return <p>No hay noticia para editar.</p>;

  return (
    <div className="editar-noticia-container">
      <h2>Editar Noticia</h2>

      <form onSubmit={handleActualizar} className="editar-form">
        <label>Título</label>
        <input
          type="text"
          value={noticia.titulo || ""}
          onChange={(e) => setNoticia({ ...noticia, titulo: e.target.value })}
          required
        />

        <label>Subtítulo</label>
        <input
          type="text"
          value={noticia.subtitulo || ""}
          onChange={(e) => setNoticia({ ...noticia, subtitulo: e.target.value })}
        />

        <label>Categoría</label>
        <select
          value={noticia.categoria || ""}
          onChange={(e) => setNoticia({ ...noticia, categoria: e.target.value })}
        >
          <option value="Tecnología">Tecnología</option>
          <option value="Cultura">Cultura</option>
          <option value="Política">Política</option>
          <option value="Deportes">Deportes</option>
          <option value="Salud">Salud</option>
          <option value="Mundo">Mundo</option>
          <option value="Economía">Economía</option>
          <option value="Arte">Arte</option>
        </select>

        <label>URL de la imagen</label>
        <input
          type="text"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={noticia.imagen || ""}
          onChange={(e) => setNoticia({ ...noticia, imagen: e.target.value })}
        />

        {noticia.imagen && (
          <div className="preview-imagen">
            <img
              src={noticia.imagen}
              alt="Vista previa"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        <label>Contenido</label>
        <textarea
          rows="6"
          value={noticia.contenido || ""}
          onChange={(e) => setNoticia({ ...noticia, contenido: e.target.value })}
          required
        ></textarea>

        <div className="acciones">
          <button type="submit" className="btn-guardar">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() =>
              rol === "editor"
                ? navigate("/panel/editor")
                : navigate("/panel/reportero")
            }
          >
            Cancelar
          </button>
        </div>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default EditarNoticiaPage;
