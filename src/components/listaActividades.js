import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const ListaActividades = () => {

  const navigate = useNavigate();
  // var listaActividadesJSON = localStorage.getItem("listaActividades");
  // var data = JSON.parse(listaActividadesJSON);
  const [data, setDatos] = useState([]);

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const response = await fetch(`https://diseno-api.onrender.com/planes/actividades/1`, {
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

  return (

    <div>
      <div>
        <h1 className='tituloPrincipal'>Calendario de actividades:</h1>  
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Actividad</th>
                <th>Fecha de realización</th>
                <th>Tipo</th>
                <th>Estado</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, key) => {
              const valoresGenerales = item.valoresGenerales; // Accede a la propiedad valoresGenerales de cada objeto
              return (
                <tr key={key}>
                  <td>{valoresGenerales.nombre}</td> 
                  <td>{valoresGenerales.fechaRealizacion}</td>
                  <td>{valoresGenerales.tipo}</td>
                  <td>{valoresGenerales.estado}</td>
                </tr>
              );
            })}
            </tbody>
        </Table>
      </div>
    
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      
    </div>

  )
}
