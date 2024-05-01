import React, {useState, useEffect} from 'react';

import { useNavigate } from "react-router-dom";

export const ModEstudiante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carnet: '',
    correo: '',
    numCelular: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    sede: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('EstudianteIndividual');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const guardadoEnBase = () => {
    if (validarForm()) {
      // Lógica para guardar en la base de datos
      console.log('Datos válidos, guardando en la base de datos...');
      console.log(formData)
    }
  };
  const phoneRegex = /^[0-9]{10}$/;
  const correoEstudianteValido = /^[a-zA-Z0-9._%+-]+@estudiantec\.cr$/;
  const validarForm = () => {
    
    if (formData.correo === "" || formData.primerNombre === "" || formData.primerApellido === "" || formData.segundoApellido === "") {
      alert('Por favor, complete todos los campos antes de guardar. (Celular y Segundo nombre son opcionales)');
      return false;
    }
    if (!phoneRegex.test(formData.numCelular) && formData.numCelular !== ""){
      alert("Número de teléfono inválido");
      return false;
    }
    if (!correoEstudianteValido.test(formData.correo)) {
      alert("Correo inválido");
      return false;
    }

    return true;
  };

  return (
    <div className='cajaBasica'>
      <h2 className='tituloProfesor'>Modificar estudiante</h2>
      <form>
        <div>
          <label className='textoGenera'>Carnet:</label>
          <input type="text" id="carnet" name="carnet" value={formData.carnet} onChange={handleChange} className="form-control disabled entrada" disabled/>
        </div>
        <div>
          <label className='textoGenera'>Correo:</label>
          <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Número de Celular:</label>
          <input type="text" id="numCelular" name="numCelular" value={formData.numCelular} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Primer Nombre:</label>
          <input type="text" id="primerNombre" name="primerNombre" value={formData.primerNombre} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Segundo Nombre:</label>
          <input type="text" id="segundoNombre" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Primer apellido:</label>
          <input type="text" id="primerApellido" name="primerApellido" value={formData.primerApellido} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Segundo apellido:</label>
          <input type="text" id="segundoApellido" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Sede:</label>
          <input type="text" id="sede" name="sede" value={formData.sede} onChange={handleChange} className="form-control disabled entrada" disabled/>
        </div>
        <button className="button boton btn-submit" type="button" onClick={guardadoEnBase}>Guardar</button>
      </form>
      <button className="button boton btn-submit" type="button" onClick={()=>navigate(-1)}>
        Volver
      </button>
    </div>
  );
}
