import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FoodsService } from '../../../_services/foods.service';
import { Foods } from '../../../_models/foods';
import Swal from 'sweetalert2';
import { DeleteFoodDialogComponent, DialogData } from '../../_dialog/food/delete-food-dialog/delete-food-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoodCat } from '../../../_models/foodCat';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})

export class FoodsComponent {
  
  @ViewChild(MatTable) table! : MatTable<Foods> 
  @ViewChild('foodname') foodname! : ElementRef;
  @ViewChild('foodPrice') foodprice! : ElementRef;
  @ViewChild('foodCategory') foodCategory! : ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  foodForm! : FormGroup;
  foodCat =  FoodCat; //string[] = ['Food', 'Pizza', 'Drink'];
  public displayedColumns : string[] = ['name', 'price', 'description', 'category', 'edit', 'delete'];
  public dataSource!: MatTableDataSource<Foods>;
  public jp!: MatPaginator;
  public allFoods!: Foods[];
  public doEdit: Boolean = false;

  constructor(private fb: FormBuilder, 
              private _fs : FoodsService, 
              private _dialog: MatDialog,
              private route: Router,
              private _liveAnnouncer: LiveAnnouncer,
              ){}



  ngOnInit(): void {
    // const Role = Number(localStorage.getItem('user-level'))
    // console.log(Role);
    // if(Role < 2){
    //   this.route.navigate(["/login"]);
    //   return;
    // }

    this.createForm();
    this.getAllFoods();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  createForm(){
    this.foodForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      category: [0, Validators.required],
    })
  }

  onSubmit(){
    if (this.foodForm.value.name === '') {
      alert('Enter name!');
      this.foodname.nativeElement.focus();
      return;
    }
    if (this.foodForm.value.foodprice === 0 || this.foodForm.value.foodprice === '') {
      alert('Enter price!');
      this.foodprice.nativeElement.focus();
      return;
    }
    if (this.foodForm.value.category === 0 || this.foodForm.value.foodCategory === '') {
      alert('Choose Category!');
      this.foodCategory.nativeElement.focus();
      return;
    }

    if (this.foodForm.value.category === 'Food'){
      this.foodForm.value.category = 1;
    }
    if (this.foodForm.value.category === 'Pizza'){
      this.foodForm.value.category = 2;
    }
    if (this.foodForm.value.category === 'Drink'){
      this.foodForm.value.category = 3;
    }

    console.log('doEdit: ', this.doEdit);
    if (this.doEdit===true){
      console.log('true condition')
      this.editFood();
    }
    else
    {
      console.log('false condition')
      this.appendFood();
      this.doEdit = false;

    }
  }

  appendFood(){
    this._fs.addFood(this.foodForm.value).subscribe({
      next: (data) => {
      },
      complete: () => {console.log('Food added.')
        this.foodForm.reset();
        this.getAllFoods();},
        
      error: (err) => {
        console.log(this.foodForm.value);
        console.log(err.message);
      }
    })
  }

  editFood(){
    console.log(this.foodForm.value);
    this._fs.updateFood(this.foodForm.value).subscribe({
      next: (data) => {
      },
      complete: () => {console.log('Food updated.')
        this.foodForm.reset();
        this.getAllFoods();
      this.doEdit = false},
        
      error: (err) => {
        console.log(this.foodForm.value);
        console.log(err.message);
      }
    })
  }

  getAllFoods(){
    this._fs.getAllFoods().subscribe({
      next: (data) => {
        this.allFoods = data;
      },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.allFoods);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (er) => {
        console.log(er);
      }
    })
  }

  editClick(e: Foods, el: HTMLElement){
    this.foodForm = this.fb.group({
      id : [e.id, Validators.required],
      name: [e.name, Validators.required],
      price: [e.price, Validators.required],
      description: [e.description, Validators.required],
      category: [e.category, Validators.required],
    })
    el.scrollIntoView();
    this.doEdit = true;
  }

  // deleteClick(e: Foods){
  //   this._fs.deleteFoods(e).subscribe({
  //     next: (data) => {console.log(data)},
  //     complete: () => {this.getAllFoods()},
  //     error: (err) => {console.log(err)}
  //   })
  // }

  public deleteFood(e: Foods) {
    this._fs.deleteFoods(e).subscribe({
      next: () => {
        this._callSwal();
        this.getAllFoods();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _callSwal() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The food was successfully deleted',
      showConfirmButton: false,
      timer: 1500,
      width: '340px',
    });
  }  

  public openDeleteDialog(food: Foods) {
    const config: DialogData = { width: '840px', food };
    this._dialog
      .open(DeleteFoodDialogComponent, { data: config })
      .afterClosed()
      .subscribe({
        next: (isDeleted) => {
          if (isDeleted === true) {
            this.deleteFood(food);
          }
        },
      });
  }  


}
