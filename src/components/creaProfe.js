import React from 'react'
import "../estilosGenerales.css";
import { useNavigate } from "react-router-dom";
export const CreaProfe = () => {
  
  var variable= localStorage.getItem("usuario");
  const navigate = useNavigate();
  var profes = JSON.parse(localStorage.getItem("profes"))
  console.log(profes)


  function crearProfe(){
    var nombre = document.getElementById("inputNombre").value
    var SegundoNombre = document.getElementById("inputseg").value
    var apellido = document.getElementById("inputapellido").value
    var segapellido = document.getElementById("inputsegapellido").value
    var oficina = document.getElementById("inputOFI").value
    var activo = 1;
    var celular = document.getElementById("inputCel").value
    var sede = document.getElementById("sedes").value
    console.log(document.getElementById("sedes").options[document.getElementById("sedes").selectedIndex].text)
    var correo = document.getElementById("inputCorreo").value
    var foto = null
    var guia = null;
    var coordinador = null;
    var completo = nombre + " " + SegundoNombre + " " + apellido + " " + segapellido
    var nuevoProfe = {activo:activo,celular:celular, coordinador:coordinador, correo:correo, foto:foto,guia:guia,idSede:sede, nombre:completo, telefono:oficina}
    console.log(nuevoProfe)
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
          
              <label className = "textoGenera">Sede:</label> 
                <select className="form-control entrada" name='semestre' id = "sedes">
                    <option value={1}>Seleccionar Sede</option>
                    <option value={1}>SJ</option>
                    <option value={2}>LI</option>
                    <option value={3}>SC</option>
                    <option value={4}>AL</option>
                    <option value={5}>CA</option>
                </select>
        
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
