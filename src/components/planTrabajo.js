import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const PlanTrabajo = () => {
    var usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var titulo = '';
    if(localStorage.getItem("sesionUsuario") === "PROFESOR"){
      if (usuario.coordinador === 1) {
        titulo = "Coordinador: "
      }
      else{
        titulo = "Profesor Guía: "
      }
    }else{
        titulo = "Asistente Administrativo: "
    }
  const navigate = useNavigate();
  
  const [data, setDatos] = useState([]);

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
        setDatos(data); // Establecer los datos en el estado

      } catch (error){
        console.error('Error al obtener los datos:', error.message);
      }
    };

    obtenerInfo(); 
  }, []);



  const handleClick = async (rowData) => {
    
    
    const listaActividades = await pedirListaActividades(rowData.idPlan);
    
    localStorage.setItem("listaActividades", JSON.stringify(listaActividades));
    console.log(listaActividades);
    navigate('/cronoActividad');
  };

  const pedirListaActividades = async (idPlan) => {
    try {
      const response = await fetch(`http://18.222.222.154:5000/planes/actividades/${idPlan}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos del detalle de equipo');
      }

      const data = await response.json(); // Parsear la respuesta a formato JSON

      return data;

    } catch (error){
      console.error('Error al obtener los datos:', error.message);
    }
  }

  return (
    <div>
      <div>
        <h1 className = "tituloPrincipal">{titulo} <label id="nombreCoordinador">{usuario.nombreCompleto}</label></h1>  
        <h4 className='tituloPrincipal'> De click sobre un plan de trabajo para ver su cronograma de actividades</h4>
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Equipo</th>
                <th>Año</th>
                <th>Semestre</th>
            </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                  return (
                      <tr key={key} onClick={() => handleClick(val)}>
                          <td>{val.equipo}</td>
                          <td>{val.año}</td>
                          <td>{val.semestre}</td>
                      </tr>
                  )
              })}
            </tbody>
        </Table>
      </div>
      {usuario.coordinador === 1 && (
        <div>
          <button className="button boton btn-submit" onClick={ ()=>navigate('/creaPlanTrabajo') }>Crear plan de trabajo</button>
        </div>
      )}
      {usuario.coordinador !== 1 && (
        <div>
          <button className="button boton disabled btn-submit">Crear plan de trabajo</button>
        </div>
      )}
      
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      
    </div>
  )
}