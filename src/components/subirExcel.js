import React, {useRef} from 'react'
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { useEffect } from 'react';

export const SubirExcel = () => {
  const navigate = useNavigate();
  var variable= localStorage.getItem("usuario");
  const inputFileRef = useRef(null);

  var excelActual = {nombre:"",excel:""};


  
  // function establecerExcelActual(){
  //   var datos;
  //   var entrada = document.getElementById("file").value
  //     fetch(entrada)
  //     .then((res) => res.arrayBuffer())
  //     .then((ab) => {
  //       const workbook = XLSX.read(ab, { type: "array" });
        
  //       const sheetName = workbook.SheetNames[0]
  //       const sheet = workbook.Sheets[sheetName]
  //       datos = XLSX.utils.sheet_to_json(sheet);
        
  //       console.log(datos);
  //     });

      
  // }


  const manejarCargaArchivo = () => {
    const file = inputFileRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {header:1});
      

      const keys = jsonData[0];

      // Inicializar un arreglo para guardar los objetos JSON
      const jsonArray = [];

      // Recorrer los sub-arreglos y crear un objeto JSON para cada uno
      for (let i = 1; i < jsonData.length; i++) {
          const subArreglo = jsonData[i];
          const objetoJSON = {};

          for (let j = 0; j < keys.length; j++) {
              const clave = keys[j];
              const valor = subArreglo[j];
              objetoJSON[clave] = valor;
          }
        
          jsonArray.push(objetoJSON);
      }
      excelActual["excel"] = jsonArray
     
      excelActual["nombre"] = file["name"]
      var enviar = JSON.stringify(excelActual)
      console.log(excelActual)
      fetch('http://18.222.222.154:5000/excel/subir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: enviar
    })
     // console.log(excelActual)
      
    };
    reader.readAsArrayBuffer(file);

   

  }

  
  function crearExcel(){
  
    
    const worksheet = XLSX.utils.json_to_sheet(excelActual)

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "Employee Lists.xlsx", { compression: true });

  }
  
  const handleClickButton = () => {
    inputFileRef.current.click();
  }


  return (
    <div>
       <h1 className = "tituloPrincipal">Asistente Administrativo: <label id="nombreProfesor">{variable}</label></h1>  
     
      <div className = "contenedor">
    <div>
    <div className = "excelInput">
       

    </div>

</div>
      <label className = "textoGenera">Seleccione el Archivo de excel que desee subir</label>
      <input ref={inputFileRef} type="file" id="file" name="file" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' className='form-control entrada'></input>

     <button className="button boton btn-submit" type="button" id = "exportExcel" onClick={manejarCargaArchivo}>Subir </button>
      <button className="button boton btn-submit" type="button" onClick={()=>navigate('/landingAdmin')}>Volver </button>
      </div>

    </div>
  )
}
