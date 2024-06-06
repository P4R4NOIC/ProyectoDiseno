import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

export const BuzonEstudiantil = () => {
  const navigate = useNavigate();
  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  var usuario = {
    nombreCompleto: "Estudiante"
  }
  
  const data = [
    {
      "valoresGenerales": {
        "idActividad": 1,
        "nombre": "bienvenida  primer semestre 2025",
        "semana": "Semana1",
        "direccion": "parqueo sj 06",
        "tipo": "Orientadoras",
        "modalidad": "Presencial",
        "fechaPublicacion": "2025-05-06",
        "fechaRealizacion": "2025-05-07T22:13",
        "afiche": "/url1",
        "estado": "Read",
        "comentarios": [
          {
            "idComentario": 2,
            "idProfesor": "alvaro18@itcr.ac.cr",
            "comentario": "La verdad si esta aburrida",
            "fechaEmision": "2025-01-26 00:00:00",
            "nombreCompleto": "Alvaro",
            "foto": null,
            "respuestas": [
              {
                "idComentario": 2,
                "idProfesor": "gabo@itcr.ac.cr",
                "respuesta": "Nombres",
                "fechaEmision": "2025-05-12 00:00:00",
                "nombreCompleto": "Gabriel Jimenez",
                "foto": null
              }
            ]
          },
          {
            "idComentario": 1,
            "idProfesor": "gabo@itcr.ac.cr",
            "comentario": "Esta bien aburrida",
            "fechaEmision": "2025-01-25 00:00:00",
            "nombreCompleto": "Gabriel Jimenez",
            "foto": null,
            "respuestas": [
              {
                "idComentario": 1,
                "idProfesor": "alvaro18@itcr.ac.cr",
                "respuesta": "No hable incoherencias",
                "fechaEmision": "2025-01-26 00:00:00",
                "nombreCompleto": "Alvaro",
                "foto": null
              }
            ]
          }
        ],
        "fechaRecordatorio": [
          {
            "idFecRec": 1,
            "idActividad": 1,
            "fechaR": "2025-01-20"
          },
          {
            "idFecRec": 2,
            "idActividad": 1,
            "fechaR": "2025-02-10"
          }
        ],
        "responsables": [
          {
            "correo": "alvaro18@itcr.ac.cr",
            "nombre": "Alvaro"
          },
          {
            "correo": "gaboa@itcr.ac.cr",
            "nombre": "Gabriel"
          }
        ]
      }
    },
    {
      "valoresGenerales": {
        "idActividad": 2,
        "nombre": "Semana compu",
        "semana": 5,
        "direccion": "http//probando",
        "tipo": "RecreaciÃ³n",
        "modalidad": "Virtual",
        "fechaPublicacion": "2025-04-14",
        "fechaRealizacion": "2025-05-15",
        "afiche": "/url2",
        "estado": "Cancelada",
        "comentarios": [
          {
            "idComentario": 3,
            "idProfesor": "gabo@itcr.ac.cr",
            "comentario": "No creo que se pueda hacer",
            "fechaEmision": "2025-05-10 00:00:00",
            "nombreCompleto": "Gabriel Jimenez",
            "foto": null,
            "respuestas": [
              {
                "idComentario": 3,
                "idProfesor": "alvaro18@itcr.ac.cr",
                "respuesta": "La verdad si",
                "fechaEmision": "2025-07-03 00:00:00",
                "nombreCompleto": "Alvaro",
                "foto": null
              }
            ]
          }
        ],
        "fechaRecordatorio": [
          {
            "idFecRec": 3,
            "idActividad": 2,
            "fechaR": "2025-04-30"
          }
        ],
        "responsables": [
          {
            "correo": "gabo@itcr.ac.cr",
            "nombre": "Gabriel Jimenez"
          }
        ]
      },
      "descripcionCancelacion": "No dio tiempo de  realiizar por marchas",
      "fechaCancelacion": "2025-04-18 00:00:00"
    },
    {
      "valoresGenerales": {
        "idActividad": 3,
        "nombre": "Despedida ",
        "semana": 16,
        "direccion": "parqueo sj 06",
        "tipo": "apoyo a la vida",
        "modalidad": "Presencial",
        "fechaPublicacion": "2025-06-14",
        "fechaRealizacion": "2025-06-28",
        "afiche": "/url3",
        "estado": "NotRead",
        "comentarios": [
          {
            "idComentario": 5,
            "idProfesor": "alvaro18@itcr.ac.cr",
            "comentario": "Canessa se paso con esa salsa",
            "fechaEmision": "2025-07-01 00:00:00",
            "nombreCompleto": "Alvaro",
            "foto": null,
            "respuestas": []
          },
          {
            "idComentario": 4,
            "idProfesor": "gabo@itcr.ac.cr",
            "comentario": "Esta si esta bonita",
            "fechaEmision": "2025-07-02 00:00:00",
            "nombreCompleto": "Gabriel Jimenez",
            "foto": null,
            "respuestas": []
          }
        ],
        "fechaRecordatorio": [
          {
            "idFecRec": 4,
            "idActividad": 3,
            "fechaR": "2025-06-20"
          }
        ],
        "responsables": [
          {
            "correo": "gabo@itcr.ac.cr",
            "nombre": "Gabriel Jimenez"
          }
        ]
      },
      "fotos": [
        {
          "foto": "/ULR5"
        },
        {
          "foto": "/ULR6"
        },
        {
          "fotoParticipantes": "/imagenP1"
        }
      ]
    }
  ];

  const [orden, setOrden] = useState({ criterio: null, tipo: 'ascendente' });

    const ordenarPor = (criterio) => {
      if (orden.criterio === criterio) {
        setOrden({ ...orden, tipo: orden.tipo === 'ascendente' ? 'descendente' : 'ascendente' });
      } else {
        setOrden({ criterio: criterio, tipo: 'ascendente' });
      }
    };

    const handleClick = async (rowData) => {
        const jsonString = JSON.stringify(rowData);
        console.log(rowData);
        localStorage.setItem("mensajeActual", jsonString);
        navigate('/mensajeIndividual');
      };

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
              <th>Tipo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => {
              const valoresGenerales = item.valoresGenerales;
              let estadoClase = '';
              switch (valoresGenerales.estado) {
                case 'Read':
                  estadoClase = "table-warning";
                  break;
                case 'NotRead':
                  estadoClase = 'table-light';
                  break;
                default:
                  break;
              }

              return (
                <tr key={key} className={estadoClase} onClick={() => handleClick(item)}>
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
    
      <div className='columnaBotones'>
        <h3>Ordenar por:</h3>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Carnet')}>Todos</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Nombre')}>Vistos</button>
        <button className="button boton btn-submit" onClick={ ()=> ordenarPor('Sede')}>No vistos</button>
      </div>

      <div className='divVolver'>
        <button className="button boton btn-submit" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}
