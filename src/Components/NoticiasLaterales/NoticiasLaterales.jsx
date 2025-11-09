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
        const q = query(
          collection(db, "noticias"),
          where("estado", "==", "Publicado"),
          orderBy("fechaActualizacion", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(lista);
      } catch (error) {
        console.error("Error al cargar las noticias laterales:", error);
        setNoticias([]); 
      }
    };
    obtenerNoticias();
  }, []);

  return (
    <aside className="noticias-laterales" aria-label="Últimas noticias">
      <h3 className="nl__title">Últimas noticias</h3>

      {noticias.length === 0 ? (
        <p className="nl__empty">No hay noticias disponibles.</p>
      ) : (
        <ul className="nl__list">
          {noticias.map((noticia) => {
            const imgSrc =
              noticia.imagen && typeof noticia.imagen === "string" && noticia.imagen.trim().length > 0
                ? noticia.imagen
                : "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop"; // fallback simple

            return (
              <li
                key={noticia.id}
                className="nl__item"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/noticia/${noticia.id}`)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/noticia/${noticia.id}`)}
                title={noticia.titulo}
              >
                <div className="nl__thumb">
                  <img src={imgSrc} alt={noticia.titulo} loading="lazy" />
                </div>
                <div className="nl__meta">
                  <span className="nl__tag">{noticia.categoria || "General"}</span>
                  <h4 className="nl__headline">{noticia.titulo}</h4>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};

export default NoticiasLaterales;

