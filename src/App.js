import {Routes,Route} from 'react-router-dom';
import Welcome from "./Components/Welcome";
import AdminLogin from './Components/AdminLogin';
import AccountantLogin from './Components/AccountantLogin';
import EmployeeLogin from './Components/EmployeeLogin';
import AccountantHeader from './Components/accountant/AccountantHeader'
import Departments from './Components/admin/Departments';
import Employees from './Components/admin//Employees'
import PayScales from './Components/admin//PayScales';
import EditDepartment from './Components/admin//EditDepartment';
import CreateDepartment from './Components/admin//CreateDepartment';
import CreatePayScale from './Components/admin//CreatePayScale';
import EditPayScale from './Components/admin//EditPayScale';
import CreateEmployee from './Components/admin//CreateEmployee';
import ManageEmployee from './Components/admin//ManageEmployee';
import AdminProfile from './Components/admin//AdminProfile';
import AdminReset from './Components/AdminReset';
import AccountantReset from './Components/AccountantReset';
import EmployeeReset from './Components/EmployeeReset';
import AccountantProfile from './Components/accountant/AccountantProfile';
import Teaching from './Components/accountant/Teaching';
import NonTeaching from './Components/accountant/NonTeaching';
import EmployeeDetails from './Components/accountant/EmployeeDetails';
import GenerateSalarySlip from './Components/accountant/GenerateSalarySlip';
import EmployeeReports from './Components/accountant/EmployeeReports';
import AllReports from './Components/accountant/AllReports';
import ViewReport from './Components/accountant/ViewReport';
import EmployeeProfile from './Components/employee/EmployeeProfile';
import SalarySlips from './Components/employee/SalarySlips';

function App() {
  return (
    <div className="app">
      <Routes>
          <Route exact path="/" element={<Welcome/>}/>

          <Route exact path="/AdminLogin" element={<AdminLogin />} />
          <Route exact path="/AdminReset" element={<AdminReset/>} />
          <Route exact path='/AdminProfile'element={<AdminProfile/>}/>
          <Route exact path='/Departments' element={<Departments/>}/>
          <Route exact path='/EditDepartment' element={<EditDepartment/>}/>
          <Route exact path='/CreateDepartment' element={<CreateDepartment/>}></Route>
          <Route exact path='/Employees' element={<Employees/>}/>
          <Route exact path='/CreateEmployee' element={<CreateEmployee/>}></Route>
          <Route exact path='/ManageEmployee' element={<ManageEmployee/>}></Route>
          <Route exact path='/PayScales' element={<PayScales/>}/>     
          <Route exact path='/CreatePayScale' element={<CreatePayScale/>}></Route>
          <Route exact path='/EditPayScale' element={<EditPayScale/>}></Route>

          <Route exact path="/AccountantLogin" element={<AccountantLogin />} />
          <Route exact path="/AccountantReset" element={<AccountantReset/>} />
          <Route exact path='/AccountantProfile'element={<AccountantProfile/>}/>
          <Route exact path='/Teaching' element={<Teaching/>}/>
          <Route exact path='/NonTeaching' element={<NonTeaching/>}/>
          <Route exact path='/EmployeeDetails' element={<EmployeeDetails/>}>
              <Route exact path='GenerateSalarySlip' element={<GenerateSalarySlip/>}></Route>
              <Route exact path='EmployeeReports' element={<EmployeeReports/>}></Route>
          </Route>
          <Route exact path='Reports' element={<AllReports/>}></Route>
          <Route exact path='ViewReport' element={<ViewReport/>}></Route>
          
          <Route exact path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route exact path="/EmployeeReset" element={<EmployeeReset/>} />
          <Route exact path="/EmployeeProfile" element={<EmployeeProfile/>}/>
          <Route exact path="SalarySlips" element={<SalarySlips/>}/>
      </Routes>
    </div>
  );
}

export default App;
