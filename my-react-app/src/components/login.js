import React from 'react'
import '../login.css';
import "../estilosGenerales.css"
export const Login = () => {
  return (
    
    
    <div class = "contenedor">
        <div class = "texto-login">
            <form class="form-signin"> 
            <h2 class="form-signin-heading">Iniciar Sesión</h2>
    
              <input type="email" id="inputEmail" class="form-control entrada" placeholder="Correo" required="" autofocus=""></input> 
              <input type="password" id="inputPassword" class="form-control entrada" placeholder="Contraseña" required=""></input>


            
              <button className="button boton" type="button">
                Ingresar
              </button>

            </form>

        </div>

    </div>
  )
}
