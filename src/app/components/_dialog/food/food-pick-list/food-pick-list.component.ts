import { Component, OnInit  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FoodsService } from 'src/app/_services/foods.service';
import { Foods } from 'src/app/_models/foods';


@Component({
  selector: 'app-pick-list',
  templateUrl: './food-pick-list.component.html',
  styleUrls: ['./food-pick-list.component.css']
})

export class PickListComponent implements OnInit{

  public displayedColumns : string[] = ['name', 'price', 'description', 'category', 'select'];
  public dataSource! : Foods[];
  foodCat : string[] = ['Food', 'Pizza', 'Drink'];
  pickedId!: Foods;

  constructor(
    private _fs : FoodsService,
    private _dialogRef: MatDialogRef<any>
  ) {}


  ngOnInit(): void {
    this.getAllFoods();
  }

  getAllFoods(){
    this._fs.getAllFoods().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (er) => {
        console.log(er);
      }
    })
  }

  pickupId(){
    this._dialogRef.close(this.pickedId);
  }

  rowClick(el: Foods){
    this._dialogRef.close(el);
  }


  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter(data => filterValue);
  }

  
}
