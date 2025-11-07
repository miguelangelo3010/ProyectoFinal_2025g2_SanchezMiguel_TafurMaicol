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
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/ProyectoFinal_2025g2_SanchezMiguel_TafurMaicol">
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

