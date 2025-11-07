import React from 'react'
import { useState } from 'react';
import db from '../../Firebase/ConfigFirebase.js';
import { doc, setDoc } from "firebase/firestore"; 

const Admin = () => {

        const [noticia, setNoticia] = useState(
        {
            titular: 'dsfs',
            fecha: 'sdfdsf',
            noticia: 'dsfds',
            imagen: 'dsfsdfdsfsd'
        }
     )

    const handData = () => {

        const cityRef = doc(db, 'noticias', 'noticia1');
        setDoc(cityRef, noticia);
    }



  return (
    <>
    <div>
        Cargar Noticia  
    </div>
    <input type="text" placeholder='titular'/>
    <input type="text" placeholder='Fecha'/>
    <input type="text" placeholder='Noticia'/>
    <input type="text" placeholder='imagen'/>
    <input type="submit" value='Enviar' onClick={handData}/>
</>
  )
}

export default Admin
