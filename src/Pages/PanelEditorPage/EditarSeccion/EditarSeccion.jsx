
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Firebase/ConfigFirebase";
import HeaderEditor from "../../../Components/HeaderEditor/HeaderEditor.jsx";
import "./EditarSeccion.css";

const EditarSeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("activo");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  // Cargar datos de la sección
  useEffect(() => {
    const obtenerSeccion = async () => {
      try {
        const docRef = doc(db, "secciones", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setDescripcion(data.descripcion || "");
          setEstado(data.estado || "activo");
        } else {
          setMensaje("No se encontró la sección.");
        }
      } catch (error) {
        console.error("Error al obtener sección:", error);
        setMensaje("Error al cargar la sección.");
      } finally {
        setCargando(false);
      }
    };

    obtenerSeccion();
  }, [id]);

  //  Generar slug automáticamente
  const generarSlug = (texto) => {
    return texto
      .toLowerCase()
      .trim()
      .replace(/[áàäâ]/g, "a")
      .replace(/[éèëê]/g, "e")
      .replace(/[íìïî]/g, "i")
      .replace(/[óòöô]/g, "o")
      .replace(/[úùüû]/g, "u")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Guardar cambios
  const handleActualizar = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const docRef = doc(db, "secciones", id);
      await updateDoc(docRef, {
        nombre: nombre.trim(),
        slug: generarSlug(nombre),
        descripcion: descripcion.trim(),
        estado,
        fechaActualizacion: serverTimestamp(),
      });

      setMensaje(" Sección actualizada correctamente.");
      setTimeout(() => navigate("/panel/editor/secciones"), 1500);
    } catch (error) {
      console.error("Error al actualizar sección:", error);
      setMensaje(" Error al guardar los cambios.");
    }
  };

  if (cargando) return <p className="loading">Cargando sección...</p>;

  return (
    <div className="panel-editor-container">
      <HeaderEditor />

      <header className="panel-header">
        <h1 className="titulo-panel">✏️ Editar Sección</h1>
        <p className="descripcion">Modifica los datos de esta sección.</p>
      </header>

      <form onSubmit={handleActualizar} className="form-seccion">
        <label>Nombre de la sección</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>

        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button type="submit" className="btn-guardar">
          Guardar Cambios
        </button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default EditarSeccion;
