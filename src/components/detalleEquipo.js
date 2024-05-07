import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const DetalleEquipo = () => {
  var variableJSON = localStorage.getItem("usuario");
  var variable = JSON.parse(variableJSON);
  var titulo = '';
  if(localStorage.getItem("sesionUsuario") === "PROFESOR"){
      if (variable.coordinador === 1) {
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
    const obtenerDetalleEquipo = async () => {
      try {
        const response = await fetch(`http://18.222.222.154:5000/profes/detalle`, {
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
        const datosParseados = data.map(arregloInterior => {
          return arregloInterior.map(objeto => {
            return {
              id: objeto.idEquipo, 
              nombreCompleto: objeto.nombre, 
              correo: objeto.correo,
              numOficina: objeto.telefono, 
              numCel: objeto.celular,
              codigoSede: objeto.codigoSede
            };
          });
        });
        console.log(datosParseados);
        setDatos(datosParseados); // Establecer los datos en el estado

      } catch (error){
        console.error('Error al obtener los datos:', error.message);
      }
    };

    obtenerDetalleEquipo(); 
  }, []);



  async function detectarProximaActividad(){
    //const objetoActividad = await pedirProximaActividad();
    //await localStorage.setItem('actividadActual', objetoActividad);
    navigate('/actividad');
  }

  const pedirProximaActividad = async () => {
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

  const handleClick = (rowData) => {
    
    // Convertir rowData en un objeto
    const objetoParaGuardar = {
      id: rowData.id,
      nombreCompleto: rowData.nombreCompleto,
      correo: rowData.correo,
      numOficina: rowData.numOficina,
      numCel: rowData.numCel,
      codigoSede: rowData.codigoSede
    };

    // Guardar el objeto en localStorage
    localStorage.setItem("profeIndividual", JSON.stringify(objetoParaGuardar));
    var infoProfeJSON = localStorage.getItem("profeIndividual");
    var infoProfe = JSON.parse(infoProfeJSON);
    console.log(infoProfe);
    navigate('/infoProfe');
  };

  return (
    <div>
      <div>
        <h1 className = "tituloPrincipal">{titulo} <label id="nombreCoordinador">{variable.nombreCompleto}</label></h1>  
        <h4 className='tituloPrincipal'> De click sobre un profesor para ver su perfil</h4>
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Número Oficina</th>
                <th>Número Celular</th>
                <th>Código Sede</th>
            </tr>
            </thead>
            <tbody>
            {data && Array.isArray(data) && data.map((subArray, key) => {
              return subArray.map((val, subKey) => (
                <tr key={`${key}-${subKey}`} onClick={() => handleClick(val)}>
                  <td>{val.nombreCompleto}</td>
                  <td>{val.correo}</td>
                  <td>{val.numOficina}</td>
                  <td>{val.numCel}</td>
                  <td>{val.codigoSede}</td>
                </tr>
              ));
            })}
            </tbody>
        </Table>
      </div>

      <div>
        <button className="button boton btn-submit" onClick={ ()=>navigate('/planTrabajo') }>Mostrar planes de trabajo</button>
        <button className="button boton btn-submit" onClick={ ()=>detectarProximaActividad() }>Próxima actividad</button>
      </div>
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      
    </div>
  )
}
