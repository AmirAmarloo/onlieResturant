import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableDef } from 'src/app/_models/tableDef';
import { TableDefinitionService } from 'src/app/_services/table-definition.service';
import Swal from 'sweetalert2';
import { DeleteFoodDialogComponent, DialogData } from '../../_dialog/food/delete-food-dialog/delete-food-dialog.component';

@Component({
  selector: 'app-table-definition',
  templateUrl: './table-definition.component.html',
  styleUrls: ['./table-definition.component.css']
})
export class TableDefinitionComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tableNo') tableNo! : ElementRef;
  @ViewChild('qty') tQty! : ElementRef;
  
  tableForm! : FormGroup;
  doEdit : boolean = false;
  public displayedColumns : string[] = ['tableNo', 'qty', 'edit', 'delete'];
  public dataSource!: MatTableDataSource<TableDef>;
  public allTables!: TableDef[];

  constructor(private fb: FormBuilder, 
    private _tds : TableDefinitionService, 
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog: MatDialog,
    ){}

    ngOnInit(): void {
      this.createForm();
      this.getAllTables();
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
      this.tableForm = this.fb.group({
        id: [0, Validators.required],
        tableNo: [0, Validators.required],
        qty: [0, Validators.required],
      })
    }

    getAllTables(){
      this._tds.getAllTables().subscribe({
        next: (data) => {
          this.allTables = data;
        },
        complete: () => {
          this.dataSource = new MatTableDataSource(this.allTables);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (er) => {
          console.log(er);
        }
      })
      }    

      onSubmit(){
        if (this.tableForm.value.tableNo === '') {
          alert('Enter Number!');
          this.tableNo.nativeElement.focus();
          return;
        }
        if (this.tableForm.value.qty === 0 || this.tableForm.value.qty === '') {
          alert('Enter QTY!');
          this.tQty.nativeElement.focus();
          return;
        }
    
        if (this.doEdit===true){
          this.editTable();
        }
        else
        {
          this.appendTable();
          this.doEdit = false;
    
        }
      }
    
      appendTable(){
        this._tds.defineTable(this.tableForm.value).subscribe({
          next: (data) => {
          },
          complete: () => {
            this.tableForm.reset();
            this.getAllTables();},
            
          error: (err) => {
            console.log(err.message);
          }
        })
      }
    
      editTable(){
      console.log(this.tableForm.value);
        this._tds.updateTable(this.tableForm.value).subscribe({
          next: (data) => {
          },
          complete: () => {
            this.tableForm.reset();
            this.getAllTables();
          this.doEdit = false},
            
          error: (err) => {
            console.log(this.tableForm.value);
            console.log(err.message);
          }
        })
      }
    
      editClick(e: TableDef, el: HTMLElement){
        this.tableForm = this.fb.group({
          tableNo : [e.tableNo, Validators.required],
          qty: [e.qty, Validators.required],
          id: [e.id, Validators.required],
        })
        el.scrollIntoView();
        this.doEdit = true;
      }
    
      public deleteTable(e: TableDef) {
        this._tds.deleteTable(e).subscribe({
          next: () => {
            this._callSwal();
            this.getAllTables();
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
          title: 'The Table was successfully deleted',
          showConfirmButton: false,
          timer: 1500,
          width: '340px',
        });
      }  
    
      public openDeleteDialog(food: string, tableDate: TableDef) {
        const config: DialogData = { width: '840px', food };
        this._dialog
          .open(DeleteFoodDialogComponent, { data: config })
          .afterClosed()
          .subscribe({
            next: (isDeleted) => {
              if (isDeleted === true) {
                this.deleteTable(tableDate);
              }
            },
          });
      }  
      
}
