// src/pages/HomePage.jsx
import React from 'react';
import Header from '../../Components/Header/Header';
import NavSecciones from '../../Components/NavSecciones/NavSecciones';
import CarouselNoticias from '../../Components/CarouselNoticias/CarouselNoticias'; // ✅ nuevo
import NoticiasPage from '../NoticiasPage';
import NoticiasLaterales from '../../Components/NoticiasLaterales/NoticiasLaterales'; // ✅ nuevo
import './HomePage.css';
import Footer from '../../Components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      
      <CarouselNoticias /> 
      <NavSecciones />
      <main className='Main'>
        <NoticiasPage />
<NoticiasLaterales />
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
