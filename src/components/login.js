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

  if (email === '' || contrasena == ''){
    throw new Error ('Los campos no pueden ser vacios');
  }

  const sesionUsuario = await obtenerSesionUsuario(email, contrasena);
 
  const usuario = await autenticarUsuario(email, contrasena, sesionUsuario);
  
  await localStorage.setItem('usuario', JSON.stringify(usuario));
  
  if (sesionUsuario === 'PROFESOR') {
    localStorage.setItem('sesionUsuario', sesionUsuario);
    navigate('/landingProfesor');
  } else if (sesionUsuario === 'INVALID') {
    throw new Error('Dirección inválida o contraseña incorrecta');
  } else {
      localStorage.setItem('sesionUsuario', sesionUsuario);
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
    return 5;
  } 
  if (correoAdminSJValido.test(email) && contrasena !== ""){
    return 1;
  }
  if (correoAdminLIValido.test(email) && contrasena !== ""){
    return 2;
  }
  if (correoAdminALValido.test(email) && contrasena !== ""){
    return 4;
  }
  if (correoAdminSCValido.test(email) && contrasena !== ""){
    return 3;
  }
  if(correoProfesorValido.test(email) && contrasena !== ""){
    return "PROFESOR";
  }
  return "INVALID";
  
}

const autenticarUsuario = async (email, contrasena, sesionUsuario) => {
  try {
   
      if(sesionUsuario === 'PROFESOR'){
        const response = await fetch(`http://18.222.222.154:5000/profes/guia/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
        if(data.contraseña === null){
          throw new Error('Usted no es un profesor guía, no puede iniciar sesión');
        }
        if(contrasena !== data.contraseña){
          throw new Error('Tokens no validos');
        } 
        return data;
        
      }else if(sesionUsuario>0){
        const response = await fetch(`http://18.222.222.154:5000/asistentes/getAsistente/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
        console.log(data)
        if(contrasena === data.contra){
          localStorage.setItem("conexionEsp", sesionUsuario);
          return data;
        } else{
          throw new Error('Tokens no validos');
        }
      }
      else{
        const response = await fetch(`https://18.222.222.154:5000/profes/guia/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
        console.log(data)
        if(contrasena === data.contraseña){
          return data;
        } else{
          throw new Error('Tokens no validos');
        }
      }
  } catch (error){
    throw new Error(error.message);
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

