import React from 'react'
import "../estilosGenerales.css"
import { useState } from 'react'
import "../estilosMAdmin.css"

import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
export const LandingAdmin = () => {
 
 var sesion;
  if( localStorage.getItem("conexionEsp") == 1){
    sesion = "San Jose"
  }
  if( localStorage.getItem("conexionEsp") == 2){
    sesion = "Limon"
  }
  if( localStorage.getItem("conexionEsp") == 3){
    sesion = "San Carlos"
  }
  if( localStorage.getItem("conexionEsp") == 4){
    sesion = "Alajuela"
  }
  if( localStorage.getItem("conexionEsp") == 5){
    sesion = "Cartago"
  }
console.log(sesion)


  var archivosLista = ["estudiantes.xlsx", "est2024.xlsx","est2025.xlsx"]
  var profesJSON = {profes:[], guias:[]}
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
  
    var variable= JSON.parse(localStorage.getItem("usuario"))["correo"];
    var profes = []

   
    var excelActual;
const getExcel = async () => {
  try {
   
        const response = await fetch(`https://diseno-api.onrender.com/excel/recuperar`, {
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
     //   console.log(data)
      localStorage.setItem("estudiantes", JSON.stringify(data))
        return data;
        
      
  } catch (error){
    throw new Error(error.message);
  }
}
const getProfes = async () =>{
  try {
   
   const response = await fetch(`https://diseno-api.onrender.com/profes/detalleF/${localStorage.getItem("conexionEsp")}`, {
   //   const response = await fetch(`http://18.222.222.154:5000/profes/detalleF/1`, {
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
  
   //console.log(enviar)
   
   localStorage.setItem("profes",JSON.stringify(data));
   
    return data;
    
  
} catch (error){
throw new Error(error.message);
}
}

   async function creaEstudiantes(){
      const excelActual = await getExcel();
      for(var i = 0; i < excelActual["excel"].length;i++){
        var div = document.createElement("div");
        div.classList = "textoCaja";
        div.textContent = excelActual["excel"][i]["Nombre"] + " " + excelActual["excel"][i]["Segundo Nombre"] + " " + excelActual["excel"][i]["Apellido"] + " " + excelActual["excel"][i]["Segundo Apellido"];
        document.getElementById("colEst").appendChild(div);
      }
      
      
    }

  async function creaProfes(){
    const profes = await getProfes();
   // console.log(profes["profes"])
    
      for(var i = 0; i<profes["profes"].length; i++){
       
          var div = document.createElement("div");
          var a = document.createElement("a");
          div.classList = "textoCaja";
          a.classList = "profes";
          a.id = i
          a.textContent = profes["profes"][i]["nombre"]
          a.setAttribute("index", i);
          a.onclick = function(){
            localStorage.setItem("profe", this.id);
            localStorage.setItem("desplegarGuias",0);
            navigate('/infoProfe');
          
          }
          div.appendChild(a)
          document.getElementById("colProfes").appendChild(div);
        }
       
      
    }
    async function creaProfesGuia(){
      const profes = await getProfes();
      //console.log(profes[0])
        for(var i = 0; i<profes["profesGuia"][0].length; i++){
         
         
            var div = document.createElement("div");
            var a = document.createElement("a");
            div.classList = "textoCaja";
            a.classList = "profes";
          
            a.textContent = profes["profesGuia"][0][i]["nombre"] 
            a.id = i
            a.onclick = function(){
              localStorage.setItem("profe", this.id);
              localStorage.setItem("desplegarGuias",1);
              navigate('/infoProfe');
            }
            
            div.appendChild(a)
            document.getElementById("colGuia").appendChild(div);
          
          
        }
      }
      var nombreSes;
    useEffect(()=>{
     // var fs = require('fs');
      //var files = fs.readdirSync('/public');
        creaProfesGuia();
        creaProfes();
        creaEstudiantes();
     
     // console.log(profesJSON)
      }, []);

      function cierreSesion(){
        localStorage.clear();
        navigate('/login');
      }



      async function detectarProximaActividad(){
        const objetoActividad = await pedirProximaActividad();
        const jsonString = JSON.stringify(objetoActividad[0]);
        await localStorage.setItem('actividadActual', jsonString);
        navigate('/actividad');
      }

      const pedirProximaActividad = async () => {
        try {
            
            const response = await fetch(`https://diseno-api.onrender.com/planes/actividadProxima`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
              // Si la respuesta no es exitosa, lanzar un error
              throw new Error('Error al obtener la próxima actividad');
            }
    
            // Convertir la respuesta a formato JSON
            const data = await response.json();
            return data;
            
        } catch (error){
          throw new Error('Error: ' + error.message);
        }
      }

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
        <div class=" titulo">Profesores Guia</div>
        <div class = "scroll" id = "colGuia">
      
       

        </div>
        </div>
        <div class="col columna-der columna">
        <div class=" titulo"> Lista de Profesores {sesion}</div>
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
    <button className="button boton btn-submit" type="button" onClick={()=>navigate('/planTrabajo')}>Ver Planes</button>
    </div>
  </div>
  <div class="row">
    <div class="col columna-izq botonAdm">
    <button className="button boton btn-submit" type="button" onClick={()=>navigate('/agregaEstudiante')}>Registrar Nuevo Ingreso</button>
    </div>
    <div class="col botonAdm">
    <button className="button boton btn-submit" type="button" onClick={ ()=>detectarProximaActividad() }>Ver Próxima Actividad</button>
    </div>
    <div class="col columna-der botonAdm">
    <button className="button boton btn-submit botonAdmin" type="button" onClick={()=>navigate('/subirExcel')}>Subir Excel</button>
    </div>
  </div>
</div>




<button className="button boton btn-submit" onClick={ ()=>cierreSesion() }>Salir</button>
           


    </div>
  )
}
