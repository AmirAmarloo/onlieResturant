import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Orders } from 'src/app/_models/Orders';

export interface DialogDataOrder {
  width: string;
  order: Orders;
}

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrls: ['./delete-order-dialog.component.css']
})
export class DeleteOrderDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataOrder,
    private _dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {}

  yes() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close();
  }  

}
