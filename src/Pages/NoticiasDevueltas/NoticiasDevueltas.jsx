import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase/ConfigFirebase";
import { useNavigate, Link } from "react-router-dom";
import "./NoticiasDevueltas.css";
import HeaderReportero from "../../Components/HeaderReportero/HeaderReportero";

const NoticiasDevueltas = () => {
  const [usuario, setUsuario] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) navigate("/login");
      else {
        setUsuario(user);
        await obtenerNoticias(user.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const obtenerNoticias = async (userId) => {
    try {
      const noticiasRef = collection(db, "noticias");
      const q = query(
        noticiasRef,
        where("autorId", "==", userId),
        where("estado", "==", "Edición")
      );
      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((n) => n.ultimaDevolucion && n.ultimaDevolucion.mensaje);

      setNoticias(lista);
    } catch (error) {
      console.error("Error al obtener noticias devueltas:", error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <p className="loading">Cargando noticias...</p>;

  return (
    <>
      <HeaderReportero />
      <div className="devueltas-container">
        <h2>Noticias Devueltas</h2>
        <p className="descripcion">
          Aquí encontrarás las noticias que fueron devueltas por el editor con comentarios para corregir.
        </p>

        {noticias.length === 0 ? (
          <p className="sin-noticias">No tienes noticias devueltas por ahora.</p>
        ) : (
          <div className="devueltas-grid">
            {noticias.map((noticia) => {
              const puedeEditar = noticia.estado === "Edición";
              return (
                <div key={noticia.id} className="devuelta-card">
                  <h3>{noticia.titulo}</h3>

                  {noticia.ultimaDevolucion ? (
                    <div className="mensaje-devolucion">
                      <p className="mensaje-texto">
                        “{noticia.ultimaDevolucion.mensaje}”
                      </p>
                      <p className="mensaje-editor">
                        — <strong>{noticia.ultimaDevolucion.editorNombre}</strong>
                      </p>
                    </div>
                  ) : (
                    <p className="sin-mensaje">Sin mensaje registrado.</p>
                  )}

                  <div className="acciones">
                    {puedeEditar ? (
                      <Link
                        to={`/editar-noticia/${noticia.id}`}
                        className="btn-editar"
                      >
                        Editar noticia
                      </Link>
                    ) : (
                      <button className="btn-editar disabled" disabled>
                        Editar noticia
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default NoticiasDevueltas;
