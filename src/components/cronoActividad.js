import React, { useState, useEffect } from 'react'
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

  //const [data, setDatos] = useState([]);

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const response = await fetch(`http://18.222.222.154:5000/planes/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del detalle de equipo');
        }

        const data = await response.json(); // Parsear la respuesta a formato JSON

        // Procesar los datos y establecer el estado
        
        console.log(data);
        //setDatos(data); // Establecer los datos en el estado

      } catch (error){
        console.error('Error al obtener los datos:', error.message);
      }
    };

    obtenerInfo(); 
  }, []);

  const handleClick = async (rowData) => {
    
    //const objetoActividad = await pedirActividad(rowData.id);
    //await localStorage.setItem("actividadActual", objetoActividad);
    
    navigate('/actividad');
  };

  const pedirActividad = async (idActividad) => {
    try {
        
        const response = await fetch(`http://18.222.222.154:5000/profes/guia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error('Error al obtener la próxima actividad');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();
        return data;
        
    } catch (error){
      throw new Error('Error: ' + error.message);
    }
  }

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
