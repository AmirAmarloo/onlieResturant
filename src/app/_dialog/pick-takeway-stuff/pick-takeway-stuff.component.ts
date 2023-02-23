import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TakeawayStuffService } from 'src/app/services/takeaway-stuff.service';
import { TakeawayStuff } from 'src/app/_models/takeawayStuff';

@Component({
  selector: 'app-pick-takeway-stuff',
  templateUrl: './pick-takeway-stuff.component.html',
  styleUrls: ['./pick-takeway-stuff.component.css']
})

export class PickTakewayStuffComponent implements OnInit{

  public displayedColumns : string[] = ['description', 'price'];
  public dataSource! : TakeawayStuff[];
  pickedId: Array<any> [] = [];
  tsForm! : FormGroup;
  selectedId!: number;

  constructor(
    private _tss : TakeawayStuffService,
    private _dialogRef: MatDialogRef<any>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllTakeawayStuff();
    this.createForm();
  }

  createForm(){
    this.tsForm = this.fb.group({
      tsId: [0, Validators.required],
      qty: [0, Validators.required],
    })
  }


  getAllTakeawayStuff(){
    this._tss.getAllTakeawayStuff().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (er) => {
        console.log(er);
      }
    })
  }

  getArrayIdByDesc (data :any[], desc: String): number{
    var id = -1;
    data.forEach((elm)=>{ 
      if (elm.description === desc){
        id = elm.id;
      }
    })
    return id;
  }

  findId(desc: String){
    this.selectedId = this.getArrayIdByDesc(this.dataSource, desc);
  }

  rowClick(){
    let tmp = {id: this.selectedId, qty: this.tsForm.value.qty}
  }

  onSubmit(){

  }

  discardClick(){
    this._dialogRef.close();
  }
}
