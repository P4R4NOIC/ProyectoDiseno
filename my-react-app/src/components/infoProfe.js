import React from 'react'
import { useNavigate } from "react-router-dom";
import "../estilosGenerales.css"
import "../estilosInfoProfe.css"
export const InfoProfe = () => {
  const navigate = useNavigate();
    var variable= localStorage.getItem("usuario");
    var codigo = "";
    var nombre = "Nombre completo del profesor"
    var correo = "";
    var oficina;
    var cel;
  return (
    <div>
       <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  
       <div class="container ">
       <div class="row align-items-start">
          <div class="col-1 columna-izq">
          <img src="haha.png" class = "imagen"alt=""></img>
          </div>
         <div class="col-5 textos">
          <div class = "txt"> Nombre: {nombre}</div>
          <div class = "txt">{codigo}</div>
          <div class = "txt">Correo: {correo}</div>
          <div class = "txt">Telefono Oficina: {oficina}</div>
          <div class = "txt">Telefono Celular: {cel}</div>
            
        </div>

        <div class="col-5 textos">
          <div>  <button className="button boton btn-submit" type="button" onClick={()=>navigate('/modProfe')}>Modificar </button> </div>
          <div>  <button className="button boton btn-submit" type="button" onClick={()=>navigate('/creaProfe')}>Dar de baja </button></div>
          <div>   <button className="button boton btn-submit" type="button" onClick={()=>navigate('/creaProfe')}>Nombrar Coordinador </button></div>
          <div>   <button className="button boton btn-submit" type="button" onClick={()=>navigate('/creaProfe')}>Agregar al equipo </button></div>
          <div>   <button className="button boton btn-submit" type="button" onClick={()=>navigate('/creaProfe')}>Eliminar del equipo </button></div>
            
        </div>
        <div>  <button className="button boton btn-submit" type="button" onClick={()=>navigate(-1)}>Volver </button></div>
        
     </div>
      </div>

    </div>
  )
}
