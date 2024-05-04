import React from 'react'
import "../estilosGenerales.css"
import { useState } from 'react'
import "../estilosMAdmin.css"

import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
export const LandingAdmin = () => {

  var archivosLista = ["estudiantes.xlsx", "est2024.xlsx","est2025.xlsx"]

  const [archivoSeleccionado, setArchivoSeleccionado] = useState("nulo");
  const opcionesArchivos = [];
  for (var i = 0; i < archivosLista.length; i++) {
    opcionesArchivos.push(<option key={i} value={archivosLista[i]}>{archivosLista[i]}</option>);
  }

  const cambiarArchivo = (event) => {
    setArchivoSeleccionado(event.target.value)
   
  }

    const navigate = useNavigate();
    localStorage.setItem("coordinador", 0);
    var variable= localStorage.getItem("usuario");
    var profes = [{nombre: "Francisco", segNombre:"Jose", primerAp:"Torres", segAp:"Rojas", sede:"SJ", id:1, 
                      correo:"torresrojas@itcr.ac.cr", telOficina: 12345678, cel: 90123456, codigo: 123, equipo:1, coordinador: 1}, 
                      {nombre: "Adriana", segNombre:"", primerAp:"Alvarez", segAp:"Figueroa", sede:"SJ", id:2, 
                      correo:"aalvarez@itcr.ac.cr", telOficina: 21212121, cel: 90909090, codigo: 456, equipo:0, coordinador: 0}]
    function creaProfesGuia(){
      for(var i = 0; i<profes.length; i++){
        if(profes[i]["coordinador"] === 1){
          localStorage.setItem("coordinador", 1);
        }
        if(profes[i]["equipo"] === 1){
          var div = document.createElement("div");
          var a = document.createElement("a");
          div.classList = "textoCaja";
          a.classList = "profes";
          a.id = profes[i]["id"]
          a.textContent = profes[i]["nombre"] + " " + profes[i]["segNombre"] + " " + profes[i]["primerAp"] + " " + profes[i]["segAp"]
          a.onclick = function(){
            localStorage.setItem("profe", this.id);
            navigate('/infoProfe');
          }
          
          div.appendChild(a)
          document.getElementById("colGuia").appendChild(div);
        }
        
      }
    }
    var excelActual = [{
      "Carnet": 2021086368,
      "Nombre": "Fernando",
      "Segundo Nombre": "Jose",
      "Apellido": "Gross",
      "Segundo Apellido": "Hernandez",
      "Correo": "fergross0602@estudiantec.cr",
      "Cel": 86253351,
      "Sede": "San Jose"
  },{
    "Carnet": 1111111111,
    "Nombre": "Roberto",
    "Segundo Nombre": "Daniel",
    "Apellido": "Vindas",
    "Segundo Apellido": "Hernandez",
    "Correo": "rvindas@estudiantec.cr",
    "Cel": 88888888,
    "Sede": "San Jose"
}, {
  "Carnet": 2222222222,
  "Nombre": "Gabriel",
  "Segundo Nombre": "De Jesus",
  "Apellido": "Jimenez",
  "Segundo Apellido": "Ocampo",
  "Correo": "gabops@estudiantec.cr",
  "Cel": 99999999,
  "Sede": "San Jose"
}, {
  "Carnet": 3333333333,
  "Nombre": "Dylan",
  "Segundo Nombre": "Andrey",
  "Apellido": "Mora",
  "Segundo Apellido": "Corrales",
  "Correo": "dlmora@estudiantec.cr",
  "Cel": 22222222,
  "Sede": "San Jose"
}]
    
    function creaEstudiantes(){
      for(var i = 0; i < excelActual.length;i++){
        var div = document.createElement("div");
        div.classList = "textoCaja";
        div.textContent = excelActual[i]["Nombre"] + " " + excelActual[i]["Segundo Nombre"] + " " + excelActual[i]["Apellido"] + " " + excelActual[i]["Segundo Apellido"];
        document.getElementById("colEst").appendChild(div);
      }
      
      
    }


    function creaProfes(){
      for(var i = 0; i<profes.length; i++){
        if(profes[i]["equipo"] === 0){
          var div = document.createElement("div");
          var a = document.createElement("a");
          div.classList = "textoCaja";
          a.classList = "profes";
          a.id = profes[i]["id"]
          a.textContent = profes[i]["nombre"] + " " + profes[i]["segNombre"] + " " + profes[i]["primerAp"] + " " + profes[i]["segAp"]
          a.onclick = function(){
            localStorage.setItem("profe", this.id);
            navigate('/infoProfe');
          }
          
          div.appendChild(a)
          document.getElementById("colProfes").appendChild(div);
        }
       
      }
    }
    useEffect(()=>{
     // var fs = require('fs');
      //var files = fs.readdirSync('/public');
        creaProfesGuia();
        creaProfes();
        creaEstudiantes();
    
      }, [])
  return (
    <div>
        <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  
    

    <div className="container ">
        <div className="row">
            <div className="col columna-izq columna">
         
            <div className=" titulo">Lista de Estudiantes</div>
            <div className = "scroll" id = "colEst">

        
          
            </div>
            </div>
        <div class="col columna-cen columna">
        <div class=" titulo">Profesor Guia *Sede*</div>
        <div class = "scroll" id = "colGuia">
      
       

        </div>
        </div>
        <div class="col columna-der columna">
        <div class=" titulo"> Lista de Profesores</div>
        <div class = "scroll" id = "colProfes">
        
        </div>
        </div>
    </div>
</div>

<div class="container text-center">
  <div class="row">
    <div class="col columna-izq botonAdm">
    <button className="button boton btn-submit" type="button" onClick={()=>navigate('/creaProfe')}>Registrar Nuevo Profesor </button>
    </div>
    <div class="col botonAdm">
    <button className="button boton btn-submit" type="button" onClick={()=>navigate('/detalleEquipo')}>Ver Detalle Equipo</button>
    </div>
    <div class="col columna-der botonAdm">
    <button className="button boton btn-submit" type="button" onClick={()=>navigate('/cronoActividad')}>Ver Cronograma</button>
    </div>
  </div>
  <div class="row">
    <div class="col columna-izq botonAdm">
    <button className="button boton btn-submit" type="button" onClick={()=>navigate('/agregaEstudiante')}>Registrar Nuevo Ingreso</button>
    </div>
    <div class="col botonAdm">
    <button className="button boton btn-submit" type="button">Ver Próxima Actividad</button>
    </div>
    <div class="col columna-der botonAdm">
    <button className="button boton btn-submit botonAdmin" type="button" onClick={()=>navigate('/subirExcel')}>Subir Excel</button>
    </div>
  </div>
</div>




<button className="button boton btn-submit" type="button" onClick={()=>navigate('/login')}>Volver</button>
            <div class = "archivos">
                <select className="form-control entrada" value={archivoSeleccionado} onChange={cambiarArchivo}>
                
                  <option value={"nulo"}>Seleccionar Archivo</option>
                  {opcionesArchivos}
                </select>
              </div>


    </div>
  )
}
