import React from "react";
import "./NoticiaDestacada.css";
import { Link } from "react-router-dom";

const NoticiaDestacada = ({ noticia }) => {
  return (
    <div className="noticia-destacada-card">
      {noticia.imagen && (
        <img src={noticia.imagen} alt={noticia.titulo} className="destacada-img" />
      )}
      <div className="destacada-content">
        <h2>{noticia.titulo}</h2>
        <p>{noticia.subtitulo}</p>
        <Link to={`/noticia/${noticia.id}`} className="btn-leer">
          Leer más 
        </Link>
      </div>
    </div>
  );
};

export default NoticiaDestacada;
