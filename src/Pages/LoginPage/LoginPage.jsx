import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "./LoginPage.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/ConfigFirebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { rol } = docSnap.data();
        alert(`Bienvenido ${user.email} — Rol: ${rol}`);

        if (rol === "reportero") {
          navigate(`${import.meta.env.BASE_URL}panel/reportero`);
        } else if (rol === "editor") {
          navigate(`${import.meta.env.BASE_URL}panel/editor`);

        } else {
          alert("Tu rol no está definido. Contacta al administrador.");
          await auth.signOut();
        }
      } else {
        alert("No se encontró información del usuario en la base de datos.");
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error.message);

      const errores = {
        "auth/invalid-email": "El correo electrónico no es válido.",
        "auth/user-not-found": "No existe un usuario con ese correo.",
        "auth/wrong-password": "Contraseña incorrecta."
      };

      alert(errores[error.code] || "Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h3 className="slogan-top">TU TRABAJO MANTIENE INFORMADA</h3>
        <h1 className="slogan-main">Informada</h1>
        <h2 className="slogan-sub">A TODA UNA</h2>
        <h1 className="slogan-main">Comunidad</h1>
        <p className="slogan-bottom">
          INICIA SESIÓN Y SIGUE CONSTRUYENDO LA VERDAD CON RESPONSABILIDAD Y PASIÓN.
        </p>
      </div>

      <div className="login-right">
        <h2 className="titulo">Noticias El Ahora</h2>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Escriba su usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Escriba su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          <p className="registro">
            ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
