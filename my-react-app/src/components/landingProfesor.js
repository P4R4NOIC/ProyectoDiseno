import React from 'react'
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const LandingProfesor = () => {
  const navigate = useNavigate();
  
  function cierreSesion(){
    localStorage.clear();
    navigate('/login');
  }

  function generarExcel(){
    alert("Excel");
  }

  return (

    <div>
      <div className='cajaBasica'>
        <div>
          <h2 className='tituloProfesor'>Profesor X</h2>
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
