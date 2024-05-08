import React from 'react'
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
export const LandingProfesor = () => {
  const navigate = useNavigate();
  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);

  function cierreSesion(){
    localStorage.clear();
    navigate('/login');
  }

 async function generarExcel(){
    
    try {
   
      const response = await fetch(`http://18.222.222.154:5000/excel/recuperar`, {
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
   //   console.log(data)
  
   var excelActual = data["excel"]
    const worksheet = XLSX.utils.json_to_sheet(excelActual)

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

    XLSX.writeFile(workbook, data["nombre"], { compression: true });
      
    
} catch (error){
  throw new Error(error.message);
}
   
  }

  return (

    <div>
      <div className='cajaBasica'>
        <div>
          <h2 className='tituloProfesor'><label id="nombreCoordinador">{usuario.nombreCompleto}</label></h2>
          <button className="button boton btn-submit" onClick={ ()=>navigate('/detalleEquipo') }>Detalle equipo de trabajo</button>
          <button className="button boton btn-submit" onClick={ ()=>navigate('/listaEstudiantes') }>Ver lista de estudiantes</button>
          <button className="button boton btn-submit" onClick={ ()=>generarExcel() }>Generar Excel de información estudiantil</button>
       
        </div>
        <div className='divVolver'>
          <button className="button boton btn-submit" onClick={ ()=>cierreSesion() }>Salir</button>
        </div>
      </div>
      
    </div>

  )
}
