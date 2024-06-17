import React, {useState, useEffect} from 'react';
import "../estilosGenerales.css"
import { useNavigate } from "react-router-dom";

export const ModificarInfoEstudiante = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      "password": '',
      "newPassword": '',
      "confirmPassword": '',
      "Cel": '',
      "foto": ''
    });

    
    var usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var userEmail = usuario.username
    var userPassword = usuario.contrasena;
    
    
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    const [errors, setErrors] = useState({});

    const guardadoEnBase = async () => {
      if (validarForm()) {
        // Lógica para guardar en la base de datos
        console.log('Datos válidos, guardando en la base de datos...');
        console.log(formData);
        if(formData.confirmPassword !== ""){
          console.log('Cambiando contraseña...');
          //LLAMA A CAMBIO DE CONTRASEÑA
          await guardarContrasena(formData.confirmPassword);
        }
        if(formData.Cel !== ""){
          console.log('Cambiando numero de telefono...');
          //LLAMA A CAMBIO DE CEL
          usuario.Cel = formData.Cel;
          console.log(usuario)
         
          await subirDatos(usuario);
        }
        //VUELTA A ATRAS
        if(formData.confirmPassword !== "" || formData.Cel !== ""){
          alert("Sus datos han sido modificados");
          navigate(-1);
        }
      }
    };
  
    const phoneRegex = /^[0-9]{8,10}$/;
    const validarForm = () => {
      let newErrors = {};
      if(formData.password !== ""){
        if (formData.password !== userPassword) {
          newErrors.password = 'La contraseña no coincide con su contraseña previa';
        }
        if (formData.newPassword === "") {
          newErrors.newPassword = 'No se ha ingresado nueva contraseña';
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
      }else{
        if (formData.newPassword !== "" || formData.confirmPassword !== "") {
          newErrors.confirmPassword = 'No ha agregado su contraseña pasada';
        }
      }
      
      if (!phoneRegex.test(formData.Cel) && formData.Cel !== ""){
        newErrors.invalidPhone = "Numero de telefono invalido";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };
  
    async function guardarContrasena(password) {
      const variable = {
        "contrasena": password,
        "username": userEmail
      };
      console.log(variable)
      try {
        const response = await fetch ('https://diseno-api.onrender.com/excel/update/contraEstudiante', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(variable)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    async function subirDatos(formData) {
      console.log(formData)
      try {
          const response = await fetch('https://diseno-api.onrender.com/profes/update/Estudiante', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
  
          if (!response.ok) {
              throw new Error('Error al obtener los datos');
          }
      } catch (error) {
          throw new Error('Error al obtener los datos:', error.message);
      }
    }

  return (

    <div>
        <div className='cajaBasica'>
            <div>
                <h2 className='tituloProfesor'>Modificar información</h2>
                <form>
                    <div>
                        <label className='textoGenera'>Contraseña:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <div>
                        <label className='textoGenera'>Nueva Contraseña:</label>
                        <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    {errors.newPassword && <p className="error">{errors.newPassword}</p>}
                    <div>
                        <label className='textoGenera'>Confirmar contraseña:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <div>
                        <label className='textoGenera'>Número de Celular:</label>
                        <input type="text" id="numCelular" name="Cel" value={formData.Cel} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    {errors.invalidPhone && <p className="error">{errors.invalidPhone}</p>}
                    <div>
                        <label className='textoGenera'>Fotografía:</label>
                        <input type="file" id="foto" name="foto" value={formData.foto} onChange={handleChange} className="form-control entrada"/>
                    </div>
                    <button className="button boton btn-submit" type="button" onClick={guardadoEnBase}>Guardar</button>
                </form>
            
            </div>
            <div className='divVolver'>
                <button className="button boton btn-submit" onClick={ ()=>navigate(-1) }>Volver</button>
            </div>
        </div>
      
    </div>

  )
}
