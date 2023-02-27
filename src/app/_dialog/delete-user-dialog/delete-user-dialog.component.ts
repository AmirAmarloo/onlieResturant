import { Component,Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/_models/users';

export interface UserDialogData {
  width: string;
  user: Users;
}

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
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
