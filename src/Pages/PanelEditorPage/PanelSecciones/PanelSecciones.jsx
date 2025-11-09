import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/ConfigFirebase";
import { Link } from "react-router-dom";
import HeaderEditor from "../../../Components/HeaderEditor/HeaderEditor.jsx";
import "./PanelSecciones.css";

const PanelSecciones = () => {
  const [secciones, setSecciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerSecciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "secciones"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSecciones(lista);
      } catch (error) {
        console.error("Error al obtener secciones:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerSecciones();
  }, []);

  // Función para eliminar una sección
  const handleEliminarSeccion = async (id, nombre) => {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar la sección "${nombre}"?`);
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "secciones", id));
      setSecciones((prev) => prev.filter((s) => s.id !== id)); 
      setMensaje(`🗑️ Sección "${nombre}" eliminada correctamente.`);
      setTimeout(() => setMensaje(""), 2500);
    } catch (error) {
      console.error("Error al eliminar sección:", error);
      setMensaje("Error al eliminar la sección.");
    }
  };

  if (cargando) return <p className="loading">Cargando secciones...</p>;

  return (
    <>
    <HeaderEditor />
    <div className="panel-editor-container">
      

      <header className="panel-header">
        <h1 className="titulo-panel">Gestión de Secciones</h1>
        <p className="descripcion">
          Aquí puedes ver, editar o eliminar las secciones disponibles.
        </p>
      </header>

      {mensaje && <p className="mensaje">{mensaje}</p>}
                <Link to="/panel/editor/secciones/nueva" className="btn-crear">
  Nueva Sección
</Link>

      <table className="tabla-secciones">

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {secciones.length > 0 ? (
            secciones.map((sec) => (
              <tr key={sec.id}>
                <td>{sec.nombre}</td>
                <td>{sec.slug}</td>
                <td>{sec.descripcion}</td>
                <td
                  className={`estado ${
                    sec.estado === "activo" ? "activo" : "inactivo"
                  }`}
                >
                  {sec.estado}
                </td>
                <td>
                  {sec.fechaCreacion?.toDate
                    ? sec.fechaCreacion.toDate().toLocaleDateString()
                    : typeof sec.fechaCreacion === "string"
                    ? sec.fechaCreacion
                    : "—"}
                </td>
                <td>
                  <button className="btn-editar">
                    <Link to={`/panel/editor/secciones/editar/${sec.id}`}>Editar</Link>
                  </button>

                  {/*Botón de eliminar con evento */}
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminarSeccion(sec.id, sec.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay secciones registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default PanelSecciones;
