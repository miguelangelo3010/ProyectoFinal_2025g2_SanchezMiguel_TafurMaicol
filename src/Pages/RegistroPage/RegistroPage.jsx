// src/pages/RegistroPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../Firebase/ConfigFirebase";
import "./RegistroPage.css";
import { Navigate } from "react-router-dom";

const RegistroPage = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("reportero");
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Crear usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Subir foto al Storage (si hay)
      let fotoURL = "";
      if (foto) {
        const fotoRef = ref(storage, `perfiles/${user.uid}`);
        await uploadBytes(fotoRef, foto);
        fotoURL = await getDownloadURL(fotoRef);
      }

      // 3️⃣ Actualizar perfil en Auth
      await updateProfile(user, {
        displayName: nombre,
        photoURL: fotoURL,
      });

      // 4️⃣ Crear documento en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        email,
        rol,
        fotoPerfil: fotoURL,
        fechaRegistro: new Date(),
        activo: true,
      });

      setMensaje("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      setNombre("");
      setEmail("");
      setPassword("");
      setFoto(null);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
      setMensaje("Error: " + error.message);
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegistro} className="registro-form">
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

        <label>Foto de perfil</label>
        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />

        <button type="submit">Registrarse</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default RegistroPage;
