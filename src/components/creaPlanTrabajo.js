import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";
export const CreaPlanTrabajo = () => {
  
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    nombrePlan: '',
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
        console.log(formData)
        
      }catch(error){
        alert("Error: " + error.message);
      }
  }

  const validarDatos = () => {
    if(formData.nombrePlan === ''){
      throw new Error("Nombre plan no puede ser vacío");
    }
    if(formData.anno === ''){
      throw new Error("Año del plan no puede ser vacío");
    }
    if(formData.semestre === "nulo"){
      throw new Error("Semestre no puede ser nulo");
    }
  }

  return (
    <div>
    

   <div className = "contenedor">
        <div>
            <form className="form-signin"> 
            <h2 className="form-signin-heading texto-login">Agregar plan de trabajo</h2>
              <label className = "textoGenera">NombrePlan:</label>
              <input type="text" name='nombrePlan' className="form-control entrada" placeholder="Escribir nombre del plan" onChange={handleChange}></input>
              <label className = "textoGenera">Año:</label> 
              <input type="text" name='anno' className="form-control entrada" placeholder="Ej: 2024" onChange={handleChange}></input>
              <label className = "textoGenera">Semestre:</label> 
                <select className="form-control entrada" name='semestre' onChange={handleChange}>
                    <option value={"nulo"}>Seleccionar Semestre</option>
                    <option value={"Primer"}>Primer Semestre</option>
                    <option value={"Segundo"}>Segundo Semestre</option>
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
