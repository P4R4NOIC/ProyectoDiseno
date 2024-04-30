import React from 'react'
import '../login.css';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const navigate = useNavigate();
  
function validaCorreo(){
      
  var email = document.getElementById("inputEmail").value;
  // eslin-desable-next-line
  var correoAdminValido = /^[\w-\.]+@(admin.ac.cr)$/;
  var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
  var contrasena = document.getElementById("inputPassword").value

  if (correoAdminValido.test(email) && contrasena !== "")
  {
      localStorage.setItem("conexion", "ADMIN")
      localStorage.setItem("conexionEsp", "CADMIN")
      localStorage.setItem("usuario", email)
      navigate('/landingAdmin');
      
  } 
  else if(correoProfesorValido.test(email) && contrasena !== ""){
      localStorage.setItem("conexion", "PROFE");
      localStorage.setItem("usuario", email);
      navigate('/landingProfesor');
      
  }

}
 

  return (
    
    <div className = "contenedor">
        <div className = "texto-login">
            <form className="form-signin"> 
            <h2 className="form-signin-heading">Iniciar Sesión</h2>
    
              <input type="email" id="inputEmail" className="form-control entrada" placeholder="Correo" required="" autoFocus=""></input> 
              <input type="password" id="inputPassword" className="form-control entrada" placeholder="Contraseña" required=""></input>


            
              <button className="button boton btn-submit" type="button" onClick={()=>validaCorreo()}>
                Ingresar
              </button>

            </form>

        </div>

    </div>
  )
}

