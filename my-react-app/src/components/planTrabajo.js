import React from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const PlanTrabajo = () => {
    const navigate = useNavigate();
    var titulo = '';
    if(localStorage.getItem("conexion") === "ADMIN"){
            titulo = "Asistente Administrativo: "
    }else{
            titulo = "Coordinador: "
    }
  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  
  const data = [
      { 
        id: 1,
        nombrePlan: "Plan sublime", 
        anno: 2024,
        semestre: "Primer",
      },
      {
        id: 2,
        nombrePlan: "Plan agotador",
        anno: 2024,
        semestre: "Segundo",
      },
      { 
        id: 3,
        nombrePlan: "Plan definitivo",
        anno: 2025,
        semestre: "Primer",
      },
  ];

  const handleClick = (rowData) => {
    
    // Convertir rowData en un objeto
    const objetoParaGuardar = {
      id: rowData.id,
      nombrePlan: rowData.nombrePlan,
      anno: rowData.anno,
      semestre: rowData.semestre,
    };

    // Guardar el objeto en localStorage
    localStorage.setItem("PlanTrabajoIndividual", JSON.stringify(objetoParaGuardar));
    var infoPlanTrabajoJSON = localStorage.getItem("PlanTrabajoIndividual");
    //var infoPlanTrabajo = JSON.parse(infoPlanTrabajoJSON);
    console.log(infoPlanTrabajoJSON);
    navigate('/cronoActividad');
  };

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
                <th>Nombre Plan de Trabajo</th>
                <th>Año</th>
                <th>Semestre</th>
            </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                  return (
                      <tr key={key} onClick={() => handleClick(val)}>
                          <td>{val.nombrePlan}</td>
                          <td>{val.anno}</td>
                          <td>{val.semestre}</td>
                      </tr>
                  )
              })}
            </tbody>
        </Table>
      </div>

      <div>
        <button className="button boton btn-submit" onClick={ ()=>navigate('/creaPlanTrabajo') }>Crear plan de trabajo</button>
      </div>
      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      
    </div>
  )
}