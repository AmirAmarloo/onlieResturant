import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { AddFoodComponent, DialogDataOrderShow } from '../_dialog/add-food/add-food.component';
import { OrdersShow } from '../_models/orderShow';
import { Orders } from '../_models/Orders';
import { CostomerDataComponent, DialogDataUser } from '../_dialog/costomer-data/costomer-data.component';
import { DialogDataOrderSubmit, SubmitOrderComponent } from '../_dialog/submit-order/submit-order.component';
import { TakeawayStuff } from '../_models/takeawayStuff';
import { TakeawayStuffService } from '../services/takeaway-stuff.service';
import { TakeawayService } from '../services/takeaway.service';
import { Takeaway } from '../_models/takeaway';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent {

  public displayedColumns : string[] = ['food', 'price', 'qty', 'description', 'order', 'cancle'];
  public dataSource! : OrdersShow[];
  orderCat: number = 1;
  orderCart: Orders [] = [];
  isLoading: boolean = true;
  totalOrder: number = 0;
  showBadge: boolean = true;
  clickedRow: any;
  totalPrice: string = '0';
  orderShowList: OrdersShow[] = [];
  submitTime: string = '';
  tsDataSource!: TakeawayStuff[];
  tsId!: number;
  tsQty!: number;
  takeaway! : FormGroup;


  constructor(private fb: FormBuilder, 
              private _os : OrdersService, 
              private _dialog: MatDialog,
              private route: Router,
              private _tss: TakeawayStuffService,
              private _ts: TakeawayService){}

  ngOnInit(): void {
    const Role = Number(localStorage.getItem('user-level'))
    if(Role < 0){
      this.route.navigate(["/login"]);
      return;
    }
    this.getOrders(this.orderCat);
    this.getAllTakeawayStuff();
    this.createForm();
  }

  createForm(){
    this.takeaway = this.fb.group({
      userId: [0, Validators.required],
      tsId: [0, Validators.required],
      qty: [0, Validators.required],
      dateTime: ['', Validators.required],
      price: [0, Validators.required],
    })
  }

  getAllTakeawayStuff(){
    this._tss.getAllTakeawayStuff().subscribe({
      next: (data) => {
        this.tsDataSource = data;
        console.log(this.tsDataSource);
      }
    })
  }

  getOrders(stat: number){
    this._os.getAllOrders(0).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
        complete: () => {this.isLoading = false},
      error: (er) => {
        console.log(er);
      }
    })
  }

  public deleteOrder() {
  }

  public addOrder(data: Orders){
    var edt = this.getArrayIndexById(this.orderCart, data.foodId);
    if (edt === -1){
      this.orderCart.push(data);
    }
    else{
      if (data.qty === 0){
        this.cancelOrder(data.id);
      }
      else{
        this.orderCart[edt].qty = data.qty;
        this.orderCart[edt].description = data.description;
      }
    }
    this.effectRow(data.qty);
    let ix :number = 0;
    ix = this.getArrayIndexById(this.dataSource, data.foodId);
    this.dataSource[ix].qty = data.qty;
    this.dataSource[ix].description = data.description;
    this.badgeReset();
  }

  effectRow(qty: number){
    if (qty > 0){
      this.clickedRow.parentElement.parentElement.style.backgroundColor = "red";
      for (let i = 0; i < this.clickedRow.parentElement.parentElement.children.length; i++){
        this.clickedRow.parentElement.parentElement.children[i].style.color = "white"
      }
    }
    else
    {
      this.clickedRow.parentElement.parentElement.style.backgroundColor = "white";
      for (let i = 0; i < this.clickedRow.parentElement.parentElement.children.length; i++){
        this.clickedRow.parentElement.parentElement.children[i].style.color = "black"
      }
    }

  }

  badgeReset(){
    let cntQty = 0;
    let prc = 0;
    this.orderCart.forEach((oc)=> {
      cntQty = cntQty + oc.qty;
      prc = prc + (oc.qty * oc.price);
    });
    this.totalOrder = cntQty;
    this.totalPrice = prc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (cntQty > 0){
      this.showBadge = false;
    }
    else
    {
      this.showBadge = true;
    }
  }

  getArrayIndexById (data :any[], id: number): number{
    var idx = -1;
    data.forEach((elm, index)=>{ 
      if (elm.foodId === id){
        idx = index;
      }
    })
    return idx;
  }

  cancelOrder(id: number){
    var idx = this.getArrayIndexById(this.orderCart, id);
    if (idx === -1){
      return;
    }
    this.effectRow(0);
    let ix : number = 0;
    ix = this.getArrayIndexById(this.dataSource, id);
    this.dataSource[ix].qty = 0;
    this.dataSource[ix].description = '';
    this.orderCart.splice(idx, 1);
    ix = this.getArrayIndexById(this.orderShowList, id);
    this.orderShowList.splice(ix, 1);
    this.badgeReset();
  }

  private _callSwal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'The order was successfully submitted',
      showConfirmButton: false,
      timer: 2500,
      width: '340px',
    });
  }  

  public openAddOrder(order: OrdersShow) {
    const config: DialogDataOrderShow = { width: '840px', order};
    this._dialog
      .open(AddFoodComponent, { data: config })
      .afterClosed()
      .subscribe({
        next: (data) => {
            if (data){
              data.foodId = order.foodId;
              data.price = order.price;
              if (data.qty === 0){
                this.cancelOrder(order.foodId);

              }
              else{
                this.addOrder(data);
                let edt = this.getArrayIndexById(this.orderShowList, order.foodId);
                if (edt === -1){
                  this.orderShowList.push(order);
                }              }
            }
        },
      });
  }  

  clickColumn(e: OrdersShow, event: any){
    this.clickedRow = event.target ;
    this.openAddOrder(e);
    // this.orderShowList.push(e);
  }

  clickCancel(e: OrdersShow, event: any){
    this.clickedRow = event.target ;
    this.cancelOrder(e.foodId);
    // let idx = this.getArrayIndexById(this.orderCart, e.foodId);
    // this.orderShowList.splice(idx, 1);
    // idx = this.getArrayIndexById(this.orderShowList, e.foodId);
    // this.orderShowList.splice(idx, 1);
  }

  checkOut(){
    if (localStorage.getItem('userId') ===null){
      const config: DialogDataUser = {width: '100px'};
      this._dialog
      .open(CostomerDataComponent, {data: config})
      .afterClosed()
      .subscribe({
        next: (registredUserId) => {
          if (registredUserId){
            localStorage.setItem('userId', registredUserId);
            this.submitOrder(this.orderShowList);
          }
        },
        error: (err) => {console.log(err); }
      })
    }
    else{
      this.submitOrder(this.orderShowList);
    }
  }
  
  submitOrder(orderShow: OrdersShow[]){
    if (orderShow.length === 0){
      return;
    }
    this.clacTakeaway();
    let takeawayPrice = 0 ;

    if (this.takeaway.value.qty && this.takeaway.value.price){
      takeawayPrice = this.takeaway.value.qty * this.takeaway.value.price;
    }
    const config : DialogDataOrderSubmit = {width : '800px', orderShow, takeawayPrice}
    this._dialog
      .open(SubmitOrderComponent, { data: config, maxHeight: '90vh' })
      .afterClosed()
      .subscribe({
        next: (isSubmit) => {
          if (isSubmit){
            this.orderCart.forEach((e)=>{
              let userid = Number(localStorage.getItem('userId'));
              e.userId = userid;
              this._os.addOrder(e).subscribe({
                next: (data) => {
                  console.log(data);
                },
                complete: () => {
                  this._os.submitOrder(Number(localStorage.getItem('userId'))).subscribe({
                    next: (dta) => {
                      let submitTimeStr = JSON.stringify(dta);
                      this.submitTime = submitTimeStr.substring(submitTimeStr.indexOf('[{"result":"')+12, submitTimeStr.indexOf('"}]'));
                      this.takeaway.value.dateTime = this.submitTime;
                      this.addTakeaway();
                      this._callSwal();
                      this.clearOrder();
                      },
                    error: (err) => {console.log(err)}
                  })  
                },
                error: (err) => {
                  console.log(err);
                }
              })
            })            
          }
        },
      });
  }

  clearOrder(){
    this.orderCart = [];
    this.orderShowList =[];
    this.effectRow(0);
    this.badgeReset();
    this.getOrders(this.orderCat);
  }

  clickOption(desc : string){
    let id = -1;
    this.tsDataSource.forEach((e) => {
      if (e.description === desc){
        id = e.id;
      }
    })
    this.tsId = id;
    console.log(this.tsId);
  }

  onSearchChange(searchValue: any): void {  
    searchValue.target;
    this.tsQty = Number(searchValue.target.value);
  }

  clacTakeaway(){
    if (this.tsId || this.tsQty){
      let idx = -1
      this.tsDataSource.forEach((e, index)=>{
        if (e.id === this.tsId){
          idx = index;
        }
      })
      console.log(this.tsDataSource[idx]);
      this.takeaway.value.price = this.tsDataSource[idx].price;
      this.takeaway.value.qty = this.tsQty;
      this.takeaway.value.tsId = this.tsDataSource[idx].id;
      this.takeaway.value.userId = Number(localStorage.getItem('userId'));
      console.log(this.takeaway.value);
    }
  }

  addTakeaway(){
    this._ts.addTakeaway(this.takeaway.value).subscribe({
      next: (dta) => {console.log(dta)},
      error: (err) => {console.log('error takeaway; ', err)}
    });    
  }
}
