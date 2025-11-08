// src/Components/NoticiasLaterales/NoticiasLaterales.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import { useNavigate } from "react-router-dom";
import "./NoticiasLaterales.css";

const NoticiasLaterales = () => {
  const [noticias, setNoticias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        // 🔹 Solo las publicadas, ordenadas por fecha más reciente
        const q = query(
          collection(db, "noticias"),
          where("estado", "==", "Publicado"),
          orderBy("fechaActualizacion", "desc"),
          limit(10) // muestra solo las 10 más recientes
        );
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(lista);
      } catch (error) {
        console.error("Error al cargar las noticias laterales:", error);
      }
    };
    obtenerNoticias();
  }, []);

  return (
    <aside className="noticias-laterales">
      <h3>🗞️ Últimas noticias</h3>
      {noticias.length === 0 ? (
        <p>No hay noticias disponibles.</p>
      ) : (
        <ul>
          {noticias.map((noticia) => (
            <li
              key={noticia.id}
              className="noticia-item"
              onClick={() => navigate(`/noticia/${noticia.id}`)}
            >
              <img src={noticia.imagen} alt={noticia.titulo} />
              <span>{noticia.titulo}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default NoticiasLaterales;
