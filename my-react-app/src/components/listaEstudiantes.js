import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";

export const ListaEstudiantes = () => {
  const navigate = useNavigate();
  const data = [
    {
      carnet: "202012345",
      correo: "juan.gomez@estudiantec.cr",
      numCelular: "1234567890",
      primerNombre: "Juan",
      segundoNombre: "",
      primerApellido: "Gómez",
      segundoApellido: "Pérez",
      sede: "Cartago",
    },
    {
      carnet: "202034567",
      correo: "maria.elena.rodriguez@estudiantec.cr",
      numCelular: "9876543210",
      primerNombre: "María",
      segundoNombre: "Elena",
      primerApellido: "Rodríguez",
      segundoApellido: "Ramírez",
      sede: "San José",
    },
    {
      carnet: "202056789",
      correo: "jose.antonio.hernandez@estudiantec.cr",
      numCelular: "5555555555",
      primerNombre: "José",
      segundoNombre: "Antonio",
      primerApellido: "Hernández",
      segundoApellido: "García",
      sede: "Cartago"
    },
  ];

    const [orden, setOrden] = useState({ criterio: null, tipo: 'ascendente' });
  
    const ordenarPor = (criterio) => {
      if (orden.criterio === criterio) {
        setOrden({ ...orden, tipo: orden.tipo === 'ascendente' ? 'descendente' : 'ascendente' });
      } else {
        setOrden({ criterio, tipo: 'ascendente' });
      }
    };
  
    const datosOrdenados = data.slice().sort((a, b) => {
      if (orden.criterio === 'carnet') {
        return orden.tipo === 'ascendente' ? a.carnet.localeCompare(b.carnet) : b.carnet.localeCompare(a.carnet);
      } else if (orden.criterio === 'nombre') {
        const nombreA = `${a.primerNombre} ${a.segundoNombre} ${a.primerApellido} ${a.segundoApellido}`;
        const nombreB = `${b.primerNombre} ${b.segundoNombre} ${b.primerApellido} ${b.segundoApellido}`;
        return orden.tipo === 'ascendente' ? nombreA.localeCompare(nombreB) : nombreB.localeCompare(nombreA);
      } else if (orden.criterio === 'sede') {
        return orden.tipo === 'ascendente' ? a.sede.localeCompare(b.sede) : b.sede.localeCompare(a.sede);
      }
      return 0;
    });
  
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
            </tr>
            </thead>
            <tbody>
              {datosOrdenados.map((val, key) => {
                  return (
                      <tr key={key}>
                          <td>{val.carnet}</td>
                          <td>{val.primerNombre + " " + val.segundoNombre + " " + val.primerApellido + " " + val.segundoApellido}</td>
                          <td>{val.correo}</td>
                          <td>{val.numCelular}</td>
                          <td>{val.sede}</td>
                      </tr>
                  )
              })}
            </tbody>
        </Table>
      </div>

      <div className='columnaBotones'>
        <h3>Ordenar por:</h3>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('carnet')}>Carnet</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('nombre')}>Nombre</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('sede')}>Sede</button>
      </div>

      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>    

    </div>
  )
}
