import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

export const BuzonEstudiantil = () => {
    const navigate = useNavigate();
    var usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const user = usuario.username;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://diseno-api.onrender.com/excel/recuperarNotificaciones/${user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          // Verificar si la respuesta es exitosa
          if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error
            throw new Error('Error al obtener los datos del usuario');
          }
  
          // Convertir la respuesta a formato JSON
          const dataJSON = await response.json();
  
          // Establecer los datos en el estado
          setData(dataJSON);
          setFilteredData(dataJSON);
          console.log(dataJSON);
        } catch (error) {
          console.error(error.message);
        }
      };
  
      fetchData();
    }, []);



    const ordenarPor = (criterio) => {
      let filtered;
      switch (criterio) {
        case 'Todos':
          filtered = data;
          break;
        case 'Vistos':
          filtered = data.filter(item => item.status === 1);
          break;
        case 'NoVistos':
          filtered = data.filter(item => item.status === 0);
          break;
        default:
          filtered = data;
          break;
      }
      setFilteredData(filtered);
    };

    const handleClick = async (rowData) => {
      const jsonString = JSON.stringify(rowData.content);
      console.log(jsonString);
      localStorage.setItem("mensajeActual", jsonString);
      confirmarLectura(rowData.idMessage);
      navigate('/mensajeIndividual');
    };

    const handleDelete = async (rowData) => {
      confirmarBorrado(rowData.idMessage);
      window.location.reload();
    };
  
  async function confirmarLectura (idMessage){
    const variable = {
      "idMensaje": idMessage,
      "username": usuario.username
    };
    console.log(variable)
    try {
      const response = await fetch ('https://diseno-api.onrender.com/planes/cambiarNotificacion', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variable)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  async function confirmarBorrado (idMessage){
    const variable = {
      "idMensaje": idMessage,
      "username": usuario.username
    };
    console.log(variable)
    try {
      const response = await fetch ('https://diseno-api.onrender.com/planes/borrarNotificacion', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variable)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div>
      <div>
        <h1 className='tituloPrincipal'>Buzón estudiantil:</h1>  
        <h4 className='tituloPrincipal'>De click sobre un mensaje para leerlo</h4>
      </div>

      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Fecha de realización</th>
              <th>Estado</th>
              <th>Abrir Mensaje</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, key) => {
              const estadoClase = item.status === 0 ? 'table-warning' : 'table-light';

              return (
                <tr key={key} className={estadoClase}>
                  <td>{item.asunto}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>{item.status === 0 ? 'No leído' : 'Leído'}</td>
                  <td>
                    <button className="button boton btn-submit" onClick={() => handleClick(item)}>Abrir Mensaje</button>
                  </td>
                  {item.status === 1 && (
                    <td>
                      <button className="button boton btn-submit" onClick={() => handleDelete(item)}>Borrar</button>
                    </td>
                  )}
                  {item.status !== 1 && (
                    <td>
                      <button className="button boton disabled btn-submit">Borrar</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    
      <div className='columnaBotones'>
        <h3>Ordenar por:</h3>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Todos')}>Todos</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Vistos')}>Vistos</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('NoVistos')}>No vistos</button>
      </div>

      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}
