import React, {useState, useEffect} from 'react';

import { useNavigate } from "react-router-dom";

export const ModEstudiante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "Apellido": "",
    "Carnet": "",
    "Cel": "",
    "Correo": "",
    "Nombre": "",
    "Sede": "",
    "Segundo Apellido": "",
    "Segundo Nombre": ""
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

  const guardadoEnBase = async () => {
    if (validarForm()) {
      // Lógica para guardar en la base de datos
      console.log('Datos válidos, guardando en la base de datos...');
      console.log(formData)
      await subirDatos(formData);
      navigate(-1);
    }
  };

  
  const phoneRegex = /^[0-9]{8,10}$/;
  const correoEstudianteValido = /^[a-zA-Z0-9._%+-]+@estudiantec\.cr$/;
  const validarForm = () => {
    
    if (formData.Correo === "" || formData.Nombre === "" || formData.Apellido === "" || formData['Segundo Apellido'] === "") {
      alert('Por favor, complete todos los campos antes de guardar. (Celular y Segundo nombre son opcionales)');
      return false;
    }
    if (!phoneRegex.test(formData.Cel) && formData.Cel !== ""){
      alert("Número de teléfono inválido");
      return false;
    }
    if (!correoEstudianteValido.test(formData.Correo)) {
      alert("Correo inválido");
      return false;
    }

    return true;
  };

  async function subirDatos(formData) {
    console.log(formData)
    try {
        const response = await fetch('http://18.222.222.154:5000/profes/update/Estudiante', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
    } catch (error) {
        throw new Error('Error al obtener los datos:', error.message);
    }
}

  return (
    <div className='cajaBasica'>
      <h2 className='tituloProfesor'>Modificar estudiante</h2>
      <form>
        <div>
          <label className='textoGenera'>Carnet:</label>
          <input type="text" id="carnet" name="Carnet" value={formData.Carnet} onChange={handleChange} className="form-control disabled entrada" disabled/>
        </div>
        <div>
          <label className='textoGenera'>Correo:</label>
          <input type="email" id="correo" name="Correo" value={formData.Correo} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Número de Celular:</label>
          <input type="text" id="numCelular" name="Cel" value={formData.Cel} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Primer Nombre:</label>
          <input type="text" id="primerNombre" name="Nombre" value={formData.Nombre} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Segundo Nombre:</label>
          <input type="text" id="segundoNombre" name="Segundo Nombre" value={formData['Segundo Nombre']} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Primer apellido:</label>
          <input type="text" id="primerApellido" name="Apellido" value={formData.Apellido} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Segundo apellido:</label>
          <input type="text" id="segundoApellido" name="Segundo Apellido" value={formData['Segundo Apellido']} onChange={handleChange} className="form-control entrada"/>
        </div>
        <div>
          <label className='textoGenera'>Sede:</label>
          <input type="text" id="sede" name="Sede" value={formData.Sede} onChange={handleChange} className="form-control disabled entrada" disabled/>
        </div>
        <button className="button boton btn-submit" type="button" onClick={guardadoEnBase}>Guardar</button>
      </form>
      <button className="button boton btn-submit" type="button" onClick={()=>navigate(-1)}>
        Volver
      </button>
    </div>
  );
}
