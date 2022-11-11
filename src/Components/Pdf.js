import React, {PureComponent} from "react";
import jsPDF from "jspdf";
export default class pdfGenerator extends PureComponent{
    constructor(props){
        super(props)

        this.state={

        }
    }
    

    jsPdfGenerator=() =>{
        var doc=new jsPDF('p','pt');

        
            
        doc.text(20, 20, 'Date:')

            doc.addFont('helvetica', 'normal')
             
        doc.text(20, 40, 'Month:')
            doc.text(20, 60, 'Emp ID.')
            doc.text(20, 80, 'Basic pay.')
            doc.text(20, 120, 'Total salary.')      
            
    
        doc.save("salaryslip.pdf");
    }
    
    render(){
        return(<div>
            
            Salary Slip


            <br></br>

            
   

            <button onClick={this.jsPdfGenerator}>GenerateSalarySlip</button>
        </div>)
    }
}