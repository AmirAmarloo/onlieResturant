import { Component } from '@angular/core';
import { TestresurantService } from '../services/testresurant.service';
import { Users } from '../_models/users';
// import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users?: Users[];

  public dataSource = new MatTableDataSource<Users>;


  public displayedColumns: string[] = [
    'id',
    'name',
    'family',
    'email',
    'phone',
    'address'
  ];

  uTitle: string = 'Data is loading...';

  constructor(private _uService: TestresurantService,
              private route: Router){}

  

  getUsers() : void{
    this._uService.getUsers().subscribe({
      next:  (data) => {
        this.users = data;
        this.dataSource.data = data;
                        },
      complete : () => {this.uTitle = 'User data table'},
      error: (err) => {this.uTitle = err}
    })
    // this._uService.getUsers().subscribe((data)=>{this.users = data
    //   console.log('Print Users', this.users)
    //   this.dataSource.data = data;})
    // console.log('Print Users', this.users);
  }

  ngOnInit():void{
    const Role = Number(localStorage.getItem('user-level'))
    console.log(Role);
    if(Role < 2){
      this.route.navigate(["/login"]);
      return;
    }
    this.getUsers();
  }

}
