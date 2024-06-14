import React from 'react'
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const LandingEstudiante = () => {
  const navigate = useNavigate();
  
  // # ELIMINAR
  var usuarioPrueba = {
    "Apellido": "Vindas",
    "Carnet": "2020234144",
    "Cel": "184151351",
    "Correo": "rvindas",
    "Nombre": "Roberto",
    "Sede": "1",
    "Segundo Apellido": "Hernández",
    "Segundo Nombre": "Daniel",
    "Contrasena": "pass",
  }
  var usuarioPruebaJSON = JSON.stringify(usuarioPrueba);
  localStorage.setItem("usuario",usuarioPruebaJSON);
  localStorage.setItem("sesionUsuario", "ESTUDIANTE");
  // # ELIMINAR
  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  
  function cierreSesion(){
    localStorage.clear();
    navigate('/login');
  }


  async function detectarProximaActividad(){
    const objetoActividad = await pedirProximaActividad();
    console.log("Entró");
    const jsonString = JSON.stringify(objetoActividad[0]);
    await localStorage.setItem('actividadActual', jsonString);
    navigate('/actividad');
  }

  const pedirProximaActividad = async () => {
    try {
        
        const response = await fetch(`https://diseno-api.onrender.com/planes/actividadProxima`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error('Error al obtener la próxima actividad');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();
        return data;
        
    } catch (error){
      throw new Error('Error: ' + error.message);
    }
  }

  const pedirActividades = async() => {
    // try {
    //   const response = await fetch(`https://diseno-api.onrender.com/planes/actividades/${idPlan}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error('Error al obtener los datos del detalle de equipo');
    //   }

    //   const data = await response.json(); // Parsear la respuesta a formato JSON
    //   localStorage.setItem("listaActividades", JSON.stringify(data));
    //   navigate('/listaActividades');

    // } catch (error){
    //   console.error('Error al obtener los datos:', error.message);
    // }
    navigate('/listaActividades'); //BORRAR UNA VEZ DESCOMENTADO LO DE ARRIBA
    
  }

  return (

    <div>
        <div className='cajaBasica'>
            <div>
                <h2 className='tituloProfesor'><label id="nombreEstudiante">{"Estudiante: " + usuario.Nombre + " " + usuario["Segundo Nombre"] +  " " + usuario.Apellido + " " + usuario["Segundo Apellido"]}</label></h2>
                <button className="button boton btn-submit" onClick={ ()=>navigate('/perfilEstudiante') }>Ver perfil</button>
                <button className="button boton btn-submit" onClick={ ()=>navigate('/modificarInfoEstudiante') }>Editar perfil</button>
                <button className="button boton btn-submit" onClick={ ()=>pedirActividades() }>Ver calendario de actividades</button>
                <button className="button boton btn-submit" onClick={ ()=>detectarProximaActividad() }>Ver próxima actividad</button>
                <button className="button boton btn-submit" onClick={ ()=>navigate('/buzonEstudiantil') }>Buzón de notificaciones</button>
            
            </div>
            <div className='divVolver'>
                <button className="button boton btn-submit" onClick={ ()=>cierreSesion() }>Salir</button>
            </div>
        </div>
      
    </div>

  )
}
