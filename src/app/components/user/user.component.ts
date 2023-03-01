import { Component, ElementRef, ViewChild } from '@angular/core';
import { Users } from '../../_models/users';
import { userService } from '../../_services/user.service';
// import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserCat } from '../../_models/userCat';
import { DeleteUserDialogComponent, UserDialogData } from '../_dialog/delete-user-dialog/delete-user-dialog.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @ViewChild('userName') userName! : ElementRef;
  @ViewChild('userfamily') userFamily! : ElementRef;
  @ViewChild('userEmail') userEmail! : ElementRef;
  @ViewChild('userPhone') userPhone! : ElementRef;
  @ViewChild('userAddress') userAddress! : ElementRef;
  @ViewChild('userCategory') userCategory! : ElementRef;

  users?: Users[];
  userForm!: FormGroup;
  userCat = UserCat; // string[] = ['customer', 'kitchenUser', 'kitchenDirector', 'supervisor', 'manager', 'admin'];
  catNumber!: number | string;
  public doEdit: Boolean = false;
  public dataSource = new MatTableDataSource<Users>;

  public displayedColumns: string[] = [
    'id',
    'name',
    'family',
    'email',
    'phone',
    'address',
    'category',
    'edit',
    'delete'
  ];

  uTitle: string = 'Data is loading...';

  constructor(private _us: userService,
              private fb: FormBuilder,
              private route: Router,
              private _dialog: MatDialog,
              ){}

  
  ngOnInit():void{
    // const Role = Number(localStorage.getItem('user-level'))
    // console.log(Role);
    // if(Role < 2){
    //   this.route.navigate(["/login"]);
    //   return;
    // }
    this.createForm();
    this.getUsers();
  }


  getUsers() : void{
    this._us.getUsers().subscribe({
      next:  (data) => {
        this.users = data;
        this.dataSource.data = data;
        // if(this.dataSource.data.find(x => x.category == 0)){
        //   this.catName = "admin";
        // }
                        },
      complete : () => {this.uTitle = 'User data table'},
      error: (err) => {this.uTitle = err}
    })
    // this._us.getUsers().subscribe((data)=>{this.users = data
    //   console.log('Print Users', this.users)
    //   this.dataSource.data = data;})
    // console.log('Print Users', this.users);
  }
  
  createForm(){
    this.userForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      // status: [0, Validators.required],
      // token: [0, Validators.required],
      category: [0, Validators.required],
    })
  }

  onSubmit(){
    if (this.userForm.value.name === '') {
      alert('Please Enter a Name!');
      this.userName.nativeElement.focus();
      return;
    }
    if (this.userForm.value.family === '') {
      alert('Please Enter a Family!');
      this.userFamily.nativeElement.focus();
      return;
    }
    if (this.userForm.value.email === '') {
      alert('Please Enter Email!');
      this.userEmail.nativeElement.focus();
      return;
    }
    if (this.userForm.value.phone === '') {
      alert('Please Enter Phone!');
      this.userPhone.nativeElement.focus();
      return;
    }
    if (this.userForm.value.address === '') {
      alert('Please Enter Address!');
      this.userAddress.nativeElement.focus();
      return;
    }
    if (this.userForm.value.category === 0 || this.userForm.value.userCategory === '') {
      alert('Please Choose Category!');
      this.userCategory.nativeElement.focus();
      return;
    }
    // string[] = ['customer', 'kitchenUser', 'kitchenDirector', 'supervisor', 'manager', 'admin'];
    if (this.userForm.value.category === 'customer'){
      this.userForm.value.category = 0;
    }
    if (this.userForm.value.category === 'kitchenUser'){
      this.userForm.value.category = 1;
    }
    if (this.userForm.value.category === 'kitchenDirector'){
      this.userForm.value.category = 2;
    }
    if (this.userForm.value.category === 'supervisor'){
      this.userForm.value.category = 3;
    }
    if (this.userForm.value.category === 'manager'){
      this.userForm.value.category = 4;
    }
    if (this.userForm.value.category === 'admin'){
      this.userForm.value.category = 5;
    }

    console.log('doEdit: ', this.doEdit);
    if (this.doEdit===true){
      console.log('true condition')
      this.editUser();
    }
    else
    {
      console.log('false condition')
      this.appendUser();
      this.doEdit = false;

    }
  }

  editUser(){
    console.log(this.userForm.value);
    this._us.updateUser(this.userForm.value).subscribe({
      next: (data) => {
      },
      complete: () => {console.log('User updated.')
        this.userForm.reset();
        this.getUsers();
      this.doEdit = false},
        
      error: (err) => {
        console.log(this.userForm.value);
        console.log(err.message);
      }
    })
  }

  appendUser(){
    this._us.addUser(this.userForm.value).subscribe({
      next: (data) => {
      },
      complete: () => {console.log('User added.')
        this.userForm.reset();
        this.getUsers();},
        
      error: (err) => {
        console.log(this.userForm.value);
        console.log(err.message);
      }
    })
  }
  
  editClick(e: Users, el: HTMLElement){
    this.userForm = this.fb.group({
      id: [e.id, Validators.required],
      name: [e.name, Validators.required],
      family: [e.family, Validators.required],
      email: [e.email, Validators.required],
      phone: [e.phone, Validators.required],
      address: [e.address, Validators.required],
      category: [e.category, Validators.required],
    })
    el.scrollIntoView();
    this.doEdit = true;
  }

  
  private _callSwal() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The user was successfully deleted',
      showConfirmButton: false,
      timer: 1500,
      width: '340px',
    });
  }  

  public deleteUser(e: Users) {
    this._us.deleteUsers(e).subscribe({
      next: () => {
        this._callSwal();
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public openDeleteDialog(user: Users) {
    const config: UserDialogData = { width: '840px', user };
    this._dialog
      .open(DeleteUserDialogComponent, { data: config })
      .afterClosed()
      .subscribe({
        next: (isDeleted) => {
          if (isDeleted === true) {
            this.deleteUser(user);
          }
        },
      });
  }  


}
