import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase/ConfigFirebase";
import Noticia from "../../Components/Noticia/Noticia.jsx";
import HeaderReportero from "../../Components/HeaderReportero/HeaderReportero.jsx";
import { Link } from "react-router-dom";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  Button,
} from "@mui/material";
import "./PanelReportero.css";

const PanelReportero = () => {
  const [usuario, setUsuario] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //Detectar usuario activo
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        await obtenerNoticias(user.uid);
      } else {
        navigate("/login");
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const obtenerNoticias = async (uid) => {
    const noticiasRef = collection(db, "noticias");
    const q = query(noticiasRef, where("autorId", "==", uid));
    const querySnapshot = await getDocs(q);

    const lista = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNoticias(lista);
    setNoticiasFiltradas(lista);
  };

  // Filtro dinámico por estado o búsqueda
  useEffect(() => {
    let filtradas = noticias;

    if (estadoFiltro !== "Todos") {
      filtradas = filtradas.filter((n) => n.estado === estadoFiltro);
    }

    if (busqueda.trim() !== "") {
      const texto = busqueda.toLowerCase();
      filtradas = filtradas.filter((n) =>
        n.titulo.toLowerCase().includes(texto)
      );
    }

    setNoticiasFiltradas(filtradas);
  }, [estadoFiltro, busqueda, noticias]);

  if (cargando) return <p className="loading">Cargando noticias...</p>;

  return (
    <>
    <HeaderReportero />
    <div className="panel-container">
      

      <header className="panel-header">
        {usuario && (
          <Typography variant="h5" sx={{ mt: 2 }}>
            Bienvenido Reportero,{" "}
            <strong>{usuario.displayName || usuario.email}</strong>
          </Typography>
        )}


      </header>

      {/*Controles de filtro y búsqueda */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
          mt: 3,
          px: 3,
        }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filtrar por estado</InputLabel>
          <Select
            value={estadoFiltro}
            label="Filtrar por estado"
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Edición">Edición</MenuItem>
            <MenuItem value="Terminado">Terminado</MenuItem>
            <MenuItem value="Publicado">Publicado</MenuItem>
            <MenuItem value="Desactivada">Desactivada</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Buscar noticia..."
          variant="outlined"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 240 }}
        />
                      <Link to="/crear-noticia" className="btn-crear">
          Crear nueva noticia
        </Link>
      </Box>

      {/* Listado de noticias */}

      {noticiasFiltradas.length === 0 ? (
        <p className="sin-noticias">No hay noticias que coincidan.</p>
      ) : (
        <div className="noticias-grid">
          {noticiasFiltradas.map((noticia) => (
            <Noticia key={noticia.id} noticia={noticia} modoReportero={true} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default PanelReportero;
