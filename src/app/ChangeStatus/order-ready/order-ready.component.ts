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
  tmpTest!: number;
  testHt: string = '<h2> test </h2>'

  constructor(private _os: OrdersService){}

  ngOnInit(): void {
    this.getOrders();
  }



  getOrders(){
    const tmp = this.tmpOrder || {}
    // let totalOrders: Orders[] = new Array(this.orderList.length-1);
    tmp.status = 0;
    let lastOg = -1;
    this._os.getOrdersByStatus(tmp).subscribe({
      next: (data) => {
        this.orderList = data;
        console.log(this.orderList)},
      complete: () => {
        for (let i = 0; i < this.orderList.length; i++){
          if (this.orderList[i].orderGroup != lastOg){
            this.orderGroup.push(this.orderList[i].orderGroup);
            lastOg = this.orderList[i].orderGroup;
          }
        }
        console.log(this.orderGroup);
      },
      error: (err) => {console.log(err)}
    })
  }
  // totalOrders[0].push(this.orderList[1]);
}

