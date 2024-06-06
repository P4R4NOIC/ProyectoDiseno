import React, {useState, useEffect} from 'react';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const ModificarInfoEstudiante = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      "Cel": "",
      "foto": "",
    });
  
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //           const response = await fetch(`https://diseno-api.onrender.com/#####`, {
    //             method: 'GET',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //           });
          
    //           if (!response.ok) {
    //             throw new Error('Error al obtener los datos del detalle de equipo');
    //           }
    //           const data = await response.json();
    //           setFormData(data);
          
    //         } catch (error){
    //           console.error('Error al obtener los datos:', error.message);
    //           setFormData([]); // Asigna un array vacío en caso de error
    //         }
    //       };
      
    //     fetchData(); // Llamada a la función para obtener los datos al montar el componente
    // }, []);
    
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
                <h2 className='tituloProfesor'>Modificar información</h2>
                <form>
                    <div>
                        <label className='textoGenera'>Contraseña:</label>
                        <input type="password" id="password" name="password" className="form-control entrada"/>
                    </div>
                    <div>
                        <label className='textoGenera'>Nueva Contraseña:</label>
                        <input type="password" id="Newpassword" name="Newpassword" className="form-control entrada"/>
                    </div>
                    <div>
                        <label className='textoGenera'>Confirmar contraseña:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className="form-control entrada"/>
                    </div>
                    
                    <div>
                        <label className='textoGenera'>Número de Celular:</label>
                        <input type="text" id="numCelular" name="Cel" value={formData.Cel} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    
                    <div>
                        <label className='textoGenera'>Fotografía:</label>
                        <input type="file" id="foto" name="foto" value={formData.foto} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    <button className="button boton btn-submit" type="button" onClick={guardadoEnBase}>Guardar</button>
                </form>
            
            </div>
            <div className='divVolver'>
                <button className="button boton btn-submit" onClick={ ()=>navigate(-1) }>Volver</button>
            </div>
        </div>
      
    </div>

  )
}
