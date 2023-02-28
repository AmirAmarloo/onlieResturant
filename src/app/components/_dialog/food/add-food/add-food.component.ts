import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersShow } from 'src/app/_models/orderShow';


export interface DialogDataOrderShow {
  width: string;
  order: OrdersShow
}

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit{

  orderForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataOrderShow,
    private _dialogRef: MatDialogRef<any>
  ) {
  }

    ngOnInit(): void {
      this.createForm();
    }

  createForm(){
    this.orderForm = this.fb.group({
      qty: [this.data.order.qty, Validators.required],
      description: [this.data.order.description, Validators.required],
    })
  }

  onSubmit() {
      this._dialogRef.close(this.orderForm.value);
  }

  close() {
    this._dialogRef.close();
  }  

}
