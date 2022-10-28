import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


export default function GenerateSalarySlip() {
    const location = useLocation();
    const empID=location.state.empID;
    return (
        <div>{empID}</div>
    )
}
