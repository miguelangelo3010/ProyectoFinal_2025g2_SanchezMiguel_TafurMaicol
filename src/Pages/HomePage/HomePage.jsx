import Header from '../../Components/Header/Header';
import NavSecciones from '../../Components/NavSecciones/NavSecciones';
import CarouselNoticias from '../../Components/CarouselNoticias/CarouselNoticias'; 
import NoticiasPage from '../NoticiasPage';
import NoticiasLaterales from '../../Components/NoticiasLaterales/NoticiasLaterales'; 
import './HomePage.css';
import Footer from '../../Components/Footer/Footer';
import AcerdaDe from '../../Components/AcercaDe/AcercaDe';

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
      <AcerdaDe />

      <Footer/>
    </div>
  );
};

export default HomePage;
