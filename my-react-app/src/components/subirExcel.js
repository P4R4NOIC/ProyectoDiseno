import React from 'react'
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";
export const SubirExcel = () => {
  const navigate = useNavigate();
  var variable= localStorage.getItem("usuario");
  return (
    <div>
       <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  
     
      <div className = "contenedor">
    <div>
    <div class = "excelInput">
       

    </div>

</div>
      <label class = "textoGenera">Seleccione el Archivo de excel que desee subir</label>
      <input type="file" id="foto" name="foto" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' className='form-control entrada'></input>
      <button className="button boton btn-submit" type="button" >Subir </button>
      <button className="button boton btn-submit" type="button" onClick={()=>navigate('/landingAdmin')}>Volver </button>
      </div>

    </div>
  )
}
