import './styles/App.css';
import './styles/styleComponent.css'
import SignIn from './components/auth/SignIn';
//import Accueil from './components/dashboard/Accueil';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddEtudiant from './components/dashboard/AddEtudiant';
import Dashboard from './components/dashboard/Dashboard';
import EditEtudiant from './components/dashboard/EditEtudiant';
function App() {
  return (
    <div className="App">
      {/*<SignIn />*/}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addEtudiant" element={<AddEtudiant />} />
          <Route exact path="/edit/:idEtu" element={<EditEtudiant/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
