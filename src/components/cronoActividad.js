import React from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const CronoActividad = () => {
  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      actividad: "Reunión de equipo",
      fecha: "2024-04-28",
      tipo: "Planificada",
      estado: "Pendiente"
    },
    {
      id: 1124,
      actividad: "Entrega de informe",
      fecha: "2024-05-05",
      tipo: "Programada",
      estado: "En progreso"
    },
    {
      id: 152,
      actividad: "Capacitación de personal",
      fecha: "2024-05-12",
      tipo: "Programada",
      estado: "Completada"
    }
  ];

  const handleClick = (rowData) => {
    var idActual = rowData.id;
    localStorage.setItem("idActividadActual",idActual);
    
    navigate('/actividad');
  };

  return (
    <div>
      <div>
        <h1 className='tituloPrincipal'>Cronograma de actividades:</h1>  
        <h4 className='tituloPrincipal'> De click sobre una actividad para visitarla</h4>
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Actividad</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Estado</th>
            </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                  return (
                      <tr key={key} onClick={() => handleClick(val)}>
                          <td>{val.actividad}</td>
                          <td>{val.fecha}</td>
                          <td>{val.tipo}</td>
                          <td>{val.estado}</td>
                      </tr>
                  )
              })}
            </tbody>
        </Table>
      </div>
      {usuario.coordinador === 1 && (
        <div className='divVolver'>
          <button className="button boton btn-submit" onClick={ ()=> navigate('/planActividad')}>Crear actividad</button>
        </div>
      )}
      {usuario.coordinador !== 1 && (
        <div className='divVolver'>
        <button className="button boton disabled btn-submit">Crear actividad</button>
      </div>
      )}
    
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      
    </div>
  )
}
