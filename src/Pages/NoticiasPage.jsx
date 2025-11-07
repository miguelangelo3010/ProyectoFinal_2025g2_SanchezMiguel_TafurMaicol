// src/pages/NoticiasPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/ConfigFirebase';
import Noticia from '../Components/Noticia/Noticia.jsx';
import './NoticiasPage.css';

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNoticiasPublicadas = async () => {
      try {
        // 🔍 Solo obtener noticias con estado "Publicado"
        const noticiasRef = collection(db, 'noticias');
        const q = query(noticiasRef, where('estado', '==', 'Publicado'));
        const querySnapshot = await getDocs(q);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNoticias(lista);
      } catch (error) {
        console.error('Error al obtener las noticias:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerNoticiasPublicadas();
  }, []);

  if (cargando) return <p>Cargando noticias...</p>;

  return (
    <div className="noticias-container">
      <h2>📰 Noticias Recientes</h2>
      <div className="noticias-grid">
        {noticias.length > 0 ? (
          noticias.map((noticia) => <Noticia key={noticia.id} noticia={noticia} />)
        ) : (
          <p>No hay noticias publicadas aún.</p>
        )}
      </div>
    </div>
  );
};

export default NoticiasPage;
