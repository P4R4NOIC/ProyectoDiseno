import React, {useState, useEffect} from 'react';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const MensajeIndividual = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "mensajeCargado": "Actividad 01\nFecha de realización 30/06/2024\nDías para su publicación: 15\nLa actividad pasa de estado PLANEADA a NOTIFICADA el 15/06/2024\nDías para los recordatorios: 3\nLas fechas de recordatorio serán los días 18/06/2024, 21/06/2024, 24/06/2024, 27/06/2024.\nLa actividad sigue estando NOTIFICADA."
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
      //await subirDatos(formData);
      //navigate(-1);
    }
  };

  const phoneRegex = /^[0-9]{8,10}$/;
  const validarForm = () => {
    
    if (!phoneRegex.test(formData.Cel) && formData.Cel !== ""){
      alert("Número de teléfono inválido");
      return false;
    }

    return true;
  };

    async function subirDatos(formData) {
        console.log(formData)
        try {
            const response = await fetch('https://diseno-api.onrender.com/profes/update/Estudiante', {
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

    <div>
        <div className='cajaBasica'>
            <div>
                <h2 className='tituloProfesor'>Mensaje</h2>
                
                <textarea
                    name="postContent"
                    defaultValue={formData.mensajeCargado}
                    rows={20}
                    cols={40}
                    className="form-control entrada textAreaMsg"
                    readOnly
                />
            
            </div>
            <div className='divVolver'>
                <button className="button boton btn-submit" onClick={ ()=>navigate(-1) }>Volver</button>
            </div>
        </div>
      
    </div>

  )
}
