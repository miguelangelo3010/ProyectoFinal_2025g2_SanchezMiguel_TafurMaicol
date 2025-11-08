// src/components/CarouselNoticias/CarouselNoticias.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/ConfigFirebase";
import { Carousel } from "react-bootstrap";
import "./CarouselNoticias.css";

const CarouselNoticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        // 🔹 Trae solo noticias publicadas
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

  if (noticias.length === 0) return null; // No renderiza nada si no hay noticias

  return (
    <div className="carousel-noticias-container">
      <Carousel fade interval={4000}>
        {noticias.map((noticia) => (
          <Carousel.Item key={noticia.id}>
            <img
              className="d-block w-100 carousel-img"
              src={noticia.imagen}
              alt={noticia.titulo}
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h3>{noticia.titulo}</h3>
              <p>{noticia.subtitulo}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselNoticias;
