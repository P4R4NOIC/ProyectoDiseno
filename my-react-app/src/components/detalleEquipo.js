import React from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const DetalleEquipo = () => {

  if(localStorage.getItem("conexion") == "ADMIN"){
      var titulo = "Asistente Administrativo: "
  }else{
    var titulo = "Coordinador: "
  }
  var variable= localStorage.getItem("usuario");
  const navigate = useNavigate();
  const data = [
      { 
        id: 1,
        nombre: "Roberto", 
        segundoNombre: "Daniel", 
        primerApellido: "Vindas", 
        segundoApellido: "Hernández", 
        correo: "correo@correo.com", 
        numOficina: 20202000, 
        numCel: 61621252 
      },
      {
        id: 2,
        nombre: "Ana",
        segundoNombre: "María",
        primerApellido: "García",
        segundoApellido: "López",
        correo: "ana@gmail.com",
        numOficina: 30303030,
        numCel: 62345678
      },
      { 
        id: 3,
        nombre: "Juan",
        segundoNombre: "Carlos",
        primerApellido: "Pérez",
        segundoApellido: "Martínez",
        correo: "juan@hotmail.com",
        numOficina: 40404040,
        numCel: 65432198
      },
  ];

  function detectarProximaActividad(){
    alert("IMPRIMIR PROXIMA ACTIVIDAD");
  }

  const handleClick = (rowData) => {
    
    // Convertir rowData en un objeto
    const objetoParaGuardar = {
      id: rowData.id,
      nombre: rowData.nombre,
      segundoNombre: rowData.segundoNombre,
      primerApellido: rowData.primerApellido,
      segundoApellido: rowData.segundoApellido,
      correo: rowData.correo,
      numOficina: rowData.numOficina,
      numCel: rowData.numCel
    };

    // Guardar el objeto en localStorage
    localStorage.setItem("ProfeIndividual", JSON.stringify(objetoParaGuardar));
    var infoProfeJSON = localStorage.getItem("ProfeIndividual");
    var infoProfe = JSON.parse(infoProfeJSON);
    alert(infoProfe.id);
  };

  return (
    <div>
      <div>
        <h1 className = "tituloPrincipal">{titulo} <label id="nombreCoordinador">{variable}</label></h1>  
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Número Oficina</th>
                <th>Número Celular</th>
            </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                  return (
                      <tr key={key} onClick={() => handleClick(val)}>
                          <td>{val.nombre + " " + val.segundoNombre + " " + val.primerApellido + " " + val.segundoApellido}</td>
                          <td>{val.correo}</td>
                          <td>{val.numOficina}</td>
                          <td>{val.numCel}</td>
                      </tr>
                  )
              })}
            </tbody>
        </Table>
      </div>

      <div>
        <button className="button boton btn-submit" onClick={ ()=>navigate('/cronoActividad') }>Mostrar cronograma</button>
        <button className="button boton btn-submit" onClick={ ()=>detectarProximaActividad() }>Próxima actividad</button>
      </div>
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      
    </div>
  )
}
