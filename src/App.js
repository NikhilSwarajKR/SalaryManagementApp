import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeLogin from "./Components/EmployeeLogin";
import Accountantlogin from "./Components/Accountantlogin";
import Adminlogin from "./Components/Adminlogin";
import EmployeeRegister from "./Components/EmployeeRegister";
import Adminregister from "./Components/Adminregister";
import Accountantregister from "./Components/Accountantregister";
import EmployeeReset from "./Components/EmployeeReset";
import Adminreset from "./Components/Adminreset";
import Accountantreset from "./Components/Accountantreset";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import Admindashboard from "./Components/Admindashboard";
import Accountantdashboard from "./Components/Accountantdashboard";
import Salary from "./Components/Salary";
import Welcome from "./Components/Welcome";
import Upload from "./Components/Upload";
import Pdf from "./Components/Pdf";
import Head from "./Components/Head";
import GenerateSalarySlip from "./Components/GenerateSalarySlip";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/accountantlogin" element={<Accountantlogin />} />
        <Route exact path="/adminlogin" element={<Adminlogin />} />
          <Route exact path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route exact path="/EmployeeRegister" element={<EmployeeRegister />} />
          <Route exact path="/Adminregister" element={<Adminregister />} />
          <Route exact path="/Accountantregister" element={<Accountantregister />} />
          <Route exact path="/EmployeeReset" element={<EmployeeReset />} />
          <Route exact path="/Accountantreset" element={<Accountantreset />} />
          <Route exact path="/Adminreset" element={<Adminreset />} />
          <Route exact path="/Head" element={<Head />} />
          <Route exact path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route exact path="/admindashboard" element={<Admindashboard />} />
          <Route exact path="/accountantdashboard" element={<Accountantdashboard />} />
          <Route exact path="/Salary" element={<Salary />} />
          <Route exact path="/Upload" element={<Upload />} />
          <Route exact path="/Pdf" element={<Pdf />} />
          <Route exact path="/GenerateSalarySlip" element={<GenerateSalarySlip />} />
         
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
