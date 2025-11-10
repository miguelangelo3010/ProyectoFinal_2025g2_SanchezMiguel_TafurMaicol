import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../Firebase/ConfigFirebase";
import Noticia from "../../Components/Noticia/Noticia.jsx";
import HeaderEditor from "../../Components/HeaderEditor/HeaderEditor.jsx";


const PanelEditor = () => {
    const [usuario, setUsuario] = useState(null);
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        //  Detectar usuario logueado
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUsuario(user);
                await obtenerNoticias();
            } else {
                navigate("/login");
            }
            setCargando(false);
        });

        return () => unsubscribe();
    }, []);

    // Obtener solo noticias con estado "Terminado"
    const obtenerNoticias = async () => {
        try {
            const noticiasRef = collection(db, "noticias");
            const q = query(noticiasRef, where("estado", "==", "Terminado"));
            const querySnapshot = await getDocs(q);
            const lista = querySnapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));
            setNoticias(lista);
        } catch (error) {
            console.error("Error al obtener noticias:", error);
        }
    };



const handlePublicar = async (id) => {
  try {
    if (!usuario) return alert("No hay editor autenticado.");

    const docRef = doc(db, "noticias", id);
await updateDoc(docRef, {
  estado: "Publicado",
  fechaActualizacion: serverTimestamp(),
  aprobadoPor: usuario.uid,
  editorNombre: usuario.displayName || usuario.email,
});



    setNoticias((prev) =>
      prev.map((n) => (n.id === id ? { ...n, estado: "Publicado", aprobadoPor: usuario.uid } : n))
    );

    setMensaje(" Noticia publicada correctamente.");
    setTimeout(() => setMensaje(""), 2000);
    await obtenerNoticias();
  } catch (error) {
    console.error("Error al publicar noticia:", error);
    setMensaje(" Error al publicar la noticia.");
  }
};


    if (cargando) return <p className="loading">Cargando noticias...</p>;

    return (
        <>
        <HeaderEditor />
        <div className="panel-editor-container">
            
            <header className="panel-header">

                {usuario && (
                    <h2 className="titulo-panel">
                        Bienvenido Editor,{" "}
                        <span>{usuario.displayName || usuario.email}</span>
                    </h2>
                )}
            </header>

            <p className="descripcion">
                Estas son las noticias enviadas por los reporteros. Puedes revisarlas y publicarlas.
            </p>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            {noticias.length === 0 ? (
                <p className="sin-noticias">No hay noticias pendientes de revisión.</p>
            ) : (
                <div className="noticias-grid">
                    {noticias.map((noticia) => (
                        <div key={noticia.id} className="noticia-card-wrapper">
                            <Noticia noticia={noticia} modoEditor={true} /> 
                            
                            <div className="acciones">
                                                            <button
                                onClick={() => handlePublicar(noticia.id)}
                                disabled={noticia.estado === "Publicado"}
                                className={`btn-publicar ${noticia.estado === "Publicado" ? "publicado" : ""
                                    }`}
                            >
                                {noticia.estado === "Publicado"
                                    ? "Publicada"
                                    : "Publicar"}
                            </button>
                            <button
                            onClick={() => navigate(`/panel/editor/devolver/${noticia.id}`)}
                            className="btn-devolver"
                            >
                            Devolver a reportero
                            </button>

                            </div>


                        </div>
                    ))}
                </div>

            )}
        </div>
        </>
    );
};

export default PanelEditor;
