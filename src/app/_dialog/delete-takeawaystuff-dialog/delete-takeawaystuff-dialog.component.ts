import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TakeawayStuff } from 'src/app/_models/takeawayStuff';

export interface DialogDataTks {
  width: string;
  tks: TakeawayStuff;
}

@Component({
  selector: 'app-delete-takeawaystuff-dialog',
  templateUrl: './delete-takeawaystuff-dialog.component.html',
  styleUrls: ['./delete-takeawaystuff-dialog.component.css']
})
export class DeleteTakeawaystuffDialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTks,
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
