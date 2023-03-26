/// <reference path="../../../../pdfjs.d.ts" />

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const TableWithPagination = () => {
  // Define your table data here
  const header = [['name', 'age', 'city']];
  const data = [
    { name: 'John Doe', age: 25, city: 'New York' },
    { name: 'Jane Smith', age: 32, city: 'Los Angeles' },
  ];

  // Define a function to download the PDF file
  const handleDownloadPDF = () => {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = 'Table with Pagination';
    const body = data.map(({ name, age, city }: any) => [name, age, city]);
    debugger
    doc.text(title, marginLeft, 40);
    doc.autoTable({
      head: header,
      body,
      margin: { top: 50 },
      headStyles: {
        fillColor: [230,	244,	249],
        textColor: [20,	20,	42],
        fontStyle: 'normal',
        fontSize: 16,
      },
      styles: {
        fillColor: false,
      },
      alternateRowStyles: {},
      didParseCell: (item: any) => {
        if (item.row.section === "head") {
          item.cell.styles.fillColor = [230,	244,	249];
        } else {
          item.cell.styles.fillColor = false;
        }
      },
    });

    doc.save('table.pdf');
  };


  return (
    <div>
      <table id="my-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      </div>
      <div>
        <button onClick={handleDownloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default TableWithPagination;
