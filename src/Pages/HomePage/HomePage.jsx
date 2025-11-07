// src/pages/HomePage.jsx
import React from 'react';
import Header from '../../Components/Header/Header';
import NavSecciones from '../../Components/NavSecciones/NavSecciones';
import NoticiasPage from'../NoticiasPage'
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Header />
      <NavSecciones />
      <main className='Main'>
        <NoticiasPage />
        <div className='nav-info'>
          <h3>ℹ️ Información</h3>
          <p>Bienvenido a nuestro portal de noticias. Aquí encontrarás las últimas novedades en diversas categorías como Tecnología, Salud, Deportes, Entretenimiento y más. Navega por las secciones utilizando el menú de navegación para descubrir artículos interesantes y mantenerse informado sobre los eventos actuales.</p>
          <p>No olvides registrarte o iniciar sesión para acceder a funciones adicionales como crear noticias si eres reportero. ¡Gracias por visitarnos!</p>
        </div>

      </main>
    </div>
  );
};

export default HomePage;
