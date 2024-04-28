import React from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";
export const CreaProfe = () => {
  
  var variable= localStorage.getItem("usuario");
  const navigate = useNavigate();
 
  return (
    <div>
    <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  

   <div className = "contenedor">
        <div>
            <form className="form-signin"> 
            <h2 className="form-signin-heading texto-login">Agregar Profesor</h2>
              <label class = "textoGenera">Nombre:</label>
              <input type="text" id="inputEmail" className="form-control entrada" placeholder="Nombre" required="" autoFocus=""></input>
              <label class = "textoGenera">Segundo Nombre:</label> 
              <input type="text" id="inputPassword" className="form-control entrada" placeholder="Segundo Nombre" required=""></input>
              <label class = "textoGenera">Apellido:</label>
              <input type="text" id="inputPassword" className="form-control entrada" placeholder="Apellido" required=""></input>
              <label class = "textoGenera">Segundo Apellido:</label>
              <input type="text" id="inputPassword" className="form-control entrada" placeholder="Segundo Apellido" required=""></input>
              <label class = "textoGenera">Correo:</label>
              <input type="mail" id="inputPassword" className="form-control entrada" placeholder="Correo" required=""></input>
              <label class = "textoGenera">Numero de Telefono Oficina:</label>
              <input type="number" id="inputPassword" className="form-control entrada" placeholder="Numero de Telefono Oficina" required=""></input>
              <label class = "textoGenera">Numero de Telefono Celular:</label>
              <input type="number" id="inputPassword" className="form-control entrada" placeholder="Numero de Telefono Celular" required=""></input>
              <label class = "textoGenera">Foto:</label>
              <input type="file" id="foto" name="foto" accept = "image/*"className='form-control entrada'></input>
            
           
            
              <button className="button boton btn-submit" type="button" >
                Agregar
              </button>
              <button className="button boton btn-submit" type="button" onClick={()=>navigate('/landingAdmin')}>
                Volver
              </button>

            </form>

        </div>

    </div>
    </div>
  )
}
