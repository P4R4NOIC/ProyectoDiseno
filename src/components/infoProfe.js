import React from 'react'
import { useNavigate } from "react-router-dom";
import "../estilosGenerales.css"
import "../estilosInfoProfe.css"
import { useEffect } from 'react'
export const InfoProfe = () => {
  var profes;
  var enEquipo
  if(localStorage.getItem("desplegarGuias") == 1){
    profes = JSON.parse(localStorage.getItem("profes"))["profesGuia"][0]
    console.log(profes)
    enEquipo = 1;
    //profes = JSON.parse(localStorage.getItem("profes"))["profesGuia"][0]
   // profes = JSON.parse(localStorage.getItem("guias"))
  }else{
    profes = JSON.parse(localStorage.getItem("profes"))["profes"]
    console.log(profes)
    //console.log("no guias")

    if(profes[localStorage.getItem("profe")]["guia"] == 1){
      enEquipo = 1;
    }else{
      enEquipo = 0;
    }
    
    //profes = JSON.parse(localStorage.getItem("profes"))
   // profes = JSON.parse(localStorage.getItem("profes"))
  }
 
 // console.log(profes)
  const navigate = useNavigate();
  
    //var idLocal = localStorage.getItem("profe");
    var idLocal = 1;
    var i = localStorage.getItem("profe");
  //console.log(i)
    var variableJSON = localStorage.getItem("usuario");
    var variable = JSON.parse(variableJSON);

    var nombre = profes[i]["nombre"] 
    var correo = profes[i]["correo"];
    var oficina = profes[i]["telefono"];
    var cel = profes[i]["celular"];
    
    var sede = profes[i]["idSede"]
   
    if(enEquipo == null){
      enEquipo = 0;
    }
    
    var codigo
    var esCoordinador = profes[i]["coordinador"]
    if(enEquipo == 1){
      codigo = profes[i]["codigoSede"]
   }
   
   function agregarEquipo(){

      var alguien = false;
      var coordinador = false;
      var j = 0;

    for(j; j<profes.length; j++){
      if(profes[j]["guia"] == 1){
        alguien = true;
        if(profes[j]["coordinador"] == 1){
          coordinador = true;
        }
        break;
      }
    }
      if(alguien){
        console.log("-- Guias agregar--")
        if(coordinador){
          if(localStorage.getItem("conexionEsp") == 5){
            
            var eliminar = {correo:profes[j]["correo"],idEquipo:1}
            console.log("eliminar")
            fetch('http://18.222.222.154:5000/profes/deleteIntegrante' , {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(eliminar)
            })
            console.log("eliminar coordinador")
            fetch('http://18.222.222.154:5000/profes/setCoordinador' , {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(eliminar)
            })
            console.log(eliminar)
            var hacer = {correo:profes[i]["correo"], contraseña:profes[i]["correo"], codigoSede:"SJ-01", idEquipo:1 }
            var enviar = JSON.stringify(hacer)
            console.log("agregar profe")
            
            fetch('http://18.222.222.154:5000/profes/addIntegrante' , {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: enviar
            })
          }else{
            alert("Usted no puede asignar a este usuario como guia porque ya hay un usuario de su sede que es coordinador")
            return;
          }
        }else{
          console.log("eliminar")
          var eliminar = {correo:profes[j]["correo"],idEquipo:1}
          fetch('http://18.222.222.154:5000/profes/deleteIntegrante' , {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(eliminar)
          })
          console.log(eliminar)
          console.log("agregar profe")
          var hacer = {correo:profes[i]["correo"]}
          var enviar = JSON.stringify(hacer)
          console.log("agregar profe")
          
          var hacer = {correo:profes[i]["correo"], contraseña:profes[i]["correo"], codigoSede:"SJ-01", idEquipo:1 }
            var enviar = JSON.stringify(hacer)
            console.log("agregar profe")
            
            fetch('http://18.222.222.154:5000/profes/addIntegrante' , {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: enviar
            })
        }
        
       
      }else{
        console.log("--No Guias agregar--")
      
        var eliminar = {correo:profes[i]["correo"],idEquipo:1}
        
        
        var hacer = {correo:profes[i]["correo"], contraseña:profes[i]["correo"], codigoSede:"SJ-01", idEquipo:1 }
        var enviar = JSON.stringify(hacer)
        console.log(hacer)
        console.log("agregar profe")
        
        fetch('http://18.222.222.154:5000/profes/addIntegrante' , {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: enviar
        })
      }

        document.getElementById("esta").hidden = false;
        document.getElementById("noEsta").hidden = true;
        
        document.getElementById("codigoTxt").textContent = "Codigo: " + profes[i]["codigo"];
   }

   function eliminarEquipo(){

    if(profes[i]["coordinador"] == 1){
      console.log("--eliminar coordinador--")
      if(localStorage.getItem("conexionEsp") == 5){
       
        var eliminar = {correo:profes[i]["correo"],idEquipo:1}
            console.log("eliminar")
            fetch('http://18.222.222.154:5000/profes/deleteIntegrante' , {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json'
              },
              body: eliminar
            })
            console.log("eliminar coordinador")
            fetch('http://18.222.222.154:5000/profes/setCoordinador' , {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json'
              },
              body: eliminar
            })
        console.log("eliminar coordinador")
        
        console.log(eliminar)
        
      }else{
        alert("Usted no puede eliminar a este usuario como guia porque no tiene los permisos para eliminar a un coordinador")
        return;
      }
    }else{
      console.log("--eliminar no coordinador--")
    
      var eliminar = {correo:profes[i]["correo"],idEquipo:1}
      
            console.log("eliminar")
            fetch('http://18.222.222.154:5000/profes/deleteIntegrante' , {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(eliminar)
            })
      console.log(eliminar)
    }
    


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


   
   function darDeBaja(){
      var matar = profes[i]["correo"]
      console.log("dar de baja")
      fetch('http://18.222.222.154:5000/profes/deleteProfesor/' + matar, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
      navigate('/landingAdmin')
   }

   function eliminarCoordinador(){
    console.log("--eliminar coordinador--")
    var eliminar = {correo:profes[i]["correo"],idEquipo:1}
    var enviar = JSON.stringify(eliminar)
    fetch('http://18.222.222.154:5000/profes/setCoordinador' , {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: enviar
    })
  
    document.getElementById("btnNombra").hidden = false;
    document.getElementById("btnElimina").hidden = true;
   }

   function nombraCoordinador(){
    var j = 0;
    var alguien = false;
   for(j; j<profes.length; j++){
      if(profes[j]["coordinador"] == 1){
        alguien = true;
        break;
      }
   }
   if(alguien){
    console.log("eliminar")
    var eliminar = {correo:profes[j]["correo"],equipo:1}
    console.log(eliminar)
    console.log("--eliminar coordinador--")
    
    var quitar = JSON.stringify(eliminar)
    fetch('http://18.222.222.154:5000/profes/setCoordinador' , {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: quitar
    })
    console.log("--eliminar coordinador--")
    var agregar = {correo:profes[i]["correo"],idEquipo:1}
    var enviar = JSON.stringify(agregar)
    fetch('http://18.222.222.154:5000/profes/setCoordinador' , {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: enviar
    })
  }else{
    console.log("agregar profe")
    var agregar = {correo:profes[i]["correo"],idEquipo:1}
    var enviar = JSON.stringify(agregar)
    fetch('http://18.222.222.154:5000/profes/setCoordinador' , {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: enviar
    })
  }
    localStorage.setItem("coordinador", 1);
    document.getElementById("btnNombra").hidden = true;
    document.getElementById("btnElimina").hidden = false;
   }

    useEffect(()=>{
      
      if(localStorage.getItem("conexionEsp") != sede){
      //  console.log("sirve")
        document.getElementById("esta").hidden = true;
        document.getElementById("noEsta").hidden = true;
        document.getElementById("modificar").hidden = true;
        document.getElementById("darBaja").hidden = true;
        document.getElementById("btnNombra").hidden = true;
        document.getElementById("btnElimina").hidden = true;
        console.log(localStorage.getItem("conexionEsp") )





        if(localStorage.getItem("conexionEsp") == 5){
          document.getElementById("btnNombra").hidden = false;
          
          if(esCoordinador == 1){
            document.getElementById("btnNombra").hidden = true;
            document.getElementById("btnElimina").hidden = false;
          }
        }else{
          document.getElementById("btnNombra").hidden = true;
          document.getElementById("btnElimina").hidden = true;
        }
        
      }else{

        if(localStorage.getItem("desplegarGuias") == 0){

          document.getElementById("modificar").hidden = false;
          document.getElementById("darBaja").hidden = false;
          document.getElementById("btnNombra").hidden = true;
          document.getElementById("btnElimina").hidden = true;

          if(enEquipo == 1){
            document.getElementById("esta").hidden = false;
            document.getElementById("noEsta").hidden = true;
          }else{
            document.getElementById("esta").hidden = true;
            document.getElementById("noEsta").hidden = false;
          }
          


        
        }else{
          console.log("sirve")
          document.getElementById("modificar").hidden = false;
          document.getElementById("darBaja").hidden = false;

          if(localStorage.getItem("conexionEsp") == 5){
            if(esCoordinador == 1){
              document.getElementById("btnNombra").hidden = true;
               document.getElementById("btnElimina").hidden = false;
            }else{
              document.getElementById("btnNombra").hidden = false;
              document.getElementById("btnElimina").hidden = true;
            }
            
          }else{
            document.getElementById("btnNombra").hidden = true;
            document.getElementById("btnElimina").hidden = true;
          }

          document.getElementById("esta").hidden = false;
          document.getElementById("noEsta").hidden = true;



        }
        







      
       
      }

    }, [])
    
  return (
    <div>
       <h1 className = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable.nombreCompleto}</label></h1>  
       <div className="container ">
       <div className="row align-items-start">
          <div className="col-1 columna-izq">
          <img src="haha.png" className = "imagen"alt=""></img>
          </div>
         <div className="col-5 textos">
          <div className = "txt"> Nombre: {nombre}</div>
          <div className = "txt" id = "codigoTxt">{codigo}</div>
          <div className = "txt">Correo: {correo}</div>
          <div className = "txt">Telefono Oficina: {oficina}</div>
          <div className = "txt">Telefono Celular: {cel}</div>
            
        </div>

        <div className="col-5 textos">
          <div>  <button className="button boton btn-submit" type="button" id = "modificar"onClick={()=>navigate('/modProfe')}>Modificar </button> </div>
          <div>  <button className="button boton btn-submit" type="button" id = "darBaja"onClick={()=>darDeBaja()}>Dar de baja </button></div>
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
