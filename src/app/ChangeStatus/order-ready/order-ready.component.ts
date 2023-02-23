import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/_models/Orders';

@Component({
  selector: 'app-order-ready',
  templateUrl: './order-ready.component.html',
  styleUrls: ['./order-ready.component.css']
})
export class OrderReadyComponent {

  orderList! : Orders[];
  tmpOrder!: Orders;
  orderGroup: number[] = [];

  constructor(private _os: OrdersService){}

  ngOnInit(): void {
    this.getOrders();
  }



  getOrders(){
    const tmp = this.tmpOrder || {}
    let totalOrders: Orders[] = new Array(this.orderList.length-1);
    tmp.status = 0;
    this._os.getOrdersByStatus(tmp).subscribe({
      next: (data) => {
        this.orderList = data;
        console.log(this.orderList)},
      complete: () => {
        let lastOg: number = -1;
        let aRow = -1;
        for (let i = 0; i < this.orderList.length; i++){
          if (this.orderList[i].orderGroup != lastOg){
            aRow++;
            lastOg = this.orderList[i].orderGroup;
          }
          totalOrders.push(this.orderList[i]);
        }
        console.log(totalOrders);
      },
      error: (err) => {console.log(err)}
    })
  }
  // totalOrders[0].push(this.orderList[1]);
}

