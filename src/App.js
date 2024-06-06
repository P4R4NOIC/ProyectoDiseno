import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './components/login';
import { LandingAdmin } from './components/landingAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LandingProfesor } from './components/landingProfesor';
import { Actividad } from './components/actividad';
import { AgregaEstudiante } from './components/agregaEstudiante';
import { CreaProfe } from './components/creaProfe';
import { CronoActividad } from './components/cronoActividad';
import { DetalleEquipo } from './components/detalleEquipo';
import { InfoProfe } from './components/infoProfe';
import { ListaEstudiantes } from './components/listaEstudiantes';

import { ModEstudiante } from './components/modEstudiante';
import { PlanActividad } from './components/planActividad';
import { SubirExcel } from './components/subirExcel';
import {ModProfe} from './components/modProfe';

import { EditarActividad } from './components/editarActividad';
import { PlanTrabajo } from './components/planTrabajo';
import { CreaPlanTrabajo } from './components/creaPlanTrabajo';
import { CambiarContra } from './components/cambiarContra';

import { LandingEstudiante } from './components/landingEstudiante';
import { PerfilEstudiante } from './components/perfilEstudiante';
import { ModificarInfoEstudiante } from './components/modificarInfoEstudiante';
import { ListaActividades } from './components/listaActividades';
import { BuzonEstudiantil } from './components/buzonEstudiantil';
import { MensajeIndividual } from './components/mensajeIndividual';

function App() {
  return (
  
       <div className = "App-header">
        <Router>
          <Routes>
            <Route path="/login" element= {<Login/>} />
            <Route path="/" element= {<Login/>} />
            <Route path="/landingAdmin" element = {<LandingAdmin />} />
            <Route path="/landingProfesor" element = {<LandingProfesor/>} />
            <Route path="/actividad" element = {<Actividad/>} />
            <Route path="/agregaEstudiante" element = {<AgregaEstudiante/>} />
            <Route path="/creaProfe" element = {<CreaProfe/>} />
            <Route path="/cronoActividad" element = {<CronoActividad/>} />
            <Route path="/detalleEquipo" element = {<DetalleEquipo/>} />
            <Route path="/infoProfe" element = {<InfoProfe/>} />
            <Route path="/modProfe" element = {<ModProfe/>} />
            <Route path="/listaEstudiantes" element = {<ListaEstudiantes/>} />
            <Route path="/modEstudiante" element = {<ModEstudiante/>} />
            <Route path="/planActividad" element = {<PlanActividad/>} />
            <Route path="/subirExcel" element = {<SubirExcel/>} />
            <Route path="/editarActividad" element = {<EditarActividad/>} />
            <Route path="/planTrabajo" element = {<PlanTrabajo/>} />
            <Route path="/creaPlanTrabajo" element = {<CreaPlanTrabajo/>} />
            <Route path="/cambiarContra" element = {<CambiarContra/>} />
            <Route path="/landingEstudiante" element = {<LandingEstudiante/>} />
            <Route path="/perfilEstudiante" element = {<PerfilEstudiante/>} />
            <Route path="/modificarInfoEstudiante" element = {<ModificarInfoEstudiante/>} />
            <Route path="/listaActividades" element = {<ListaActividades/>} />
            <Route path="/buzonEstudiantil" element = {<BuzonEstudiantil/>} />
            <Route path="/mensajeIndividual" element = {<MensajeIndividual/>} />
          </Routes>
        </Router>
      
      </div>
      
      
      
  
    
    
  );
}

export default App;
