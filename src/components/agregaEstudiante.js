import React from 'react'
import { useNavigate } from "react-router-dom";
export const AgregaEstudiante = () => {
  const navigate = useNavigate();
  var variable= localStorage.getItem("usuario");

  function agregaEstudiante(){
    var carnet = document.getElementById("inputCarnet").value
    var nombre = document.getElementById("inputNombre").value
    var Seg = document.getElementById("inputSeg").value
    var apellido = document.getElementById("inputApellido").value
    var segAp = document.getElementById("inputSegAp").value
    var correo = document.getElementById("inputCorreo").value
    var cel = document.getElementById("inputCel").value
    var sede = document.getElementById("sedes").options[document.getElementById("sedes").selectedIndex].text

    var estudianteNuevo = {Carnet:carnet, Nombre:nombre, "Segundo Nombre":Seg, Apellido:apellido, "Segundo Apellido":segAp, Correo:correo, Cel:cel, Sede:sede}
    console.log(estudianteNuevo)
    var estudiantes = JSON.parse(localStorage.getItem("estudiantes"))
    console.log(JSON.parse(localStorage.getItem("estudiantes")));
    estudiantes.push(estudianteNuevo);
    console.log(estudiantes);

    var enviar = JSON.stringify(estudiantes)
      console.log(estudiantes)
      fetch('http://18.222.222.154:5000/excel/subir', {
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
          <label className = "textoGenera">Sede:</label> 
                <select className="form-control entrada" name='semestre' id = "sedes">
                    <option value={1}>SJ</option>
                    <option value={1}>SJ</option>
                    <option value={2}>LI</option>
                    <option value={3}>SC</option>
                    <option value={4}>AL</option>
                    <option value={5}>CA</option>
                </select>
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
