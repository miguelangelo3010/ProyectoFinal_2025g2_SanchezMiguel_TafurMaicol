import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import NoticiasPage from "./Pages/NoticiasPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import RegistroPage from "./Pages/RegistroPage/RegistroPage.jsx";
import PanelReportero from "./Pages/PanelReportero/PanelReportero.jsx";
import CrearNoticiaPage from "./Pages/CrearNoticiaPage/CrearNoticiaPage.jsx";
import EditarNoticiaPage from "./Pages/EditarNoticiaPage/EditarNoticiaPage.jsx";
import PanelEditorPage from "./Pages/PanelEditorPage/PanelEditorPage.jsx";
import NoticiasPublicadasEditor from "./Pages/PanelEditorPage/NoticiasPublicadasEditor/NoticiasPublicadasEditor.jsx";
import NoticiasDesactivadasEditor from "./Pages/PanelEditorPage/NoticiasDesactivadasEditor/NoticiasDesactivadasEditor.jsx";
import PanelSecciones from "./Pages/PanelEditorPage/PanelSecciones/PanelSecciones.jsx";
import CrearSeccion from "./Pages/PanelEditorPage/CrearSeccion/CrearSeccion.jsx";
import EditarSeccion from "./Pages/PanelEditorPage/EditarSeccion/EditarSeccion.jsx";
import NoticiasPorSeccion from "./Pages/NoticiasPorSeccion/NoticiasPorSeccion.jsx";
import NoticiaDetalle from "./Pages/NoticiaDetalle/NoticiaDetalle.jsx";
import DevolverNoticia from "./Pages/PanelEditorPage/DevolverNoticia/DevolverNoticia.jsx";
import NoticiasDevueltas from "./Pages/NoticiasDevueltas/NoticiasDevueltas.jsx";

function App() {
  const base = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={base}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/panel/reportero" element={<PanelReportero />} />
        <Route path="/crear-noticia" element={<CrearNoticiaPage />} />
        <Route path="/editar-noticia/:id" element={<EditarNoticiaPage />} />
        <Route path="/panel/editor" element={<PanelEditorPage />} />
        <Route path="/panel/editor/publicadas" element={<NoticiasPublicadasEditor />} />
        <Route path="/panel/editor/desactivadas" element={<NoticiasDesactivadasEditor />} />
        <Route path="/panel/editor/secciones" element={<PanelSecciones />} />
        <Route path="/panel/editor/secciones/nueva" element={<CrearSeccion />} />
        <Route path="/panel/editor/secciones/editar/:id" element={<EditarSeccion />} />
        <Route path="/seccion/:nombreSeccion" element={<NoticiasPorSeccion />} />
        <Route path="/noticia/:id" element={<NoticiaDetalle />} />
        <Route path="/panel/editor/devolver/:id" element={<DevolverNoticia />} />
        <Route path="/panel/reportero/devueltas" element={<NoticiasDevueltas />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
