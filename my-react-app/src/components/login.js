import React from 'react'
import '../login.css';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const navigate = useNavigate();
  
async function validaCorreo(){
  try{
  var email = document.getElementById("inputEmail").value;
  var contrasena = document.getElementById("inputPassword").value

  const sesionUsuario = await obtenerSesionUsuario(email, contrasena);
  
  //const usuario = await autenticarUsuario(email, contrasena, sesionUsuario);
  const usuario = {
    "nombreCompleto": 'Roberto',
    "contraseña": contrasena,
    "correo": email, 
    "activo": 1,
    "telefono": 20000000,
    "celular": 84848484, 
    "codigoSede": "AL-500", 
    "coordinador": 1,
    "foto": 'direccion',
    "idSede": 2,
  }
  localStorage.setItem('usuario', JSON.stringify(usuario));

  if (sesionUsuario === 'PROFESOR') {
    navigate('/landingProfesor');
  } else if (sesionUsuario === 'INVALID') {
    throw new Error('Dirección inválida o contraseña incorrecta');
  } else {
      navigate('/landingAdmin');
  }

  
  }catch(error){
    alert("Error al iniciar sesión: " + error.message);
  }
}
 
const obtenerSesionUsuario = async (email, contrasena) =>{
  var correoAdminCAValido = /^[\w-\.]+@(adminCA.ac.cr)$/;
  var correoAdminSJValido = /^[\w-\.]+@(adminSJ.ac.cr)$/;
  var correoAdminLIValido = /^[\w-\.]+@(adminLI.ac.cr)$/;
  var correoAdminALValido = /^[\w-\.]+@(adminAL.ac.cr)$/;
  var correoAdminSCValido = /^[\w-\.]+@(adminSC.ac.cr)$/;
  var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;

  if (correoAdminCAValido.test(email) && contrasena !== ""){
    return "ADMINCA";
  } 
  if (correoAdminSJValido.test(email) && contrasena !== ""){
    return "ADMINSJ";
  }
  if (correoAdminLIValido.test(email) && contrasena !== ""){
    return "ADMINLI";
  }
  if (correoAdminALValido.test(email) && contrasena !== ""){
    return "ADMINAL";
  }
  if (correoAdminSCValido.test(email) && contrasena !== ""){
    return "ADMINSC";
  }
  if(correoProfesorValido.test(email) && contrasena !== ""){
    return "PROFESOR";
  }
  return "INVALID";
  
}

const autenticarUsuario = async (email, contrasena, tipoSesion) => {
  try {
      const response = await fetch(`https://tu-api-url.com/${tipoSesion}?correo=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Aquí podrías incluir otros headers como tokens de autenticación si es necesario
        },
      });

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanzar un error
        throw new Error('Error al obtener los datos del usuario');
      }

      // Convertir la respuesta a formato JSON
      const data = await response.json();
      // Devolver los datos del usuario
      if(contrasena === data.contrasena){
        return data;
      } else{
        throw new Error('Tokens no validos');
      }
  } catch (error){
    throw new Error('Error al obtener los datos del usuario: ' + error.message);
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

