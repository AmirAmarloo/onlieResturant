import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userService } from 'src/app/_services/user.service';


export interface DialogDataUser {
  width: string;
}

@Component({
  selector: 'app-costomer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit{

  userForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataUser,
    private _dialogRef: MatDialogRef<any>,
    private us: userService,
  ) {}
  ngOnInit(): void {  
    this.createForm();
  }

  createForm(){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    this.us.addUser(this.userForm.value).subscribe({
      next: (res) => {
        let tmp = JSON.stringify(res);
        console.log(tmp);
        let id = Number(tmp.substring(tmp.indexOf('is:') + 3, tmp.indexOf('Email')-1));
        if (typeof id  === "number"){
          this._dialogRef.close(id);
        }
      },
      complete: () => {
        console.log('completed');
      },
      error: (err) => {
        console.log(err);
        this._dialogRef.close();
      }
    })
  }

  discardClick(){
    this._dialogRef.close();
  }

}
