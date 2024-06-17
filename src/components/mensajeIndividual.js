import React, {useState, useEffect, act} from 'react';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const MensajeIndividual = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // "mensajeCargado": ""
    // "mensajeCargado": 
    // "Actividad 01\n
    // Fecha de realización 30/06/2024\n
    // Días para su publicación: 15\n
    // La actividad pasa de estado PLANEADA a NOTIFICADA el 15/06/2024\n
    // Días para los recordatorios: 3\n
    // Las fechas de recordatorio serán los días 18/06/2024, 21/06/2024, 24/06/2024, 27/06/2024.\n
    // La actividad sigue estando NOTIFICADA."
  });
  
  
  const mensajeActual = localStorage.getItem("mensajeActual");
  const [textAreaContent, setTextAreaContent] = useState('');

  const formatActivityDetails = () => {
    // Parsear mensajeActual de JSON a objeto JavaScript
    const actividad = JSON.parse(mensajeActual);

    // Verificar si se pudo parsear correctamente
    // if (!actividad || !actividad.valoresGenerales) {
    //   return 'No hay información disponible para esta actividad.';
    // }

    // const {
    //   nombre,
    //   direccion,
    //   fechaPublicacion,
    //   fechaRealizacion,
    //   fechaRecordatorio,
    //   modalidad,
    //   responsables,
    //   semana,
    //   tipo
    // } = actividad.valoresGenerales;
  
    // // Formatear fechas de recordatorio
    // const fechasRecordatorio = fechaRecordatorio.map(rec => new Date(rec.fechaR).toLocaleDateString()).join(', ');
  
    // // Obtener nombres de los responsables
    // const nombresResponsables = responsables.map(responsable => responsable.nombre).join(', ');
  
    // // Construir el mensaje final
    // const mensajeCargado = `Actividad: ${nombre}\nDirección: ${direccion}\nFecha de publicación: ${new Date(fechaPublicacion).toLocaleDateString()}\nFecha de realización: ${new Date(fechaRealizacion).toLocaleDateString()}\nFechas de recordatorio: ${fechasRecordatorio}\nModalidad: ${modalidad}\nResponsables: ${nombresResponsables}\nSemana: ${semana}\nTipo de actividad: ${tipo}`;
  
    return actividad;
  };

  // Actualizar el estado del textarea con el contenido formateado
  useEffect(() => {
    if (mensajeActual) {
      setTextAreaContent(formatActivityDetails());
    }
  }, [mensajeActual]);

  return (

    <div>
        <div className='cajaBasica'>
            <div>
                <h2 className='tituloProfesor'>Mensaje</h2>
                
                <textarea
                    name="postContent"
                    value={textAreaContent}
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
