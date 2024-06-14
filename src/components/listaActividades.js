import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const ListaActividades = () => {

  const navigate = useNavigate();
  // var listaActividadesJSON = localStorage.getItem("listaActividades");
  // var data = JSON.parse(listaActividadesJSON);

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
        "estado": "Planeada",
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
        "estado": "Realizada",
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
