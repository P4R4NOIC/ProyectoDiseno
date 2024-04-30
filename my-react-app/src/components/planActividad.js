import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

export const PlanActividad = () => {
  var variable= localStorage.getItem("usuario");
  const navigate = useNavigate();
  const [semanaSeleccionada, setSemanaSeleccionada] = useState("nulo");
  const [tipoActividadSeleccionado, setActividadSeleccionada] = useState("nulo");
  const [profesSeleccionados, setProfesEscogidos] = useState([]);
  const [tipoAsistenciaSeleccionada, setAsistenciaSeleccionada] = useState("nulo");
  const [tipoEstadoSeleccionado, setEstadoSeleccionado] = useState("nulo");

  const cambiarSemana = (event) => {
    setSemanaSeleccionada(event.target.value)
  }

  const opcionesSemanas = [];
  for (let i = 1; i <= 16; i++) {
    opcionesSemanas.push(<option key={i} value={`Semana${i}`}>Semana {i}</option>);
  }

  const cambiarActividad = (event) => {
    setActividadSeleccionada(event.target.value)
  }

  const escogerProfes = (event) => {
    const opcionesElegidas = Array.from(event.target.selectedOptions, (option) => option.value);
    setProfesEscogidos(opcionesElegidas);
    console.log(opcionesElegidas);
  }

  const opcionesProfes = [];
  for (let i = 1; i <= 10; i++) {
    opcionesProfes.push(<option key={i} value={`${i}`}>Profe {i}</option>);
  }

  const cambiarAsistencia = (event) => {
    setAsistenciaSeleccionada(event.target.value)
  }


  // Estado para almacenar las fechas de recordatorios
  const [fechasRecordatorios, setFechasRecordatorios] = useState([]);
  const [nuevaFecha, setNuevaFecha] = useState('');

  // Función para añadir una nueva fecha de recordatorio
  const agregarFechaRecordatorio = (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Agregar la nueva fecha solo si no está vacía
    if (nuevaFecha.trim() !== '') {
      setFechasRecordatorios([...fechasRecordatorios, nuevaFecha]);
      setNuevaFecha(''); // Reiniciar el campo de fecha después de agregarla
    }
  };

  // Función para eliminar una fecha de recordatorio
  const eliminarFechaRecordatorio = (index, event) => {
    event.preventDefault();
    const nuevasFechas = [...fechasRecordatorios];
    nuevasFechas.splice(index, 1);
    setFechasRecordatorios(nuevasFechas);
  };

  const cambiarEstado = (event) => {
    setEstadoSeleccionado(event.target.value)
  }

  const [imagenes, setImagenes] = useState([]);

  const manejarCambio = (event) => {
    const archivos = event.target.files; // Obtener la lista de archivos seleccionados
    const nuevasImagenes = [];

    // Iterar sobre la lista de archivos y guardar sus URLs en el estado
    for (let i = 0; i < archivos.length; i++) {
      const urlImagen = URL.createObjectURL(archivos[i]);
      nuevasImagenes.push(urlImagen);
    }

    // Actualizar el estado con la nueva lista de imágenes
    setImagenes(nuevasImagenes);
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
                <select className="form-control entrada" value={semanaSeleccionada} onChange={cambiarSemana}>
                
                  <option value={"nulo"}>Seleccionar Semana</option>
                  {opcionesSemanas}
                </select>
              </div>

              <label className = "textoGenera">Seleccionar tipo de actividad:</label> 
              <div>
                <select className="form-control entrada" value={tipoActividadSeleccionado} onChange={cambiarActividad}>
                  <option value={"nulo"}>Seleccionar Actividad</option>
                  <option value={"Orientadoras"}>Orientadoras</option>
                  <option value={"Motivacionales"}>Motivacionales</option>
                  <option value={"Apoyo"}>De apoyo a la vida estudiantil</option>
                  <option value={"Orden"}>De orden técnico</option>
                  <option value={"Recreativa"}>De recreación</option>
                </select>
              </div>
              
              <label className = "textoGenera">Escribir nombre de actividad:</label>
              <input type="text" className="form-control entrada" required=""></input>
              <label className = "textoGenera">Fecha de actividad:</label>
              <input type="date" className="form-control entrada" required=""></input>
              <label className = "textoGenera">Hora de actividad:</label>
              <input type="time" className="form-control entrada" required=""></input>
              <label className = "textoGenera">Fecha de publicación:</label>
              <input type="date" className="form-control entrada" required=""></input>
              <label className = "textoGenera">Días previos para anunciar actividad:</label>
              <input type="number" className="form-control entrada" required=""></input>

              <label className = "textoGenera">Seleccione los profesores encargados utilizando CTRL click:</label>
              <div>
                <select className="form-control entrada" multiple value={profesSeleccionados} onChange={escogerProfes} >
                  {opcionesProfes}
                </select>
              </div>
              
              <label className = "textoGenera">Afiche:</label>
              <input type="file" id="foto" name="foto" accept = "image/*" className='form-control entrada'></input>

              <label className ="textoGenera">Tipo de asistencia:</label> 
              <div>
                <select className="form-control entrada" value={tipoAsistenciaSeleccionada} onChange={cambiarAsistencia}>
                  <option value={"nulo"}>Seleccionar tipo de asistencia</option>
                  <option value={"Presencial"}>Presencial</option>
                  <option value={"Remota"}>Remota</option>
                </select>
                {tipoAsistenciaSeleccionada === 'Remota' && (
                  <div>
                    <label className ="textoGenera">Escribe el enlace:</label>
                    <input type="text" id="tipoAsistencia" placeholder='Ingresa el enlace' className="form-control entrada"/>
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
                  {fechasRecordatorios.map((fecha, index) => (
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
                <select className="form-control entrada" value={tipoEstadoSeleccionado} onChange={cambiarEstado}>
                  <option value={"nulo"}>Seleccionar estado</option>
                  <option value={"Planeada"}>Planeada</option>
                  <option value={"Notificada"}>Notificada</option>
                  <option value={"Realizada"}>Realizada</option>
                  <option value={"Cancelada"}>Cancelada</option>
                </select>
                {tipoEstadoSeleccionado === 'Realizada' && (
                  <div>
                    {/* Input para subir imágenes */}
                    <input type="file" accept="image/*" multiple onChange={manejarCambio} />
              
                    {/* Mostrar las imágenes seleccionadas */}
                    <div>
                      {imagenes.map((imagen, index) => (
                        <img key={index} src={imagen} alt={`Imagen ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
                      ))}
                    </div>
                  </div>
                )}
                {tipoAsistenciaSeleccionada === 'Remota' && tipoEstadoSeleccionado === 'Realizada' && (
                  <div>
                    <label className ="textoGenera">Ingrese enlace de la reunion:</label>
                    <input type="text" id="tipoAsistencia" placeholder='Ingresar enlace' className="form-control entrada"/>
                  </div>
                )}
                {tipoEstadoSeleccionado === 'Cancelada' && (
                  <div>
                    <label className ="textoGenera">Ingrese observación:</label>
                    <input type="text" id="tipoAsistencia" placeholder='Ej: Hubo lluvia' className="form-control entrada"/>
                  </div>
                )}
              </div>
              
            
           
            
              <button className="button boton btn-submit" type="button" onClick={console.log(fechasRecordatorios)}>
                Crear actividad
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
