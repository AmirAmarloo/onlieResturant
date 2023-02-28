import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TakeawayStuffService } from '../services/takeaway-stuff.service';
import { DeleteTakeawaystuffDialogComponent, DialogDataTks } from '../_dialog/delete-takeawaystuff-dialog/delete-takeawaystuff-dialog.component';
import { TakeawayStuff } from '../_models/takeawayStuff';

@Component({
  selector: 'app-takeaway-stuff',
  templateUrl: './takeaway-stuff.component.html',
  styleUrls: ['./takeaway-stuff.component.css']
})
export class TakeawayStuffComponent {
  
  @ViewChild(MatTable) table! : MatTable<TakeawayStuff> 
  @ViewChild('description') twsDescription! : ElementRef;
  @ViewChild('price') twsPrice! : ElementRef;

  tswForm! : FormGroup;
  public displayedColumns : string[] = ['description', 'price', 'edit', 'delete'];
  public dataSource! : TakeawayStuff[];
  public allTws!: TakeawayStuff[];
  public doEdit: Boolean = false;

  constructor(private fb: FormBuilder, 
              private _twsS : TakeawayStuffService, 
              private _dialog: MatDialog,
              private route: Router){}

  ngOnInit(): void {
    // const Role = Number(localStorage.getItem('user-level'))
    // console.log(Role);
    // if(Role < 3){
    //   this.route.navigate(["/login"]);
    //   return;
    // }

    this.createForm();
    this.getAllTakeawayStuff();
  }

  createForm(){
    this.tswForm = this.fb.group({
      id: [0, Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
    })
  }

  onSubmit(){
    if (this.tswForm.value.description === '') {
      alert('Enter description!');
      this.twsDescription.nativeElement.focus();
      return;
    }
    if (this.tswForm.value.price === 0 || this.tswForm.value.foodprice === '') {
      alert('Enter price!');
      this.twsPrice.nativeElement.focus();
      return;
    }
   
    if (this.doEdit===true){
      this.editTws();
    }
    else
    {
      this.appendTws();
      this.doEdit = false;

    }
  }

  appendTws(){
    this._twsS.addTakeawayStuff(this.tswForm.value).subscribe({
      next: (data) => {
      },
      complete: () => {console.log('Takeaway stuff added.')
        this.tswForm.reset();
        this.getAllTakeawayStuff();},
        
      error: (err) => {
        console.log(this.tswForm.value);
        console.log(err.message);
      }
    })
  }

  editTws(){
    console.log(this.tswForm.value);
    this._twsS.updateTakeawayStuff(this.tswForm.value).subscribe({
      next: (data) => {
      },
      complete: () => {console.log('Takeaway stuff updated.')
        this.tswForm.reset();
        this.getAllTakeawayStuff();
      this.doEdit = false},
        
      error: (err) => {
        console.log(this.tswForm.value);
        console.log(err.message);
      }
    })
  }

  getAllTakeawayStuff(){
    this._twsS.getAllTakeawayStuff().subscribe({
      next: (data) => {
        this.allTws = data;
        this.dataSource = data;
      },
      error: (er) => {
        console.log(er);
      }
    })
  }

  editClick(e: TakeawayStuff, el: HTMLElement){
    this.tswForm = this.fb.group({
      id : [e.id, Validators.required],
      description: [e.description, Validators.required],
      price: [e.price, Validators.required],
    })
    el.scrollIntoView();
    this.doEdit = true;
  }

  public deleteFood(e: TakeawayStuff) {
    this._twsS.deleteTakeawayStuff(e).subscribe({
      next: () => {
        this._callSwal();
        this.getAllTakeawayStuff();
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
      title: 'The Takeaway stuff was successfully deleted',
      showConfirmButton: false,
      timer: 1500,
      width: '340px',
    });
  }  

  public openDeleteDialog(tks: TakeawayStuff) {
    const config: DialogDataTks = { width: '840px', tks};
    this._dialog
      .open(DeleteTakeawaystuffDialogComponent, { data: config })
      .afterClosed()
      .subscribe({
        next: (isDeleted) => {
          if (isDeleted === true) {
            this.deleteFood(tks);
          }
        },
      });
  }  


}
