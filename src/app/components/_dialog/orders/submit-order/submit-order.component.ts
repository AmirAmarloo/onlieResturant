import { Component, Inject, OnInit } from '@angular/core';
import { OrdersShow } from 'src/app/_models/orderShow';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DialogDataOrderSubmit {
  width: string;
  orderShow: OrdersShow[];
  takeawayPrice: number;
}


@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit{

  taxPercentage: number = 27;
  taxAmount! : string;
  grossAmount! : string;
  takeawayTprice!: string;
  netAmount! : string;
  hasTakeaway: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataOrderSubmit,
    private _dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    let taxAmnt: number = 0;
    let grossAmnt: number = 0;
    let netAmnt: number = 0;
    this.data.orderShow.forEach((e) => {
      taxAmnt += ((e.price*e.qty) * this.taxPercentage) / 100;
      grossAmnt += e.price*e.qty;
    })
    let twAmnt: number = 0;
    if (this.data.takeawayPrice > 0){
      this.hasTakeaway = true;
      console.log('more than zero');
      twAmnt = this.data.takeawayPrice;
    }
    this.taxAmount = taxAmnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.grossAmount = grossAmnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.takeawayTprice = this.data.takeawayPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    netAmnt = taxAmnt + grossAmnt + twAmnt;
    this.netAmount = netAmnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  yes() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close();
  }  

}
