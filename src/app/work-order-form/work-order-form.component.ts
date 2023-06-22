import { Component } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

class Vehicle {
  year: number;
  make: string;
  model: number;
  mileage: number;
}

class workOrder {
  customerName: string;
  address: string;
  contactNo: number;
  email: string;

  vehicles: Vehicle[] = [];
  additionalDetails: string;

  constructor() {
    // Initially one empty product row we will show 
    this.vehicles.push(new Vehicle());
  }
}
@Component({
  selector: 'app-work-order-form',
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent {
  constructor() { };

  ngOnInit(): void { };
  workOrder = new workOrder();

  generatePDF(action:string) {
    let docDefinition = {
      content: [
        {
          text: 'Bucks AllRepair',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Work Order',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.workOrder.customerName,
                bold: true
              },
              { text: this.workOrder.address },
              { text: this.workOrder.email },
              { text: this.workOrder.contactNo }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Vehicle/Machine Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              ['Year', 'Make', 'Model', 'Mileage'],
              ...this.workOrder.vehicles.map(v => ([v.year, v.make, v.model, v.mileage])),
              
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          text: this.workOrder.additionalDetails,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{ qr: `${this.workOrder.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
          ul: [
            'This is system generated workOrder.',
          ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }

  }

  addProduct() {
    this.workOrder.vehicles.push(new Vehicle());
  }

}
