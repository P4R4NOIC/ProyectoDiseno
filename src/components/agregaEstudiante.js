import React from 'react'
import { useNavigate } from "react-router-dom";
export const AgregaEstudiante = () => {
  const navigate = useNavigate();
  var variable= JSON.parse(localStorage.getItem("usuario"))["correo"];

  function agregaEstudiante(){
    var carnet = document.getElementById("inputCarnet").value
    if(carnet == "" || !carnet.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    var nombre = document.getElementById("inputNombre").value
    if(nombre == "" || !nombre.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    var Seg = document.getElementById("inputSeg").value
    var apellido = document.getElementById("inputApellido").value
    if(apellido == "" || !apellido.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    var correoEstudianteValido = /^[a-zA-Z0-9_-]+(@estudiantec.cr)$/;
    var segAp = document.getElementById("inputSegAp").value
    var correo = document.getElementById("inputCorreo").value
    if(correo == "" || !correo.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    if(!correoEstudianteValido.test(correo)){
      alert("Error: El formato del correo no es correcto");
      return;
    }
    var cel = document.getElementById("inputCel").value
    if(cel == "" || !cel.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    var sede;
    if( localStorage.getItem("conexionEsp") == 1){
      sede = "SJ"
    }
    if( localStorage.getItem("conexionEsp") == 2){
      sede = "LI"
    }
    if( localStorage.getItem("conexionEsp") == 3){
      sede = "SC"
    }
    if( localStorage.getItem("conexionEsp") == 4){
      sede = "AL"
    }
    if( localStorage.getItem("conexionEsp") == 5){
      sede = "CA"
    }
    

    var estudianteNuevo = {Apellido:apellido, Carnet:carnet,Cel:cel, Correo:correo,Nombre:nombre, Sede:sede,  "Segundo Apellido":segAp, "Segundo Nombre":Seg  }
    console.log(estudianteNuevo)
    var estudiantes = JSON.parse(localStorage.getItem("estudiantes"))
    console.log(estudiantes);
    estudiantes["excel"].push(estudianteNuevo);
    console.log(estudiantes);

   var enviar = JSON.stringify(estudiantes)
      console.log(estudiantes)
      fetch('https://diseno-api.onrender.com/excel/subir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: enviar
    })
     // console.log(excelActual)
      
    
  }

  return (
    <div>
        <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  
    
    <div className = "contenedor">
    <div>
        <form className="form-signin"> 
        <h2 className="form-signin-heading texto-login">Agregar Estudiante</h2>
          <label class = "textoGenera">Nombre:</label>
          <input type="text" id="inputNombre" className="form-control entrada" placeholder="Nombre" required="" autoFocus=""></input>
          <label class = "textoGenera">Segundo Nombre:</label> 
          <input type="text" id="inputSeg" className="form-control entrada" placeholder="Segundo Nombre" required=""></input>
          <label class = "textoGenera">Apellido:</label>
          <input type="text" id="inputApellido" className="form-control entrada" placeholder="Apellido" required=""></input>
          <label class = "textoGenera">Segundo Apellido:</label>
          <input type="text" id="inputSegAp" className="form-control entrada" placeholder="Segundo Apellido" required=""></input>
         
          <label class = "textoGenera">Correo:</label>
          <input type="mail" id="inputCorreo" className="form-control entrada" placeholder="Correo" required=""></input>
          <label class = "textoGenera">Carnet:</label>
          <input type="number" id="inputCarnet" className="form-control entrada" placeholder="Carnet" required=""></input>
          <label class = "textoGenera">Numero de Telefono Celular:</label>
          <input type="number" id="inputCel" className="form-control entrada" placeholder="Numero de Telefono Celular" required=""></input>
         
         
       
        
          <button className="button boton btn-submit" type="button" onClick={()=> agregaEstudiante()}>
            Agregar
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
