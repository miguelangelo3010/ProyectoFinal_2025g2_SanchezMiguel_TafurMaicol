import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import { Carousel } from "react-bootstrap";
import "./CarouselNoticias.css";

const CarouselNoticias = () => {
    const navigate = useNavigate();
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        // solo noticias publicadas
        const q = query(collection(db, "noticias"), where("estado", "==", "Publicado"));
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(lista);
      } catch (error) {
        console.error("Error al cargar las noticias del carrusel:", error);
      }
    };
    obtenerNoticias();
  }, []);

  if (noticias.length === 0) return null; 

  return (
    <div className="carousel-noticias-container">
      <Carousel fade interval={4000}>
        {noticias.map((noticia) => (
<Carousel.Item key={noticia.id}>
  <div
    className="carousel-slide"
    style={{
      backgroundImage: `url(${noticia.imagen})`,
    }}
  >
    <div className="carousel-content">
      {/* Imagen a la izquierda */}
      <div className="carousel-img-container">
        <img
          className="carousel-img"
          src={noticia.imagen}
          alt={noticia.titulo}
        />
      </div>

      {/* Texto a la derecha */}
      <div className="carousel-text">
        <h2>{noticia.titulo}</h2>
        <p>{noticia.subtitulo}</p>
          <button
            onClick={() => navigate(`/noticia/${noticia.id}`)}
            className="noticia-btn btn-primario"
          >
            Leer más
          </button>
      </div>
    </div>
  </div>
</Carousel.Item>


        ))}
      </Carousel>
    </div>
  );
};

export default CarouselNoticias;
