import React from 'react'
import "../estilosGenerales.css"

import "../estilosMAdmin.css"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const LandingAdmin = () => {
    const navigate = useNavigate();
    var variable= localStorage.getItem("usuario");
    var profesGuia = [{nombre: "Torres", id:1}, {nombre:"Adriana", id:2}]
    function creaProfesGuia(){
      for(var i = 0; i<profesGuia.length; i++){
        var div = document.createElement("div");
        var a = document.createElement("a");
        div.classList = "textoCaja";
        a.classList = "profes";
        a.id = profesGuia[i]["id"]
        a.textContent = profesGuia[i]["nombre"]
        a.onclick = function(){
          localStorage.setItem("profe", this.id);
          navigate('/infoProfe');
        }
        
        div.appendChild(a)
        document.getElementById("colGuia").appendChild(div);
      }
    }
    function creaProfes(){
      for(var i = 0; i<profesGuia.length; i++){
        var div = document.createElement("div");
        var a = document.createElement("a");
        div.classList = "textoCaja";
        a.classList = "profes";
        a.id = profesGuia[i]["id"]
        a.textContent = profesGuia[i]["nombre"]
        a.onclick = function(){
          localStorage.setItem("profe", this.id);
          navigate('/infoProfe');
        }
        
        div.appendChild(a)
        document.getElementById("colProfes").appendChild(div);
      }
    }
    useEffect(()=>{
        creaProfesGuia();
        creaProfes();
      
      }, [])
  return (
    <div>
        <h1 class = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  
    

    <div className="container ">
        <div className="row">
            <div className="col columna-izq columna">
         
            <div className=" titulo">Lista de Estudiantes</div>
            <div className = "scroll">
            <div className=" textoCaja">Fernando</div>
            <div className=" textoCaja">Roberto</div>
            <div className="textoCaja">Gabriel</div>
            <div className="textoCaja">Dylan</div>
        
          
            </div>
            </div>
        <div class="col columna-cen columna">
        <div class=" titulo">Lista de Profesores Guia</div>
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
    <button className="button boton btn-submit" type="button" >Ver Próxima Actividad</button>
    </div>
    <div class="col columna-der botonAdm">
    <button className="button boton btn-submit botonAdmin" type="button" onClick={()=>navigate('/subirExcel')}>Subir Excel</button>
    </div>
  </div>
</div>




<button className="button boton btn-submit" type="button" onClick={()=>navigate('/login')}>Volver</button>

    </div>
  )
}
