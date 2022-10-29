import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Aclogin from "./Components/Aclogin";
import Adlogin from "./Components/Adlogin";
import Register from "./Components/Register";
import Reset from "./Components/Reset";
import Dashboard from "./Components/Dashboard";
import Addashboard from "./Components/Addashboard";
import Acdashboard from "./Components/Acdashboard";
import Salary from "./Components/Salary";
import Welcome from "./Components/Welcome";
import Upload from "./Components/Upload";
import Fileupload from "./Components/Fileupload";


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/aclogin" element={<Aclogin />} />
        <Route exact path="/adlogin" element={<Adlogin />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addashboard" element={<Addashboard />} />
          <Route exact path="/acdashboard" element={<Acdashboard />} />
          <Route exact path="/Salary" element={<Salary />} />
          <Route exact path="/Upload" element={<Upload />} />
          <Route exact path="/Fileupload" element={<Fileupload />} />
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
