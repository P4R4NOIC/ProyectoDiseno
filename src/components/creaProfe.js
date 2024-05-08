import React from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";
export const CreaProfe = () => {
  
  var variable= JSON.parse(localStorage.getItem("usuario"))["correo"];
  const navigate = useNavigate();
  var profes = JSON.parse(localStorage.getItem("profes"))
  console.log(profes)


  function crearProfe(){
    var nombre = document.getElementById("inputNombre").value
    if(nombre == "" || !nombre.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    var SegundoNombre = document.getElementById("inputseg").value
 
    var apellido = document.getElementById("inputapellido").value
    if(apellido == "" || !apellido.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    var segapellido = document.getElementById("inputsegapellido").value
    var oficina = document.getElementById("inputOFI").value
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
   
    var correo = document.getElementById("inputCorreo").value
    if(correo == "" || !correo.trim().length){
     
      alert("Error: hay espacios importantes vacios");
      return;
    }
    if(!correoProfesorValido.test(correo)){
      alert("Error: El formato del correo no es correcto");
      return;
    }
    var foto = null
    var guia = null;
    var coordinador = null;
    var completo = nombre + " " + SegundoNombre + " " + apellido + " " + segapellido
    var nuevoProfe = {activo:activo,celular:celular, coordinador:coordinador, correo:correo, foto:foto,guia:guia,idSede:sede, nombre:completo, telefono:oficina}
    console.log(nuevoProfe)

    var enviar = JSON.stringify(nuevoProfe)
    fetch('http://18.222.222.154:5000/profes/add/profesor' , {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: enviar
    })



  }

  return (
    <div>
    <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  

   <div className = "contenedor">
        <div>
            <form className="form-signin"> 
              <h2 className="form-signin-heading texto-login">Agregar Profesor</h2>
              <label class = "textoGenera">Nombre:</label>
              <input type="text" id="inputNombre" className="form-control entrada" placeholder="Nombre" required="" autoFocus=""></input>
              <label class = "textoGenera">Segundo Nombre:</label> 
              <input type="text" id="inputseg" className="form-control entrada" placeholder="Segundo Nombre" required=""></input>
              <label class = "textoGenera">Apellido:</label>
              <input type="text" id="inputapellido" className="form-control entrada" placeholder="Apellido" required=""></input>
              <label class = "textoGenera">Segundo Apellido:</label>
              <input type="text" id="inputsegapellido" className="form-control entrada" placeholder="Segundo Apellido" required=""></input>
              <label class = "textoGenera">Correo:</label>
              <input type="mail" id="inputCorreo" className="form-control entrada" placeholder="Correo" required=""></input>
          
              
              <label class = "textoGenera">Numero de Telefono Oficina:</label>
              <input type="number" id="inputOFI" className="form-control entrada" placeholder="Numero de Telefono Oficina" required=""></input>
              <label class = "textoGenera">Numero de Telefono Celular:</label>
              <input type="number" id="inputCel" className="form-control entrada" placeholder="Numero de Telefono Celular" required=""></input>
              <label class = "textoGenera">Foto:</label>
              <input type="file" id="foto" name="foto" accept = "image/*"className='form-control entrada'></input>
            
           
            
              <button className="button boton btn-submit" type="button" onClick={() => crearProfe()}>
                Agregar
              </button>
              <button className="button boton btn-submit" type="button" onClick={()=>navigate(-1)}>
                Volver
              </button>

            </form>

        </div>

    </div>
    </div>
  )
}
