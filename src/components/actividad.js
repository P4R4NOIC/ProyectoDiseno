import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';

export const Actividad = () => {
  const navigate = useNavigate();
  var infoJSON = localStorage.getItem("actividadActual");
  var info = JSON.parse(infoJSON);
  

const getComentarios = async () => {
  try {
   
        const response = await fetch(`https://diseno-api.onrender.com/planes/comentarioXactividades/`+ JSON.parse(infoJSON)["valoresGenerales"]["idActividad"], {
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
        const data = await response.json();
      console.log(data)
      
        return data;
        
      
  } catch (error){
    throw new Error(error.message);
  }
}

  var sesionUsuario = localStorage.getItem('sesionUsuario');
  // var comentarios = [{nombre: "Adriana Alvarez", comentario:"Actividad de mierda asi al puro vuela", 
  //                     subComentarios:[{nombre:"Francisco Torres", comentario:"Me cago en todo"}, 
  //                     {nombre:"Adriana Alvarez", comentario:"Me cago en todo"}]},


  //                     {nombre: "Francisco Torres", comentario:"Actividad de mierda asi al puro vuela", 
  //                     subComentarios:[{nombre:"Adriana Alvarez", comentario:"Me cago en todo"}, 
  //                     {nombre:"Adriana Alvarez", comentario:"Me cago en todo"}]}];

  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  const data = info;
  
  console.log(data);

  const comentariosActividad = data.valoresGenerales.comentarios;

  // Mapea los comentarios al formato deseado
  const comentarios = comentariosActividad.map(comentario => ({
    nombre: comentario.nombreCompleto + " - " + comentario.fechaEmision,
    comentario: comentario.comentario,
    subComentarios: comentario.respuestas.map(respuesta => ({
      nombre: respuesta.nombreCompleto + " - " + respuesta.fechaEmision,
      comentario: respuesta.respuesta
    }))
  }));

  function enviarComentario(id, numero){
    console.log("comentarios")
    var comentarios = JSON.parse(localStorage.getItem("comentarios"))
    console.log(JSON.parse(localStorage.getItem("comentarios")))
      document.getElementById(id).hidden = true;
      document.getElementById("botonComentario" + numero).hidden = false;
      document.getElementById("story" + numero).hidden = true;
      console.log(document.getElementById("story" + numero).value)

    if(document.getElementById("story" + numero).value !== ""){
      var subComentarioNuevo = {nombre:usuario["nombre"], comentario:document.getElementById("story" + numero).value}
      var comentarioJSON = {idComentario:comentarios[numero]["idComentario"], correo:usuario["correo"], respuesta:document.getElementById("story" + numero).value}
      console.log(comentarioJSON)
      var enviar = JSON.stringify(comentarioJSON)
      
      

      fetch('https://diseno-api.onrender.com/planes/add/Respuesta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: enviar,
       
      })

     
      document.getElementById("todosComentarios").remove();
      var div = document.createElement("div")
      div.id= "todosComentarios";

      document.getElementById("documento").appendChild(div)
      console.log(comentarios)
      cargarComentarios();


    }
      
    
  }
  function comentarComentario(id, numero){
 
      document.getElementById(id).hidden = true;
      document.getElementById("botonEnviar" + numero).hidden = false;
      document.getElementById("story" + numero).hidden = false;
    
    
    
  }
  function agregarComentario() {
    console.log(usuario["nombre"])
    console.log(document.getElementById("comentario").value)
    var date = new Date();
    var año = date.getFullYear()
    var mes = date.getMonth()
    var dia = date.getDay()
    var horas = date.getHours()%12
    var minutos = date.getMinutes()
    var segundos = date.getSeconds()
    var fechaEmision = año + "-" + mes + "-" + dia + " " + horas+ ":" + minutos + ":"+ segundos
   // console.log(segundos)

    if(document.getElementById("comentario").value !== ""){
      var nuevoComentario = {nombre:usuario["nombreCompleto"], comentario:document.getElementById("comentario").value, subComentarios:[]};
      console.log(JSON.parse(infoJSON)["valoresGenerales"]["idActividad"])
      console.log(JSON.parse(infoJSON))

      var comentarioJSON = {idActividad:JSON.parse(infoJSON)["valoresGenerales"]["idActividad"], correo:usuario["correo"], comentario:document.getElementById("comentario").value}
      var enviar = JSON.stringify(comentarioJSON)
      console.log(comentarioJSON)

      fetch('https://diseno-api.onrender.com/planes/add/Comentario' , {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: enviar,
       
      })

      comentarios.push(nuevoComentario);
      document.getElementById("todosComentarios").remove();
      var div = document.createElement("div")
      div.id= "todosComentarios";

      document.getElementById("documento").appendChild(div)
      console.log(comentarios)
      cargarComentarios()
     // crearComentario(usuario["nombre"], document.getElementById("comentario").value, temp);
    }
  }

  async function cargarComentarios(){
    console.log("ENTRE")
    const comentarios = await getComentarios()
    localStorage.setItem("comentarios",JSON.stringify(comentarios))
    for(var i = 0; i<comentarios.length; i++){
      var label1 = document.createElement("label");
      var div1 = document.createElement("div");

      var label2 = document.createElement("label");
      

      var div2 = document.createElement("div");
     
     
      var button1 = document.createElement("button");
      
      var label5 = document.createElement("label")
      var textArea = document.createElement("textarea");
      var button2 = document.createElement("button");
      textArea.classList = "comentario"
      textArea.id = "story"+ i
      textArea.name = "story" 
      textArea.rows = "2"
      textArea.cols = "155"
      textArea.placeholder = "Comentario"
  
        
      button2.classList = "botonComentario"
      button2.id = "botonEnviar" + i
      button2.textContent = "Enviar" 
      button2.setAttribute("numero", i);  
      button2.onclick = function(){
          enviarComentario(this.id, this.getAttribute("numero"),0)
        }
        
     




  
      div1.classList = "cajaTabla comentarioCaja"
      div1.id = "comentarios" + i
  
      label1.textContent = comentarios[i]["nombreCompleto"] 
      label5.textContent = comentarios[i]["fechaEmision"]
      label2.textContent = comentarios[i]["comentario"]

      button1.classList = "botonComentario"
      button1.id = "botonComentario" + i 
      button1.setAttribute("numero", i)  
      button1.onclick = function(){
        comentarComentario(this.id, this.getAttribute("numero"),0)
      }
      button1.textContent = "Comentar"
      var div6 = document.createElement("div");
      div6.appendChild(label5)
      div1.appendChild(div6)
      div1.appendChild(label1)
      
      div2.appendChild(label2)
      
      div1.appendChild(div2)
      if(comentarios[i]["respuestas"].length > 0){

        var h5 = document.createElement("h5");
        h5.classList = "tituloSub";
        h5.textContent = "Comentarios: "
        div1.appendChild(h5)
        for(var j = 0; j<comentarios[i]["respuestas"].length; j++){
          
          var div3 = document.createElement("div");
          var label3 = document.createElement("label");
          var div4 = document.createElement("div");
          var label4 = document.createElement("label");
          var label7 = document.createElement("label")
          div3.classList = "subcomentarioCaja"
          label3.classList = "textoSub"
          label3.textContent = comentarios[i]["respuestas"][j]["nombreCompleto"]
          label7.classList = "textoSub"
          label7.textContent = comentarios[i]["respuestas"][j]["fechaEmision"]
          label4.classList = "textoSub"
          label4.textContent = comentarios[i]["respuestas"][j]["respuesta"]
          var div5 = document.createElement("div");
          div5.appendChild(label7)
          div4.appendChild(div5)
          div4.appendChild(label4)
          div3.appendChild(label3)
          div3.appendChild(div4)
          div1.appendChild(div3)
        }

      }
     


      textArea.hidden = true;
      button2.hidden = true;
      div1.appendChild(textArea)
      div1.appendChild(button2)
      div1.appendChild(button1)
      document.getElementById("todosComentarios").appendChild(div1)
    }
    

  }

  useEffect(()=>{
    if(sesionUsuario === "PROFESOR"){
      cargarComentarios();
    }
   
     }, [])
  
  // Obtén las fechas de inicio y fin
  const fechaInicio = new Date(data.valoresGenerales.fechaPublicacion);
  const fechaFin = new Date(data.valoresGenerales.fechaRealizacion);

  // Calcula la diferencia en milisegundos
  const diferenciaMs = fechaFin - fechaInicio;

  // Convierte la diferencia de milisegundos a días
  const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));


     return (
    <div id = "documento">
      <h1 className = "tituloPrincipal">Actividad: <label>{data.valoresGenerales.nombre}</label></h1>  
      <div className='divVolver'>
        
        {usuario.coordinador === 1 && (
          <button className="button boton btn-submit" onClick={ ()=> navigate('/editarActividad')}>Editar Actividad</button>
        )}
        {usuario.coordinador !== 1 && (
          <button className="button boton disabled btn-submit">Editar Actividad</button>
        )}
        <button className="button boton btn-submit" onClick={ ()=> navigate(-1)}>Volver</button>
      </div>
      <div className='cajaTabla'>
        <Table striped bordered hover variant='dark'>
            <thead>
                <tr>
                    <th>Semana</th>
                    <th>Tipo de Actividad</th>
                    <th>Fecha de Actividad</th>
                    <th>Fecha de Publicación</th>
                    <th>Días Previos</th>
                    <th>Profes Seleccionados</th>
                    <th>Asistencia</th>
                    {data.valoresGenerales.modalidad === 'Remota' && (
                        <th>Enlace de Reunión</th>
                    )}
                    {data.valoresGenerales.modalidad === 'Presencial' && (
                        <th>Ubicación de Reunión</th>
                    )}
                    <th>Recordatorios</th>
                    <th>Estado de Actividad</th>
                    {data.valoresGenerales.estado === 'Realizada' && (
                        <th>Fotos Realizadas</th>
                    )}
                    {data.valoresGenerales.estado === 'Realizada' && data.valoresGenerales.modalidad === 'Remota' && (
                        <th>Enlace de grabación</th>
                    )}
                    {data.valoresGenerales.estado === 'Cancelada' && (
                        <th>Observación</th>
                    )}
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.valoresGenerales.semana}</td>
                    <td>{data.valoresGenerales.tipo}</td>
                    <td>{data.valoresGenerales.fechaRealizacion}</td>
                    <td>{data.valoresGenerales.fechaPublicacion}</td>
                    <td>{diferenciaDias}</td>
                    <td>
                        <ul>
                          {data.valoresGenerales.responsables ? data.valoresGenerales.responsables.map((responsable, index) => (
                              <li key={index}>{responsable.nombre}</li>
                          )) : null}
                        </ul>
                    </td>
                    <td>{data.valoresGenerales.modalidad}</td>
                    {data.valoresGenerales.modalidad === 'Remota' && (
                        <td>{data.valoresGenerales.direccion}</td>
                    )}
                    {data.valoresGenerales.modalidad === 'Presencial' && (
                        <th>{data.valoresGenerales.direccion}</th>
                    )}
                    <td>
                        <ul>
                          {data.valoresGenerales.fechaRecordatorio ? data.valoresGenerales.fechaRecordatorio.map((recordatorio, index) => (
                              <li key={index}>{recordatorio.fechaR}</li>
                          )) : null}
                        </ul>
                    </td>
                    <td>{data.valoresGenerales.estado}</td>
                    {data.valoresGenerales.estado === 'Realizada' && (
                    <td>
                        <ul>
                          {data.fotos ? data.fotos.map((imagen, index) => (
                              <img key={index} src={imagen} alt={`Imagen ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
                          )) : null}
                        </ul>
                    </td>
                    )}
                    {data.valoresGenerales.estado === 'Realizada' && data.valoresGenerales.modalidad === 'Remota' && (
                        <td>{data.valoresGenerales.direccion}</td>
                    )}
                    {data.valoresGenerales.estado === 'Cancelada' && (
                        <td>{data.descripcionCancelacion}</td>
                    )}
                    
                </tr>
            </tbody>
        </Table>
        <div>
          <h2>Afiche</h2>
          <img src={data.valoresGenerales.afiche} alt={data.valoresGenerales.afiche} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
        </div>
      </div>

      {sesionUsuario === "PROFESOR" && (
      <div>
          <div className='cajaTabla'>
            <h2>Escribir un Comentario</h2>
          <textarea className = "comentario" id="comentario" name="story" rows="5" cols="200" placeholder='Comentario'>

          </textarea>
            <button className="button boton btn-submit" onClick={ ()=> agregarComentario()}>Agregar comentario</button>
            {/*Comentarios*/}
          </div>


          
          <div className='cajaTabla' ><h2>Comentarios:</h2></div>
          <div id = "todosComentarios">
            
          </div>
      </div>
      )}
     
</div>
  )
}
