import React, { useState } from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";

import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';

export const Actividad = () => {
  const navigate = useNavigate();
  var actividadJSON = localStorage.getItem("actividadActual");
  var info = JSON.parse(actividadJSON);
  var comentarios = [{nombre: "Adriana Alvarez", comentario:"Actividad de mierda asi al puro vuela", 
                      subComentarios:[{nombre:"Francisco Torres", comentario:"Me cago en todo"}, 
                      {nombre:"Adriana Alvarez", comentario:"Me cago en todo"}]},


                      {nombre: "Francisco Torres", comentario:"Actividad de mierda asi al puro vuela", 
                      subComentarios:[{nombre:"Adriana Alvarez", comentario:"Me cago en todo"}, 
                      {nombre:"Adriana Alvarez", comentario:"Me cago en todo"}]}];

  var usuarioJSON = localStorage.getItem("usuario");
  var usuario = JSON.parse(usuarioJSON);
  //const data = info;
  const data = {
      semana: "Semana1",
      tipoActividad: "Orientadoras",
      nombreActividad: "Mi Actividad",
      fechaActividad: "2024-05-03",
      horaActividad: "23:51",
      fechaPublicacion: "2024-05-03",
      diasPrevios: "1",
      profesSeleccionados: [
          "Profe 1"
      ],
      afiche: "haha.png",
      tipoAsistencia: "Remota",
      enlaceReunion: "http://localhost:3000/actividad",
      recordatorios: [],
      estadoActividad: "Notificada",
      fotosRealizada: [],
      observacion: ""
  }
  
  console.log(data);



  function enviarComentario(id, numero){
  
      document.getElementById(id).hidden = true;
      document.getElementById("botonComentario" + numero).hidden = false;
      document.getElementById("story" + numero).hidden = true;
      console.log(document.getElementById("story" + numero).value)

    if(document.getElementById("story" + numero).value !== ""){
      var subComentarioNuevo = {nombre:usuario["nombre"], comentario:document.getElementById("story" + numero).value}
      comentarios[numero]["subComentarios"].push(subComentarioNuevo);
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
    if(document.getElementById("comentario").value !== ""){
      var nuevoComentario = {nombre:usuario["nombre"], comentario:document.getElementById("comentario").value, subComentarios:[]};
      comentarios.push(nuevoComentario);
      document.getElementById("todosComentarios").remove();
      var div = document.createElement("div")
      div.id= "todosComentarios";

      document.getElementById("documento").appendChild(div)
      console.log(comentarios)
      cargarComentarios();
     // crearComentario(usuario["nombre"], document.getElementById("comentario").value, temp);
    }
  }

  function cargarComentarios(){
    for(var i = 0; i<comentarios.length; i++){
      var label1 = document.createElement("label");
      var div1 = document.createElement("div");

      var label2 = document.createElement("label");
      

      var div2 = document.createElement("div");
     
     
      var button1 = document.createElement("button");
      
  
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
  
      label1.textContent = comentarios[i]["nombre"]
      label2.textContent = comentarios[i]["comentario"]

      button1.classList = "botonComentario"
      button1.id = "botonComentario" + i 
      button1.setAttribute("numero", i)  
      button1.onclick = function(){
        comentarComentario(this.id, this.getAttribute("numero"),0)
      }
      button1.textContent = "Comentar"
      div1.appendChild(label1)
      div2.appendChild(label2)
      div1.appendChild(div2)
      if(comentarios[i]["subComentarios"].length > 0){

        var h5 = document.createElement("h5");
        h5.classList = "tituloSub";
        h5.textContent = "Comentarios: "
        div1.appendChild(h5)
        for(var j = 0; j<comentarios[i]["subComentarios"].length; j++){
          
          var div3 = document.createElement("div");
          var label3 = document.createElement("label");
          var div4 = document.createElement("div");
          var label4 = document.createElement("label");
          
          div3.classList = "subcomentarioCaja"
          label3.classList = "textoSub"
          label3.textContent = comentarios[i]["subComentarios"][j]["nombre"]

          label4.classList = "textoSub"
          label4.textContent = comentarios[i]["subComentarios"][j]["comentario"]
          div4.appendChild(label4)
          div3.appendChild(label3)
          div3.appendChild(div4)
          div1.appendChild(div3)
        }

      }
     


/*
      */
      textArea.hidden = true;
      button2.hidden = true;
      div1.appendChild(textArea)
      div1.appendChild(button2)
      div1.appendChild(button1)
      document.getElementById("todosComentarios").appendChild(div1)
    }
    

  }

  useEffect(()=>{
    cargarComentarios();
   
     }, [])
  return (
    <div id = "documento">
      <h1 className = "tituloPrincipal">Actividad: <label>{data.nombreActividad}</label></h1>  
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
                    <th>Hora de Actividad</th>
                    <th>Fecha de Publicación</th>
                    <th>Días Previos</th>
                    <th>Profes Seleccionados</th>
                    <th>Asistencia</th>
                    {data.tipoAsistencia === 'Remota' && (
                        <th>Enlace de Reunión</th>
                    )}
                    <th>Recordatorios</th>
                    <th>Estado de Actividad</th>
                    <th>Fotos Realizadas</th>
                    <th>Observación</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.semana}</td>
                    <td>{data.tipoActividad}</td>
                    <td>{data.fechaActividad}</td>
                    <td>{data.horaActividad}</td>
                    <td>{data.fechaPublicacion}</td>
                    <td>{data.diasPrevios}</td>
                    <td>{data.profesSeleccionados.join(', ')}</td>
                    <td>{data.tipoAsistencia}</td>
                    {data.tipoAsistencia === 'Remota' && (
                        <td>{data.enlaceReunion}</td>
                    )}
                    <td>
                        <ul>
                          {data.recordatorios ? data.recordatorios.map((recordatorio, index) => (
                              <li key={index}>{recordatorio}</li>
                          )) : null}
                        </ul>
                    </td>
                    <td>{data.estadoActividad}</td>
                    <td>
                        <ul>
                            {data.fotosRealizada.map((imagen, index) => (
                                <img key={index} src={imagen} alt={`Imagen ${index}`} style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
                            ))}
                            
                        </ul>
                    </td>
                    <td>{data.observacion}</td>
                </tr>
            </tbody>
        </Table>
        <div>
          <h2>Afiche</h2>
          <img src={data.afiche} alt="haha.png" style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px' }} />
        </div>
      </div>

      <div className='cajaTabla'>
        <h2>Escribir un Comentario</h2>
      <textarea class = "comentario" id="comentario" name="story" rows="5" cols="200" placeholder='Comentario'>

      </textarea>
        <button className="button boton btn-submit" onClick={ ()=> agregarComentario()}>Agregar comentario</button>
        {/*Comentarios*/}
      </div>


      
      <div className='cajaTabla' ><h2>Comentarios:</h2></div>
      <div id = "todosComentarios">
        
      </div>

     
</div>
  )
}
