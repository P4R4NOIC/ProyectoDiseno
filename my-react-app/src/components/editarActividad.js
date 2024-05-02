import React, { useState, useEffect } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

export const EditarActividad = () => {
  var variable= localStorage.getItem("usuario");
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
        semana: '',
        tipoActividad: '',
        nombreActividad: '',
        fechaActividad: '',
        horaActividad: '',
        fechaPublicacion: '',
        diasPrevios: '',
        profesSeleccionados: [],
        afiche: '',
        tipoAsistencia: '',
        enlaceReunion: '',
        recordatorios: [],
        fotosRealizada: [],
        estadoActividad: '',
        observacion: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('datosFormulario');
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

  const handleChangeProfes = (selectedOptions) => {
    setFormData(prevState => ({
      ...prevState,
      profesSeleccionados: selectedOptions, // Almacena las opciones seleccionadas en un array
    }));
  };
  

  const opcionesSemanas = [];
  for (let i = 1; i <= 16; i++) {
    opcionesSemanas.push(<option key={i} value={`Semana${i}`}>Semana {i}</option>);
  }

  const opcionesProfes = [];
  for (let i = 1; i <= 10; i++) {
    opcionesProfes.push(<option key={i} value={`Profe ${i}`}>Profe {i}</option>);
  }



  // Estado para almacenar las fechas de recordatorios
  const [fechasRecordatorios, setFechasRecordatorios] = useState([]);
  const [nuevaFecha, setNuevaFecha] = useState('');

  // Función para añadir una nueva fecha de recordatorio
  const agregarFechaRecordatorio = (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
  
    // Verificar si la nueva fecha no está vacía
    if (nuevaFecha.trim() !== '') {
      setFormData(prevState => {
        // Verificar si la nueva fecha ya existe en la lista de recordatorios
        if (!prevState.recordatorios.includes(nuevaFecha)) {
          // Si la fecha no está repetida, agregarla a la lista de recordatorios en el estado formData
          return {
            ...prevState,
            recordatorios: [...prevState.recordatorios, nuevaFecha]
          };
        }
        // Si la fecha ya existe, retornar el estado actual sin modificar
        return prevState;
      });
  
      // Reiniciar el campo de fecha después de agregarla
      setNuevaFecha('');
    }
  };
  

  // Función para eliminar una fecha de recordatorio
  const eliminarFechaRecordatorio = (index, event) => {
    event.preventDefault();
    const nuevasFechas = [...formData.recordatorios];
    nuevasFechas.splice(index, 1);
    setFechasRecordatorios(nuevasFechas);

    // Actualizar el estado formData.recordatorios
    setFormData(prevState => ({
        ...prevState,
        recordatorios: nuevasFechas
    }));
  };


  const handleChangeAfiche = (event) => {
    const archivo = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const base64String = event.target.result;
      setFormData(prevState => ({
        ...prevState,
        afiche: base64String,
      }));
    };
  
    reader.readAsDataURL(archivo);
  };
  
  const handleChangeImagenesActividad = (event) => {
    const archivos = event.target.files;
    const nuevasImagenes = [];
  
    Array.from(archivos).forEach(archivo => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        nuevasImagenes.push(base64String);
        setFormData(prevState => ({
          ...prevState,
          fotosRealizada: nuevasImagenes,
        }));
      };
      reader.readAsDataURL(archivo);
    });
  };
  

  const guardadoEnBase = () => {
      
      // Lógica para guardar en la base de datos
      console.log('Datos válidos, guardando en la base de datos...');
      console.log(formData);
      localStorage.setItem('datosFormulario', JSON.stringify(formData));
    
  };

  return (
    <div>
    <h1 className = "tituloPrincipal">Coordinador: <label>{variable}</label></h1>  

    <div className = "contenedor contenedorLargo">
        <div>
            <form className="form-signin"> 
            <h2 className="form-signin-heading texto-login">Crear actividad</h2>
              <label className = "textoGenera">Seleccionar semana:</label>
              
              <div>
                <select className="form-control entrada" name='semana' value={formData.semana} onChange={handleChange}>
                
                  <option value={"nulo"}>Seleccionar Semana</option>
                  {opcionesSemanas}
                </select>
              </div>

              <label className = "textoGenera">Seleccionar tipo de actividad:</label> 
              <div>
                <select className="form-control entrada" name='tipoActividad' value={formData.tipoActividad} onChange={handleChange}>
                  <option value={"nulo"}>Seleccionar Actividad</option>
                  <option value={"Orientadoras"}>Orientadoras</option>
                  <option value={"Motivacionales"}>Motivacionales</option>
                  <option value={"Apoyo"}>De apoyo a la vida estudiantil</option>
                  <option value={"Orden"}>De orden técnico</option>
                  <option value={"Recreativa"}>De recreación</option>
                </select>
              </div>
              
              <label className = "textoGenera">Escribir nombre de actividad:</label>
              <input type="text" className="form-control entrada" name='nombreActividad' value={formData.nombreActividad} onChange={handleChange}></input>
              <label className = "textoGenera">Fecha de actividad:</label>
              <input type="date" className="form-control entrada" name='fechaActividad' value={formData.fechaActividad} onChange={handleChange}></input>
              <label className = "textoGenera">Hora de actividad:</label>
              <input type="time" className="form-control entrada" name='horaActividad' value={formData.horaActividad} onChange={handleChange}></input>
              <label className = "textoGenera">Fecha de publicación:</label>
              <input type="date" className="form-control entrada" name='fechaPublicacion' value={formData.fechaPublicacion} onChange={handleChange}></input>
              <label className = "textoGenera">Días previos para anunciar actividad:</label>
              <input type="number" className="form-control entrada" name='diasPrevios' value={formData.diasPrevios} onChange={handleChange} min={0}></input>

              <label className = "textoGenera">Seleccione los profesores encargados utilizando CTRL click:</label>
              <div>
                <select
                className="form-control entrada"
                multiple
                value={formData.profesSeleccionados}
                onChange={(e) => handleChangeProfes(Array.from(e.target.selectedOptions, (option) => option.value))}
                >
                {opcionesProfes}
                </select>

              </div>
              
              <label className = "textoGenera">Afiche:</label>
              <input type="file" id="foto" name="afiche" accept="image/*" className='form-control entrada' onChange={handleChangeAfiche}></input>
              {formData.afiche && (
                <img src={formData.afiche} alt="Afiche seleccionado" style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
              )}

              
              <div>
              <label className ="textoGenera">Tipo de asistencia:</label> 
                <select className="form-control entrada" name='tipoAsistencia' value={formData.tipoAsistencia} onChange={handleChange}>
                  <option value={"nulo"}>Seleccionar tipo de asistencia</option>
                  <option value={"Presencial"}>Presencial</option>
                  <option value={"Remota"}>Remota</option>
                </select>
                {formData.tipoAsistencia === 'Remota' && (
                  <div>
                    <label className ="textoGenera">Escribe el enlace:</label>
                    <input type="text" id="tipoAsistencia" name='enlaceReunion' value={formData.enlaceReunion} onChange={handleChange} placeholder='Ingresa el enlace' className="form-control entrada"/>
                  </div>
                )}
              </div>

              <div>
                <label className ="textoGenera">¿Agregar recordatorios?:</label>
                <input type="date" value={nuevaFecha} onChange={(event) => setNuevaFecha(event.target.value)}/>
                {/* Botón para agregar una nueva fecha de recordatorio */}
                <button onClick={agregarFechaRecordatorio}>Agregar Fecha de Recordatorio</button>

                {/* Lista de fechas de recordatorios */}
                <ul>
                  {formData.recordatorios.map((fecha, index) => (
                    <li key={index}>
                      {fecha}
                      {/* Botón para eliminar la fecha de recordatorio */}
                      <button onClick={(event) => eliminarFechaRecordatorio(index, event)}>Eliminar</button>
                    </li>
                  ))}
                </ul>
              </div>

              <label className = "textoGenera">Seleccionar estado de actividad:</label> 
              <div>
                <select className="form-control entrada" name='estadoActividad' value={formData.estadoActividad} onChange={handleChange}>
                  <option value={"nulo"}>Seleccionar estado</option>
                  <option value={"Planeada"}>Planeada</option>
                  <option value={"Notificada"}>Notificada</option>
                  <option value={"Realizada"}>Realizada</option>
                  <option value={"Cancelada"}>Cancelada</option>
                </select>
                {formData.estadoActividad === 'Realizada' && (
                  <div>
                    {/* Input para subir imágenes */}
                    <input type="file" accept="image/*" multiple onChange={handleChangeImagenesActividad} />
                    {/* Mostrar las imágenes seleccionadas */}
                    <div>
                    {formData.fotosRealizada.map((imagen, index) => (
                      <img key={index} src={imagen} alt={`Imagen ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
                    ))}
                    </div>
                  </div>
                )}
                {formData.tipoAsistencia === 'Remota' && formData.estadoActividad === 'Realizada' && (
                  <div>
                    <label className ="textoGenera">Ingrese enlace de la reunion:</label>
                    <input type="text" name='observacion' value={formData.observacion} onChange={handleChange} placeholder='Ingresar enlace' className="form-control entrada"/>
                  </div>
                )}
                {formData.estadoActividad === 'Cancelada' && (
                  <div>
                    <label className ="textoGenera">Ingrese observación:</label>
                    <input type="text" name='observacion' value={formData.observacion} onChange={handleChange} placeholder='Ej: Hubo lluvia' className="form-control entrada"/>
                  </div>
                )}
              </div>
              
            
           
            
              <button className="button boton btn-submit" type="button" onClick={guardadoEnBase}>
                Editar actividad
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
