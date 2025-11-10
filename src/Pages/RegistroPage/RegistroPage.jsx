import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/ConfigFirebase";
import "./RegistroPage.css";

const RegistroPage = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("reportero");
  const [foto, setFoto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    const emailTrimmed = email.trim();
    const nombreTrimmed = nombre.trim();

    try {
      // Crear usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, emailTrimmed, password);
      const user = userCredential.user;

      // Actualizar perfil con nombre y foto
      await updateProfile(user, {
        displayName: nombreTrimmed,
        photoURL: foto || null,
      });

      // Guardar usuario en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombreTrimmed,
        email: emailTrimmed,
        rol,
        fotoPerfil: foto || null,
        fechaRegistro: new Date(),
        activo: true,
      });

      // Mensaje y reset de formulario
      setMensaje("Registro exitoso. Redirigiendo a login...");
      setNombre("");
      setEmail("");
      setPassword("");
      setFoto("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar usuario:", error);

      // Mensajes amigables
      if (error.code === "auth/email-already-in-use") {
        setMensaje("Este correo ya está registrado. Intenta con otro.");
      } else if (error.code === "auth/invalid-email") {
        setMensaje("El correo no es válido.");
      } else if (error.code === "auth/weak-password") {
        setMensaje("La contraseña es demasiado débil (mínimo 6 caracteres).");
      } else {
        setMensaje("Error: " + error.message);
      }
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleRegistro} className="registro-form">
        <h2>Registro de Usuario</h2>

        <label>Nombre completo</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Rol</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="reportero">Reportero</option>
          <option value="editor">Editor</option>
        </select>

        <label>Foto de perfil (URL)</label>
        <input
          type="text"
          placeholder="Pega la URL de tu foto de perfil"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
        />

        {/* Vista previa de la foto */}
        {foto && <img src={foto} alt="Perfil" className="profile-preview" />}

        <button type="submit">Registrarse</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default RegistroPage;
