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


function App() {
  return (
  
       <div className = "App-header">
        <Router>
          <Routes>
            <Route path="/login" element= {<Login/>} />
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
          </Routes>
        </Router>
      
      </div>
      
      
      
  
    
    
  );
}

export default App;
