import React from 'react'
import { useNavigate } from "react-router-dom";
import "../estilosGenerales.css"
import "../estilosInfoProfe.css"
import { useEffect } from 'react'
export const InfoProfe = () => {
  var profes = [{nombre: "Francisco", segNombre:"Jose", primerAp:"Torres", segAp:"Rojas",sede:"SJ", id:1, 
                      correo:"torresrojas@itcr.ac.cr", telOficina: 12345678, cel: 90123456, codigo: 1, equipo:1, coordinador: 1},

                      {nombre: "Adriana", segNombre:"", primerAp:"Alvarez", segAp:"Figueroa",sede:"SJ", id:2, 
                      correo:"aalvarez@itcr.ac.cr", telOficina: 21212121, cel: 90909090, codigo: 2, equipo:0, coordinador: 0}]

  const navigate = useNavigate();
    //var idLocal = localStorage.getItem("profe");
    var idLocal = 1;
    var i = 0;
    for(var i; i<profes.length; i++){
        if(profes[i]["id"] == idLocal){
          break;
        }
    }
    var variableJSON = localStorage.getItem("usuario");
    var variable = JSON.parse(variableJSON);
   
    var nombre = profes[i]["nombre"] + " " + profes[i]["segNombre"] + " " + profes[i]["primerAp"] + " " + profes[i]["segAp"]
    var correo = profes[i]["correo"];
    var oficina = profes[i]["telOficina"];
    var cel = profes[i]["cel"];
    var enEquipo = profes[i]["equipo"];
    var codigo = ""
    var esCoordinador = profes[i]["coordinador"];
    if(enEquipo == 1){
      codigo = "Codigo: " + profes[i]["sede"] + "-" + profes[i]["codigo"];
   }
   
   function agregarEquipo(){
        document.getElementById("esta").hidden = false;
        document.getElementById("noEsta").hidden = true;
        if(localStorage.getItem("coordinador") == 0){
          document.getElementById("btnNombra").hidden = false;
        }
        document.getElementById("codigoTxt").textContent = "Codigo: " + profes[i]["codigo"];
   }

   function eliminarEquipo(){
    document.getElementById("esta").hidden = true;
    document.getElementById("noEsta").hidden = false;
    document.getElementById("btnNombra").hidden = true;
    document.getElementById("btnElimina").hidden = true;
    document.getElementById("codigoTxt").textContent = "";
    profes[i]["equipo"] = 0;
    if(esCoordinador == 1){
      profes[i]["coordinador"] = 0;
      localStorage.setItem("coordinador", 0);
    }
   }

   function eliminarCoordinador(){
    document.getElementById("btnNombra").hidden = false;
    document.getElementById("btnElimina").hidden = true;
   }

   function nombraCoordinador(){
    profes[i]["coordinador"] = 0;
    localStorage.setItem("coordinador", 1);
    document.getElementById("btnNombra").hidden = true;
    document.getElementById("btnElimina").hidden = false;
   }

    useEffect(()=>{
      
      if(localStorage.getItem("conexionEsp") == "CADMIN"){
        document.getElementById("btnNombra").hidden = false;
       
      }else{
        document.getElementById("btnNombra").hidden = true;
      }

      if(enEquipo === 1){
        document.getElementById("esta").hidden = false;
        document.getElementById("noEsta").hidden = true;
      }else{
        document.getElementById("esta").hidden = true;
        document.getElementById("noEsta").hidden = false;
      }

      if(esCoordinador == 1){
        document.getElementById("btnNombra").hidden = true;
        document.getElementById("btnElimina").hidden = false;
      }else{
        if(enEquipo == 0 || localStorage.getItem("coordinador") == 1){
          document.getElementById("btnNombra").hidden = true;
          document.getElementById("btnElimina").hidden = true;
        }else{
          if(enEquipo == 1 && localStorage.getItem("coordinador") == 0){
            document.getElementById("btnNombra").hidden = false;
            document.getElementById("btnElimina").hidden = true;
          }
          
        }
       
      }

    }, [])
    
  return (
    <div>
       <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable.nombreCompleto}</label></h1>  
       <div class="container ">
       <div class="row align-items-start">
          <div class="col-1 columna-izq">
          <img src="haha.png" class = "imagen"alt=""></img>
          </div>
         <div class="col-5 textos">
          <div class = "txt"> Nombre: {nombre}</div>
          <div class = "txt" id = "codigoTxt">{codigo}</div>
          <div class = "txt">Correo: {correo}</div>
          <div class = "txt">Telefono Oficina: {oficina}</div>
          <div class = "txt">Telefono Celular: {cel}</div>
            
        </div>

        <div class="col-5 textos">
          <div>  <button className="button boton btn-submit" type="button" onClick={()=>navigate('/modProfe')}>Modificar </button> </div>
          <div>  <button className="button boton btn-submit" type="button" onClick={()=>navigate('/creaProfe')}>Dar de baja </button></div>
          <div>   <button className="button boton btn-submit" type="button" id = "btnNombra" onClick={()=>nombraCoordinador()}>Nombrar Coordinador </button></div>
          <div>   <button className="button boton btn-submit" type="button" id = "btnElimina" onClick={()=>eliminarCoordinador()}>Eliminar Coordinador </button></div>
          <div>   <button className="button boton btn-submit" type="button" id = "noEsta"onClick={()=>agregarEquipo()}>Agregar al equipo </button></div>
          <div>   <button className="button boton btn-submit" type="button" id = "esta" onClick={()=>eliminarEquipo()}>Eliminar del equipo </button></div>
            
        </div>
        <div>  <button className="button boton btn-submit" type="button" onClick={()=>navigate(-1)}>Volver </button></div>
        
     </div>
      </div>

    </div>
  )
}
