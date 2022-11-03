import React from 'react';
import jsPDF from 'jspdf';


function ViewReport() {
    const generatePDF = () => {
        var doc = new jsPDF('p', 'pt'); 
        doc.text(20, 20, 'This is the first page title.')
        doc.setFont('helvetica','normal')
        doc.text(20, 60, 'This is the content area.')
        doc.addPage() // this code creates new page in pdf document
        doc.setFont('helvetica','normal')
        doc.text(20, 100, 'This is the second page.')
        doc.save('sample-file.pdf')
    }
  return (
    <div>ViewReport</div>
  )
}

export default ViewReport