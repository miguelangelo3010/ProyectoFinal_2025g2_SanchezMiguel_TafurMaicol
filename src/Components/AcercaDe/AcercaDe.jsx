import "./AcercaDe.css";
import { FaNewspaper, FaUsers, FaClock, FaGlobeAmericas } from "react-icons/fa";
import historiaImg from "../../Assets/historia.png";
import funcionamientoImg from "../../Assets/funcionalidad.jpg";
import equipoImg from "../../Assets/equipo.webp";

const AcercaDe = () => {
  return (
    <section className="acerca-container" id="acerda-de">
      <h2 className="acerca-titulo">Acerca de Nosotros</h2>

      {/* --- Sección 1: Historia --- */}
      <div className="acerca-bloque">
        <img
          src={historiaImg}
          alt="Historia de El Ahora"
          className="acerca-img"
        />
        <div className="acerca-texto">
          <h3><FaClock /> Nuestra Historia</h3>
          <p>
            El Ahora nació como una iniciativa universitaria dedicada a la comunicación
            transparente y responsable. Desde nuestros primeros artículos en formato impreso,
            hemos evolucionado hacia una plataforma digital moderna que busca mantenerte
            informado con rigor, imparcialidad y compromiso social.
          </p>
        </div>
      </div>

      {/* --- Sección 2: Cómo funciona --- */}
      <div className="acerca-bloque invertido">
        <div className="acerca-texto">
          <h3><FaGlobeAmericas /> Cómo Funciona</h3>
          <p>
            Nuestra red de reporteros y editores trabaja en conjunto para garantizar que cada
            noticia sea verificada y publicada con los más altos estándares periodísticos.
            Utilizamos tecnología moderna y un sistema colaborativo que permite a los reporteros
            subir sus noticias y a los editores revisarlas antes de su publicación.
          </p>
        </div>
        <img
          src={funcionamientoImg}
          alt="Cómo funciona El Ahora"
          className="acerca-img"
        />
      </div>

      {/* --- Sección 3: Equipo --- */}
      <div className="acerca-bloque">
        <img
          src={equipoImg}
          alt="Nuestro equipo"
          className="acerca-img"
        />
        <div className="acerca-texto">
          <h3><FaUsers /> Nuestro Equipo</h3>
          <p>
            Contamos con un equipo diverso de estudiantes, docentes y profesionales del
            periodismo y la tecnología, comprometidos con ofrecerte información veraz,
            innovadora y accesible para todos.
          </p>
        </div>
      </div>

      {/* --- Sección 4: Misión y Visión --- */}
      <div className="acerca-mision">
        <h3><FaNewspaper /> Misión y Visión</h3>
        <p>
          Nuestra misión es promover un periodismo responsable, participativo y educativo
          que sirva como herramienta de cambio social.  
          Nuestra visión es consolidarnos como el principal medio digital universitario
          del sur de Colombia, destacando por su ética, innovación y compromiso con la verdad.
        </p>
      </div>
    </section>
  );
};

export default AcercaDe;
