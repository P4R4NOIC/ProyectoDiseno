import React, {useState, useEffect} from 'react';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const PerfilEstudiante = () => {

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
                <h2 className='tituloProfesor'>Información Personal</h2>
                <form>
                    <div>
                    <label className='textoGenera'>Carnet:</label>
                    <input type="text" id="carnet" name="Carnet" value={formData.Carnet} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Correo:</label>
                    <input type="email" id="correo" name="Correo" value={formData.Correo} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Número de Celular:</label>
                    <input type="text" id="numCelular" name="Cel" value={formData.Cel} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Primer Nombre:</label>
                    <input type="text" id="primerNombre" name="Nombre" value={formData.Nombre} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Segundo Nombre:</label>
                    <input type="text" id="segundoNombre" name="Segundo Nombre" value={formData['Segundo Nombre']} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Primer apellido:</label>
                    <input type="text" id="primerApellido" name="Apellido" value={formData.Apellido} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Segundo apellido:</label>
                    <input type="text" id="segundoApellido" name="Segundo Apellido" value={formData['Segundo Apellido']} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Sede:</label>
                    <input type="text" id="sede" name="Sede" value={formData.Sede} onChange={handleChange} className="form-control entrada" readOnly/>
                    </div>
                </form>
            
            </div>
            <div className='divVolver'>
                <button className="button boton btn-submit" onClick={ ()=>navigate(-1) }>Volver</button>
            </div>
        </div>
      
    </div>

  )
}
