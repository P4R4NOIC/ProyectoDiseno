import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";
export const CreaPlanTrabajo = () => {
  
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    anno: '',
    semestre: 'nulo',
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const guardarPlan = () => {
    try{
        validarDatos();
        
        console.log('Datos válidos, guardando en la base de datos...');
        //await subirDatos(formData);
        
      }catch(error){
        alert("Error: " + error.message);
      }
  }

  const validarDatos = () => {
    if(formData.anno === ''){
      throw new Error("Año del plan no puede ser vacío");
    }
    if(formData.anno < 2000){
      throw new Error("Año del plan no puede ser menor a 2000");
    }
    if(formData.semestre === "nulo"){
      throw new Error("Semestre no puede ser nulo");
    }
  }

  async function subirDatos(formData) {
    try{
      const response = await fetch('https://ejemplo.com/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error al subir datos');
      }
    }catch(error){
      console.error('Error al subir datos:', error.message);
    }
  }

  return (
    <div>
    

   <div className = "contenedor">
        <div>
            <form className="form-signin"> 
            <h2 className="form-signin-heading texto-login">Agregar plan de trabajo</h2>
              {/* <label className = "textoGenera">NombrePlan:</label> */}
              {/* <input type="text" name='nombrePlan' className="form-control entrada" placeholder="Escribir nombre del plan" onChange={handleChange}></input> */}
              <label className = "textoGenera">Año:</label> 
              <input type="number" name='anno' className="form-control entrada" placeholder="Ej: 2024" onChange={handleChange}></input>
              <label className = "textoGenera">Semestre:</label> 
                <select className="form-control entrada" name='semestre' onChange={handleChange}>
                    <option value={"nulo"}>Seleccionar Semestre</option>
                    <option value={1}>Primer Semestre</option>
                    <option value={2}>Segundo Semestre</option>
                </select>
            
            
              <button className="button boton btn-submit" type="button" onClick={guardarPlan} >
                Agregar
              </button>
              <button className="button boton btn-submit" type="button" onClick={()=>navigate(-1)}>
                Volver
              </button>

            </form>

        </div>

    </div>
    </div>
  )
}
