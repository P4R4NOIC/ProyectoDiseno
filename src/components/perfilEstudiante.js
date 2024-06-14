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
    const storedData = localStorage.getItem('usuario');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
    }
  }, []);
  

  return (

    <div>
        <div className='cajaBasica'>
            <div>
                <h2 className='tituloProfesor'>Información Personal</h2>
                <form>
                    <div>
                    <label className='textoGenera'>Carnet:</label>
                    <input type="text" id="carnet" name="Carnet" value={formData.Carnet} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Correo:</label>
                    <input type="email" id="correo" name="Correo" value={formData.Correo}  className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Número de Celular:</label>
                    <input type="text" id="numCelular" name="Cel" value={formData.Cel}  className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Primer Nombre:</label>
                    <input type="text" id="primerNombre" name="Nombre" value={formData.Nombre}className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Segundo Nombre:</label>
                    <input type="text" id="segundoNombre" name="Segundo Nombre" value={formData['Segundo Nombre']}  className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Primer apellido:</label>
                    <input type="text" id="primerApellido" name="Apellido" value={formData.Apellido} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Segundo apellido:</label>
                    <input type="text" id="segundoApellido" name="Segundo Apellido" value={formData['Segundo Apellido']} className="form-control entrada" readOnly/>
                    </div>
                    <div>
                    <label className='textoGenera'>Sede:</label>
                    <input type="text" id="sede" name="Sede" value={formData.Sede} className="form-control entrada" readOnly/>
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
