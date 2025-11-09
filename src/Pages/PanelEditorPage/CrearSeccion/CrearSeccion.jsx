import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Firebase/ConfigFirebase.js";
import HeaderEditor from "../../../Components/HeaderEditor/HeaderEditor.jsx";
import { useNavigate } from "react-router-dom";
import "./CrearSeccion.css";

const CrearSeccion = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("activo");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

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

  const handleCrearSeccion = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) {
      setMensaje(" Todos los campos son obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "secciones"), {
        nombre: nombre.trim(),
        slug: generarSlug(nombre),
        descripcion: descripcion.trim(),
        estado,
        fechaCreacion: serverTimestamp(),
      });

      setMensaje("Sección creada correctamente.");
      setTimeout(() => navigate("/panel/editor/secciones"), 1500);
    } catch (error) {
      console.error("Error al crear sección:", error);
      setMensaje("Error al guardar la sección.");
    }
  };

  return (
    <div className="panel-editor-container">
      <HeaderEditor />

      <header className="panel-header">
        <h1 className="titulo-panel">Crear Nueva Sección</h1>
        <p className="descripcion">
          Completa los campos para registrar una nueva sección en el portal de noticias.
        </p>
      </header>

      <form onSubmit={handleCrearSeccion} className="form-seccion">
        <label>Nombre de la sección</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Tecnología"
          required
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe brevemente la temática de esta sección"
          required
        ></textarea>

        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button type="submit" className="btn-guardar">
          Guardar Sección
        </button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default CrearSeccion;
