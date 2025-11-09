import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import Noticia from "../../Components/Noticia/Noticia.jsx";
import Header from "../../Components/Header/Header.jsx";
import NavSecciones from "../../Components/NavSecciones/NavSecciones.jsx";
import NoticiaDestacada from "../../Components/NoticiaDestacada/NoticiaDestacada.jsx";
import "./NoticiasPorSeccion.css";

const NoticiasPorSeccion = () => {
  const { nombreSeccion } = useParams();
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const noticiasRef = collection(db, "noticias");
        const seccionNormalizada =
          nombreSeccion.charAt(0).toUpperCase() + nombreSeccion.slice(1).toLowerCase();

        const q = query(
          noticiasRef,
          where("categoria", "==", seccionNormalizada),
          where("estado", "==", "Publicado")
        );

        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNoticias(lista);
      } catch (error) {
        console.error("Error al obtener noticias por sección:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerNoticias();
  }, [nombreSeccion]);

  if (cargando) return <p className="loading">Cargando noticias...</p>;

  return (
    <div>
      <Header />
      <NavSecciones />

      <main className="noticias-seccion">
        <h2>
          Noticias de{" "}
          {nombreSeccion.charAt(0).toUpperCase() + nombreSeccion.slice(1)}
        </h2>


        {noticias.length === 0 ? (
          <p className="sin-noticias">
            No hay noticias publicadas en esta sección.
          </p>
        ) : (
          <>
            {noticias.length > 0 && (
              <NoticiaDestacada noticia={noticias[0]} />
            )}

            <div className="noticias-grid">
              {noticias.slice(1).map((noticia) => (
                <Noticia key={noticia.id} noticia={noticia} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default NoticiasPorSeccion;
