import { Component } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';
import { Orders } from 'src/app/_models/Orders';

@Component({
  selector: 'app-order-ready',
  templateUrl: './order-ready.component.html',
  styleUrls: ['./order-ready.component.css']
})
export class OrderReadyComponent {

  orderList! : Orders[];
  tmpOrder!: Orders;
  allOrders: any[][] = [];
  clickedButton: any;



  constructor(private _os: OrdersService){}

  ngOnInit(): void {
    this.getOrders();
  }



  getOrders(){
    const tmp = this.tmpOrder || {}
    tmp.status = 0;
    let lastOg = 1;
    let tmpOrder: Orders[] = [];
    this._os.getOrdersByStatus(tmp).subscribe({
      next: (data) => {
        this.orderList = data;
        console.log(this.orderList)},
      complete: () => {
        for (let i = 0; i < this.orderList.length; i++){
          if (this.orderList[i].orderGroup == lastOg){
            tmpOrder.push(this.orderList[i]);
          }
          else{
            this.allOrders.push(tmpOrder);
            tmpOrder = [];
            tmpOrder.push(this.orderList[i]);
            lastOg = this.orderList[i].orderGroup;
          }
        }
        this.allOrders.push(tmpOrder);
        console.log(this.allOrders);
      },
      error: (err) => {console.log(err)}
    })
  }

  changeToReady(ord: any[], event: any){
    const tmpOrd = this.tmpOrder || {}
    tmpOrd.userId = ord[0].userId;
    tmpOrd.dateTime = ord[0].dateTime;
    tmpOrd.status = 1;
    this._os.changeStatus(tmpOrd).subscribe({
      next: (data) => {console.log(data)},
      complete: () => {
        this.clickedButton = event.target;
        this.removeDiv();
      },
      error: (err) => {console.log(err)}
    })
  }

  removeDiv(){
    this.clickedButton.parentElement.parentElement.style.display = "none";
  }

}

