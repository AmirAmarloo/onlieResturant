import { Component } from '@angular/core';
import { Orders } from 'src/app/_models/Orders';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-order-settell',
  templateUrl: './order-settell.component.html',
  styleUrls: ['./order-settell.component.css']
})
export class OrderSettellComponent {

  orderList! : Orders[];
  tmpOrder!: Orders;
  isEmpty: number = 0;
  allOrders: any[][] = [];
  clickedButton: any;

  constructor(private _os: OrdersService){}

  
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    const tmp = this.tmpOrder || {}
    tmp.status = 1;
    let lastOg = 1;
    let tmpOrder: Orders[] = [];
    this.allOrders = [];
    this._os.getOrdersByStatus(tmp).subscribe({
      next: (data) => {this.orderList = data;
        if (this.orderList.length > 0){
          this.isEmpty = this.orderList[0].qty
        }
        else
        {
          this.isEmpty = 0;
        }
      },
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
      },
      error: (err) => {console.log(err)}
    })
  }

  changeToReady(ord: any[], event: any){
    const tmpOrd = this.tmpOrder || {}
    tmpOrd.userId = ord[0].userId;
    tmpOrd.dateTime = ord[0].dateTime;
    tmpOrd.status = 2;
    this._os.changeStatus(tmpOrd).subscribe({
      next: (data) => {console.log(data)},
      complete: () => {
        this.clickedButton = event.target;
        this.removeDiv();
        this.getOrders();
      },
      error: (err) => {console.log(err)}
    })
  }

  removeDiv(){
    this.clickedButton.parentElement.parentElement.style.display = "none";
  }  


}
