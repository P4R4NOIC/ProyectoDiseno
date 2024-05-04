import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

export const PlanActividad = () => {
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
    opcionesProfes.push(<option key={i} value={`Profe ${i}`}>Profe {i}</option>);
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
    const nuevoEstado = event.target.value;
    
    setEstadoSeleccionado(nuevoEstado);
  }


  const [imageBase64, setImageBase64] = useState('');

  const manejarImg = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      setImageBase64(base64String);
    };

    reader.readAsDataURL(file);
  };


  const guardarDatos = (event) => {
    try {
      event.preventDefault();

          // Construir un objeto con todos los datos del formulario
      const datosFormulario = {
          semana: semanaSeleccionada,
          tipoActividad: tipoActividadSeleccionado,
          nombreActividad: document.getElementById('nombreActividad').value,
          fechaActividad: document.getElementById('fechaActividad').value,
          horaActividad: document.getElementById('horaActividad').value,
          fechaPublicacion: document.getElementById('fechaPublicacion').value,
          diasPrevios: document.getElementById('diasPrevios').value,
          profesSeleccionados: profesSeleccionados,
          afiche: imageBase64,
          tipoAsistencia: tipoAsistenciaSeleccionada,
          enlaceReunion: document.getElementById('enlaceReunion') ? document.getElementById('enlaceReunion').value : '',
          recordatorios: fechasRecordatorios,
          estadoActividad: tipoEstadoSeleccionado,
          fotosRealizada: [],
          observacion: '',
          fechaCancelacion: '',
      };

      validarDatos(datosFormulario);

      // Guardar el objeto en localStorage
      localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));

      // Opcional: Mostrar una alerta o realizar alguna otra acción después de guardar los datos
      console.log("Datos guardados correctamente en localStorage");
      console.log(datosFormulario);
    }catch(error){
      alert("Error: " + error.message);
    }
  }

  const validarDatos = (datosFormulario) => {
    if (datosFormulario.semana === "nulo"){
      throw new Error('La semana no puede ser nula');
    };
    if (datosFormulario.tipoActividad === "nulo"){
      throw new Error('El tipo de actividad no puede ser nulo');
    };
    if (datosFormulario.nombreActividad === ''){
      throw new Error('Nombre de actividad no puede ser nulo');
    };
    if (datosFormulario.fechaActividad === ''){
      throw new Error('La fecha de actividad no puede ser nula');
    };
    if (datosFormulario.horaActividad === ''){
      throw new Error('La hora de actividad no puede ser nula');
    };
    if (datosFormulario.fechaPublicacion === ''){
      throw new Error('La fecha de publicación no puede ser nula');
    };   

    const fechaRealizacionDate = new Date(datosFormulario.fechaActividad);
    const fechaPublicacionDate = new Date(datosFormulario.fechaPublicacion);
    if (fechaRealizacionDate < fechaPublicacionDate) {
      throw new Error('La fecha de publicación no puede ser posterior a la fecha de la actividad.');
    }

    if (datosFormulario.diasPrevios === ''){
      throw new Error('Los días previos no pueden ser vacíos');
    };
    if (datosFormulario.profesSeleccionados.length == 0){
      throw new Error('Debe de seleccionar al menos a un profesor');
    };
    if (datosFormulario.afiche === ''){
      throw new Error('Debe de subir un afiche');
    };
    if (datosFormulario.tipoAsistencia === 'nulo'){
      throw new Error('Debe de seleccionar un tipo de asistencia');
    };
    if (datosFormulario.tipoAsistencia === 'Remota' && datosFormulario.enlaceReunion === ''){
      throw new Error('Debe de ingresar el enlace de reunión');
    };


    for (const fechaRecordatorio of datosFormulario.recordatorios) {
      const fechaRecordatorioDate = new Date(fechaRecordatorio);
      if (fechaRecordatorioDate > fechaRealizacionDate || fechaRecordatorioDate < fechaPublicacionDate) {
        throw new Error('Las fechas de recordatorio deben estar dentro del rango entre la fecha de realización y la fecha de publicación.');
      }
    }

    if (datosFormulario.estadoActividad === 'nulo'){
      throw new Error('Debe de seleccionar un estado para la actividad');
    };
          
  }

  return (
    <div>

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
              <input type="text" id='nombreActividad' className="form-control entrada" required=""></input>
              <label className = "textoGenera">Fecha de actividad:</label>
              <input type="date" id='fechaActividad' className="form-control entrada" required=""></input>
              <label className = "textoGenera">Hora de actividad:</label>
              <input type="time" id='horaActividad' className="form-control entrada" required=""></input>
              <label className = "textoGenera">Fecha de publicación:</label>
              <input type="date" id='fechaPublicacion' className="form-control entrada" required=""></input>
              <label className = "textoGenera">Días previos para anunciar actividad:</label>
              <input type="number" id='diasPrevios' className="form-control entrada" required="" min={0}></input>

              <label className = "textoGenera">Seleccione los profesores encargados utilizando CTRL click:</label>
              <div>
                <select className="form-control entrada" multiple value={profesSeleccionados} onChange={escogerProfes} >
                  {opcionesProfes}
                </select>
              </div>
              
              <label className = "textoGenera">Afiche:</label>
              
              <input type="file" id="afiche" name="afiche" accept = "image/*" className='form-control entrada' onChange={manejarImg}></input>

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
                    <input type="text" id="enlaceReunion" placeholder='Ingresa el enlace' className="form-control entrada"/>
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
                </select>
                
              </div>
              
            
           
            
              <button className="button boton btn-submit" type="button" onClick={guardarDatos}>
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
