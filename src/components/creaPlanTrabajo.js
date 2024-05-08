import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";
export const CreaPlanTrabajo = () => {
  
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    semestre: 'nulo',
    anno: '',
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const guardarPlan = async () => {
    try{
        validarDatos();
        
        console.log('Datos válidos, guardando en la base de datos...');
        console.log(formData)
        await subirDatos(formData);
        navigate('/planTrabajo');
        
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
      const response = await fetch('http://18.222.222.154:5000/planes/add/Plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al subir datos, datos inválidos');
      }
    }catch(error){
      throw new Error(error.message);
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
