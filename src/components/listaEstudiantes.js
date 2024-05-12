import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const ListaEstudiantes = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://diseno-api.onrender.com/excel/recuperarTodos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Error al obtener los datos del detalle de equipo');
        }
        const data = await response.json();
        setData(data);
    
      } catch (error){
        console.error('Error al obtener los datos:', error.message);
        setData([]); // Asigna un array vacío en caso de error
      }
    };

    fetchData(); // Llamada a la función para obtener los datos al montar el componente
  }, []);

  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  console.log(usuario);
  

    const [orden, setOrden] = useState({ criterio: null, tipo: 'ascendente' });

    const ordenarPor = (criterio) => {
      if (orden.criterio === criterio) {
        setOrden({ ...orden, tipo: orden.tipo === 'ascendente' ? 'descendente' : 'ascendente' });
      } else {
        setOrden({ criterio: criterio, tipo: 'ascendente' });
      }
    };

    const datosOrdenados = data.slice().sort((a, b) => {
      if (orden.criterio === 'Carnet') {
        return orden.tipo === 'ascendente' ? a.Carnet.localeCompare(b.Carnet) : b.Carnet.localeCompare(a.Carnet);
      } else if (orden.criterio === 'Nombre') {
        const nombreA = a.Nombre.toLowerCase();
        const nombreB = b.Nombre.toLowerCase();
        return orden.tipo === 'ascendente' ? nombreA.localeCompare(nombreB) : nombreB.localeCompare(nombreA);
      } else if (orden.criterio === 'Sede') {
        return orden.tipo === 'ascendente' ? a.Sede - b.Sede : b.Sede - a.Sede;
      }
      return 0;
    });


    const handleClick = (rowData) => {
    
      // Guardar el objeto en localStorage
      localStorage.setItem("EstudianteIndividual", JSON.stringify(rowData));
      
      navigate('/modEstudiante');
    };
  
    const sedes = {
      1: "San José",
      2: "Limón",
      3: "San Carlos",
      4: "Alajuela",
      5: "Cartago",
    };

    function imprimirSede(sede) {
      return sedes[sede] || "Sede no definida";
    }

  return (
    <div>
     <div>
        <h1 className = "tituloPrincipal">Estudiantes:</h1>  
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Carnet</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Número Celular</th>
                <th>Sede</th>
                <th>Modificar</th>
            </tr>
            </thead>
            <tbody>
              {datosOrdenados.map((val, key) => {
                  return (
                      <tr key={key}>
                          <td>{val.Carnet}</td>
                          <td>{val.Nombre} {val['Segundo Nombre']} {val.Apellido} {val['Segundo Apellido']}</td>
                          <td>{val.Correo}</td>
                          <td>{val.Cel}</td>
                          <td>{imprimirSede(val.Sede)}</td>
                          {usuario.idSede === val.Sede && (
                            <td>
                              <button className="button boton btn-submit" onClick={ ()=> handleClick(val)}>Modificar estudiante</button>
                            </td>
                          )}
                          {usuario.idSede !== val.Sede && (
                            <td>
                              <button className="button boton disabled btn-submit">Modificar estudiante</button>
                            </td>
                          )}
                      </tr>
                  )
              })}
            </tbody>
        </Table>
      </div>

      <div className='columnaBotones'>
        <h3>Ordenar por:</h3>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Carnet')}>Carnet</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Nombre')}>Nombre</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Sede')}>Sede</button>
      </div>

      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>    

    </div>
  )
}
