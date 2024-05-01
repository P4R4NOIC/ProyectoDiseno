import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

export const Actividad = () => {
  const navigate = useNavigate();
  var idObservado = localStorage.getItem("idActividadActual");
  var actividadJSON = localStorage.getItem("datosFormulario");
  var info = JSON.parse(actividadJSON);
  
  const data = info;
  console.log(data);


  const agregarComentario = () => {
    
  }

  return (
    <div>
      <h1 className = "tituloPrincipal">Actividad: <label>{data.nombreActividad}</label></h1>  
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate('/editarActividad')}>Editar Actividad</button>
      
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
                <tr>
                    <th>Semana</th>
                    <th>Tipo de Actividad</th>
                    <th>Fecha de Actividad</th>
                    <th>Hora de Actividad</th>
                    <th>Fecha de Publicación</th>
                    <th>Días Previos</th>
                    <th>Profes Seleccionados</th>
                    <th>Asistencia</th>
                    {data.tipoAsistencia === 'Remota' && (
                        <th>Enlace de Reunión</th>
                    )}
                    <th>Recordatorios</th>
                    <th>Estado de Actividad</th>
                    <th>Fotos Realizadas</th>
                    <th>Observación</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.semana}</td>
                    <td>{data.tipoActividad}</td>
                    <td>{data.fechaActividad}</td>
                    <td>{data.horaActividad}</td>
                    <td>{data.fechaPublicacion}</td>
                    <td>{data.diasPrevios}</td>
                    <td>{data.profesSeleccionados.join(', ')}</td>
                    <td>{data.tipoAsistencia}</td>
                    {data.tipoAsistencia === 'Remota' && (
                        <td>{data.enlaceReunion}</td>
                    )}
                    <td>
                        <ul>
                          {data.recordatorios ? data.recordatorios.map((recordatorio, index) => (
                              <li key={index}>{recordatorio}</li>
                          )) : null}
                        </ul>
                    </td>
                    <td>{data.estadoActividad}</td>
                    <td>
                        <ul>
                            {data.fotosRealizada.map((imagen, index) => (
                                <img key={index} src={imagen} alt={`Imagen ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
                            ))}
                            
                        </ul>
                    </td>
                    <td>{data.observacion}</td>
                </tr>
            </tbody>
        </Table>
        <div>
          <h2>Afiche</h2>
          <img src="haha.png" alt="haha.png" style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
        </div>
      </div>

      <div className='cajaTabla'>
        {/*Agregar comentario*/}
        <button className="button boton btn-submit" onClick={ ()=> agregarComentario}>Agregar comentario</button>
        {/*Comentarios*/}
      </div>
      
    </div>
  )
}
