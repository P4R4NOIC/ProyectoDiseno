import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
export const ModProfe = () => {
  var variable= JSON.parse(localStorage.getItem("usuario"))["correo"];
    const navigate = useNavigate();
    var profes;
    if(localStorage.getItem("desplegarGuias") == 1){
      profes = JSON.parse(localStorage.getItem("profes"))["profesGuia"][0]
      console.log(profes)
     
      //profes = JSON.parse(localStorage.getItem("profes"))["profesGuia"][0]
     // profes = JSON.parse(localStorage.getItem("guias"))
    }else{
      profes = JSON.parse(localStorage.getItem("profes"))["profes"]
      console.log(profes)
      //console.log("no guias")
  
      
      
      //profes = JSON.parse(localStorage.getItem("profes"))
     // profes = JSON.parse(localStorage.getItem("profes"))
    }
    var i = localStorage.getItem("profe");
    var profe = profes[i]
    console.log(profe)
    
    function crearProfe(){
      var nombre = document.getElementById("inputNombre").value
      
      if(nombre == "" || !nombre.trim().length){
       
        alert("Error: hay espacios importantes vacios");
        return;
      }
      
      var oficina = document.getElementById("inputOfi").value
      if(oficina == "" || !oficina.trim().length){
       
        alert("Error: hay espacios importantes vacios");
        return;
      }
      var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
      var activo = 1;
      var celular = document.getElementById("inputCel").value
      if(celular == "" || !celular.trim().length){
       
        alert("Error: hay espacios importantes vacios");
        return;
      }
      var sede = localStorage.getItem("conexionEsp")
     
      var correo = profe["correo"]
      
      var foto = profe["foto"]
      var guia = profe["guia"];
      var coordinador = profe["coordinador"];
      var completo = nombre 
      var nuevoProfe = {activo:activo,celular:celular, coordinador:coordinador, correo:correo, foto:foto,guia:guia,idSede:sede, nombre:completo, telefono:oficina}
      console.log(nuevoProfe)
      var enviar = JSON.stringify(nuevoProfe)
      fetch('http://18.222.222.154:5000/profes/update/' , {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: enviar
    })
    }
    function cargaPlaceHolder(){
      document.getElementById("inputNombre").placeholder = profe["nombre"]
 
      document.getElementById("inputOfi").placeholder = profe["telefono"]
      document.getElementById("inputCel").placeholder = profe["celular"]
    }
    useEffect(()=>{
      cargaPlaceHolder();
       }, []);
  return (
    <div>
        <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  

<div className = "contenedor">
     <div>
         <form className="form-signin"> 
         <h2 className="form-signin-heading texto-login">Modificar Profesor</h2>
           <label class = "textoGenera">Nombre:</label>
           <input type="text" id="inputNombre" className="form-control entrada" placeholder="Nombre" required="" autoFocus=""></input>
          
       
           <label class = "textoGenera">Numero de Telefono Oficina:</label>
           <input type="number" id="inputOfi" className="form-control entrada" placeholder="Numero de Telefono Oficina" required=""></input>
           <label class = "textoGenera">Numero de Telefono Celular:</label>
           <input type="number" id="inputCel" className="form-control entrada" placeholder="Numero de Telefono Celular" required=""></input>
           <label class = "textoGenera">Foto:</label>
           <input type="file" id="foto" name="foto" accept = "image/*"className='form-control entrada'></input>
         
        
         
           <button className="button boton btn-submit" type="button" onClick={() => crearProfe()} >
             Guardar
           </button>
           <button className="button boton btn-submit" type="button" onClick={()=>navigate('/landingAdmin')}>
             Volver
           </button>

         </form>

     </div>

 </div>
    </div>
  )
}
