// src/pages/PanelReportero.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase/ConfigFirebase";
import Noticia from "../../Components/Noticia/Noticia.jsx";
import HeaderReportero from "../../Components/HeaderReportero/HeaderReportero.jsx";
import { Link } from "react-router-dom";
import "./PanelReportero.css";

const PanelReportero = () => {
  const [usuario, setUsuario] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 🧩 Detectar usuario activo
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        // 🔍 Buscar solo las noticias del autor actual
        const noticiasRef = collection(db, "noticias");
        const q = query(noticiasRef, where("autorId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(lista);
      } else {
        // Si no hay sesión, redirige al login
        window.location.href = "/login";
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) return <p className="loading">Cargando noticias...</p>;

  return (

    <div className="panel-container">
      <HeaderReportero />

      <header className="panel-header">

        {usuario && <h2>Bienvenido Reportero, {usuario.displayName || usuario.email}</h2>}
              <div>
        <p>holaaa este es un rexto</p>
      </div>

        <Link to="/crear-noticia" className="btn-crear">
          ➕ Crear nueva noticia
        </Link>
      </header>



      {noticias.length === 0 ? (
        <p className="sin-noticias">No has creado ninguna noticia todavía.</p>
      ) : (
        <div className="noticias-grid">
          {noticias.map((noticia) => (
            <Noticia key={noticia.id} noticia={noticia} modoReportero={true} />
          ))}
        </div>

      )}
    </div>
  );
};

export default PanelReportero;
