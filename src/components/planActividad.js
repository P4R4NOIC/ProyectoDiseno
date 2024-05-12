import React, { useState, useEffect } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

export const PlanActividad = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    valoresGenerales: {
      idActividad: "",
      nombre: "",
      semana: "",
      direccion: "",
      tipo: "",
      modalidad: "",
      fechaPublicacion: "",
      fechaRealizacion: "",
      afiche: "",
      estado: "",
      fechaRecordatorio: [],
      responsables: [],
    },
    fotos: [],
    descripcionCancelacion: "",
    idPlan: "",
  });

  useEffect(() => {
    if (formData.valoresGenerales.estado === 'Planeada' || formData.valoresGenerales.estado === 'Notificada') {
      setFormData(prevState => ({
        ...prevState,
        fechaCancelacion: '',
        fotos: [],
        descripcionCancelacion: '',
      }));
    }
  
    if (formData.valoresGenerales.estado === 'Realizada') {
      setFormData(prevState => ({
        ...prevState,
        fechaCancelacion: '',
        descripcionCancelacion: '',
      }));
    }
  
    if (formData.valoresGenerales.estado === 'Cancelada') {
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
      const dia = String(fechaActual.getDate()).padStart(2, '0');
      const fechaFormateada = `${año}-${mes}-${dia}`;
  
      setFormData(prevState => ({
        ...prevState,
        fechaCancelacion: fechaFormateada,
        fotos: [],
      }));
    }
  }, [formData.valoresGenerales.estado]); 
  
  useEffect(() => {
    const idDelPlan = localStorage.getItem('idPlanActual');
    setFormData(prevState => ({
      ...prevState,
      idPlan: idDelPlan,
    }));
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      valoresGenerales: {
        ...prevState.valoresGenerales,
        [name]: value,
      }
    }));
  };

  const handleChangeObservacion = (e) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      descripcionCancelacion: value
    }));
  };

  const handleChangeProfes = (selectedOptions) => {
    const selectedResponsables = selectedOptions.map(option => ({
      correo: option.correo,
      nombre: option.nombre
    }));
    setFormData(prevState => ({
      ...prevState,
      valoresGenerales: {
        ...prevState.valoresGenerales,
        responsables: selectedResponsables,
      }
    }));
  };
  

  const opcionesSemanas = [];
  for (let i = 1; i <= 16; i++) {
    opcionesSemanas.push(<option key={i} value={i}>Semana {i}</option>);
  }

  const [opcionesProfes, setOpcionesProfes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://diseno-api.onrender.com/profes/detalle`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Error al obtener los datos del detalle de equipo');
        }
        const data = await response.json();
        setOpcionesProfes(data);
    
      } catch (error){
        console.error('Error al obtener los datos:', error.message);
        setOpcionesProfes([]); // Asigna un array vacío en caso de error
      }
    };

    fetchData(); // Llamada a la función para obtener los datos al montar el componente
  }, []);

  // Estado para almacenar las fechas de recordatorios
  const [nuevaFecha, setNuevaFecha] = useState('');

  // Función para añadir una nueva fecha de recordatorio
  const agregarFechaRecordatorio = (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Verificar si la nueva fecha no está vacía
    if (nuevaFecha.trim() !== '') {
      setFormData(prevState => {
        // Verificar si la nueva fecha ya existe en la lista de recordatorios
        const fechaExistente = prevState.valoresGenerales.fechaRecordatorio.find(fecha => fecha.fechaR === nuevaFecha);
        if (!fechaExistente) {
          // Si la fecha no está repetida, agregarla a la lista de recordatorios en el estado formData
          return {
            ...prevState,
            valoresGenerales: {
              ...prevState.valoresGenerales,
              fechaRecordatorio: [...prevState.valoresGenerales.fechaRecordatorio, { idFecRec: prevState.valoresGenerales.fechaRecordatorio.length + 1, idActividad: prevState.valoresGenerales.idActividad, fechaR: nuevaFecha }]
            }
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
  const eliminarFechaRecordatorio = (idFecRec) => {
    setFormData(prevState => ({
      ...prevState,
      valoresGenerales: {
        ...prevState.valoresGenerales,
        fechaRecordatorio: prevState.valoresGenerales.fechaRecordatorio.filter(fecha => fecha.idFecRec !== idFecRec)
      }
    }));
  };


  const handleChangeAfiche = (event) => {
    const archivo = event.target.files[0];
  
    // Verificar si el archivo es un Blob
    if (archivo instanceof Blob) {
      const reader = new FileReader();
    
      reader.onload = (event) => {
        const base64String = event.target.result;
        setFormData(prevState => ({
          ...prevState,
          valoresGenerales: {
            ...prevState.valoresGenerales,
            afiche: base64String,
          }
        }));
      };
    
      reader.readAsDataURL(archivo);
    }else{
      setFormData(prevState => ({
        ...prevState,
        valoresGenerales: {
          ...prevState.valoresGenerales,
          afiche: "",
        }
      }));
    }
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
          fotos: nuevasImagenes,
        }));
      };
      reader.readAsDataURL(archivo);
    });
  };
  

  const guardadoEnBase = async () => {
    try{
      // Lógica para guardar en la base de datos
      await validarDatos();
  
      console.log('Datos válidos, guardando en la base de datos...');
      //console.log(formData);

      console.log(JSON.stringify(formData));
      await subirDatos(formData);
      
      navigate('/planActividad');
    }
    catch(error){
      alert("Error: " + error.message);
    }
  };

  
  async function validarDatos() {
      if (formData.valoresGenerales.semana === "nulo"){
        throw new Error('La semana no puede ser nula');
      };
      if (formData.valoresGenerales.tipo === "nulo"){
        throw new Error('El tipo de actividad no puede ser nula');
      };
      if (formData.valoresGenerales.nombre === ''){
        throw new Error('El nombre de actividad no puede ser vacío');
      };
      if (formData.valoresGenerales.fechaRealizacion === ''){
        throw new Error('La fecha de actividad no puede ser nula');
      };
      if (formData.valoresGenerales.fechaPublicacion === ''){
        throw new Error('La fecha de publicación no puede ser nula');
      };

      // Convertir fechaActividad a un objeto Date
      const fechaRealizacionDate = new Date(formData.valoresGenerales.fechaRealizacion);


      const fechaPublicacionDate = new Date(formData.valoresGenerales.fechaPublicacion);
      if (fechaRealizacionDate < fechaPublicacionDate) {
        throw new Error('La fecha de publicación no puede ser posterior a la fecha de la actividad.');
      }

      if (formData.valoresGenerales.responsables.length == 0){
        throw new Error('Debe de seleccionar al menos a un profesor');
      };
      // if (formData.valoresGenerales.afiche === ''){
      //   throw new Error('Tiene que agregar un afiche');
      // };
      if (formData.valoresGenerales.modalidad == 'nulo'){
        throw new Error('El tipo de asistencia no puede ser nulo');
      };
      if (formData.valoresGenerales.modalidad === 'Remota' && formData.valoresGenerales.direccion === ''){
        throw new Error('Debe de ingresar el enlace de reunión');
      };
      if (formData.valoresGenerales.modalidad === 'Presencial' && formData.valoresGenerales.direccion === ''){
        throw new Error('Debe de ingresar una direccion');
      };

      for (const fechaRecordatorio of formData.valoresGenerales.fechaRecordatorio) {
        const fechaRecordatorioDate = new Date(fechaRecordatorio);
        if (fechaRecordatorioDate > fechaRealizacionDate || fechaRecordatorioDate < fechaPublicacionDate) {
          throw new Error('Las fechas de recordatorio deben estar dentro del rango entre la fecha de realización y la fecha de publicación.');
        }
      }

      if (formData.valoresGenerales.estado === 'nulo'){
        throw new Error('Debe de seleccionar un estado para la actividad');
      };
      
      if (formData.valoresGenerales.estado === 'Realizada'){
        if (formData.valoresGenerales.modalidad === 'Presencial'){
          if (formData.fotos.length == 0){
            throw new Error('Tiene que agregar evidencia en forma de una o varias fotos');
          };
        };

        if (formData.valoresGenerales.modalidad === 'Remota'){
          if (formData.fotos.length == 0 && formData.descripcionCancelacion === ''){
            throw new Error('Tiene que agregar evidencia en forma de una o varias fotos, o agregar el enlace para acceder a la grabación');
          };
        };
      };

      if (formData.valoresGenerales.estado === 'Cancelada'){
        if (formData.descripcionCancelacion === ''){
          throw new Error('Tiene que agregar una observación');
        };
      };
  } 

  async function subirDatos(formData) {
    try{
      const response = await fetch('https://diseno-api.onrender.com/planes/add/actividad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al subir datos');
      }
    }catch(error){
      console.error('Error al subir datos:', error.message);
    }
  }

  return (
    <div>
      
    <div className = "contenedor contenedorLargo">
        <div>
            <form className="form-signin"> 
            <h2 className="form-signin-heading texto-login">Crear actividad</h2>
              <label className = "textoGenera">Seleccionar semana:</label>
              
              <div>
                <select className="form-control entrada" name='semana' value={formData.valoresGenerales.semana} onChange={handleChange}>
                
                  <option value={"nulo"}>Seleccionar Semana</option>
                  {opcionesSemanas}
                </select>
              </div>

              <label className = "textoGenera">Seleccionar tipo de actividad:</label> 
              <div>
                <select className="form-control entrada" name='tipo' value={formData.valoresGenerales.tipo} onChange={handleChange}>
                  <option value={"nulo"}>Seleccionar Actividad</option>
                  <option value={"Orientadoras"}>Orientadoras</option>
                  <option value={"Motivacionales"}>Motivacionales</option>
                  <option value={"Apoyo"}>De apoyo a la vida estudiantil</option>
                  <option value={"Orden"}>De orden técnico</option>
                  <option value={"Recreativa"}>De recreación</option>
                </select>
              </div>
              
              <label className = "textoGenera">Escribir nombre de actividad:</label>
              <input type="text" className="form-control entrada" name='nombre' value={formData.valoresGenerales.nombre} onChange={handleChange}></input>
              <label className = "textoGenera">Fecha de actividad:</label>
              <input type="datetime-local" className="form-control entrada" name='fechaRealizacion' value={formData.valoresGenerales.fechaRealizacion} onChange={handleChange}></input>
              <label className = "textoGenera">Fecha de publicación:</label>
              <input type="date" className="form-control entrada" name='fechaPublicacion' value={formData.valoresGenerales.fechaPublicacion} onChange={handleChange}></input>

              <label className = "textoGenera">Seleccione los profesores encargados utilizando CTRL click:</label>
              <div>
              {opcionesProfes.length > 0 && (
                <select
                  className="form-control entrada"
                  multiple
                  value={formData.valoresGenerales.responsables.map(responsable => responsable.correo)}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => {
                      return opcionesProfes[0].find(responsable => responsable.correo === option.value);
                    });
                    handleChangeProfes(selectedOptions);
                  }}
                >
                  {opcionesProfes[0].map(responsable => (
                    <option key={responsable.correo} value={responsable.correo}>
                      {responsable.nombre}
                    </option>
                  ))}
                </select>
              )}


              </div>
              
              <label className = "textoGenera">Afiche:</label>
              <input type="file" id="foto" name="afiche" accept="image/*" className='form-control entrada' onChange={handleChangeAfiche}></input>
              {formData.valoresGenerales.afiche && (
                <img src={formData.valoresGenerales.afiche} alt={formData.valoresGenerales.afiche} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
              )}

              
              <div>
              <label className ="textoGenera">Tipo de asistencia:</label> 
                <select className="form-control entrada" name='modalidad' value={formData.valoresGenerales.modalidad} onChange={handleChange}>
                  <option value={"nulo"}>Seleccionar tipo de asistencia</option>
                  <option value={"Presencial"}>Presencial</option>
                  <option value={"Remota"}>Remota</option>
                </select>
                
                  <div>
                    {formData.valoresGenerales.modalidad === 'Presencial' && (
                      <label className ="textoGenera">Escriba la ubicación:</label>
                    )}
                    {formData.valoresGenerales.modalidad === 'Remota' && (
                      <label className ="textoGenera">Escribe el enlace:</label>
                    )}
                    {(formData.valoresGenerales.modalidad === 'Remota' || formData.valoresGenerales.modalidad === 'Presencial') && (
                      <input type="text" id="tipoAsistencia" name='direccion' value={formData.valoresGenerales.direccion} onChange={handleChange} placeholder='Ingresa el enlace' className="form-control entrada"/>
                    )}
                    
                  </div>
                
              </div>

              <div>
                <label className ="textoGenera">¿Agregar recordatorios?:</label>
                <input type="date" value={nuevaFecha} onChange={(event) => setNuevaFecha(event.target.value)}/>
                
                <button onClick={agregarFechaRecordatorio}>Agregar Fecha de Recordatorio</button>

                
                <ul>
                  {formData.valoresGenerales.fechaRecordatorio.map((fecha, index) => (
                    <li key={index}>
                      {fecha.fechaR}
                      {/* Cambiar el tipo de botón de "submit" a "button" */}
                      <button type="button" onClick={() => eliminarFechaRecordatorio(fecha.idFecRec)}>Eliminar</button>
                    </li>
                  ))}
                </ul>
              </div>

              <label className = "textoGenera">Seleccionar estado de actividad:</label> 
              <div>
                <select className="form-control entrada" name='estado' value={formData.valoresGenerales.estado} onChange={handleChange}>
                  <option value={"nulo"}>Seleccionar estado</option>
                  <option value={"Planeada"}>Planeada</option>
                  <option value={"Notificada"}>Notificada</option>
                </select>
                
              </div>
              
            
           
            
              <button className="button boton btn-submit" type="button" onClick={guardadoEnBase}>
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
