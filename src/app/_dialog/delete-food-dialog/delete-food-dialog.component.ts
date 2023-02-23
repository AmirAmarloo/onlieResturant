import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Foods } from 'src/app/_models/foods';

export interface DialogData {
  width: string;
  food: Foods;
}

@Component({
  selector: 'app-delete-food-dialog',
  templateUrl: './delete-food-dialog.component.html',
  styleUrls: ['./delete-food-dialog.component.css']
})
export class DeleteFoodDialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
