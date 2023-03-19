import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookTable } from 'src/app/_models/bookTable';
import { TableDef } from 'src/app/_models/tableDef';
import { ReservationDefinationService } from 'src/app/_services/reservation-defination.service';
import { TableDefinitionService } from 'src/app/_services/table-definition.service';
import Swal from 'sweetalert2';
import { CustomerDataComponent, DialogDataUser } from '../../_dialog/users/customer-data/customer-data.component';

@Component({
  selector: 'app-reservation-definition',
  templateUrl: './reservation-definition.component.html',
  styleUrls: ['./reservation-definition.component.css']
})
export class ReservationDefinitionComponent {

  reservationForm! : FormGroup;
  reservationData!: BookTable;
  bookingResult: string = '';
  public allTables!: TableDef[];

  constructor(private fb: FormBuilder, 
    private _rs : ReservationDefinationService,
    private _tds : TableDefinitionService,
    private _dialog: MatDialog, 
    ){}

  ngOnInit(): void {
    this.createForm();
  }

 
  createForm(){
    this.reservationForm = this.fb.group({
      id: [0, Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      userId: [0, Validators.required],
      qty: [0, Validators.required],
    })
  }

  onSubmit(){
    // setTimeout(()=>{console.log('SALAM')}, 3000);
    const tmp= this.reservationData || {}
    let userId : string = '';
    const token = localStorage.getItem('token') as string;
    const decToken = this.getDecodedAccessToken(token);
    console.log(decToken);
    if (decToken === null){
      const config: DialogDataUser = {width: '100px'};
      this._dialog
      .open(CustomerDataComponent, {data: config})
      .afterClosed()
      .subscribe({
        next: (registredUserId) => {
          if (registredUserId){
            userId = registredUserId;
            localStorage.setItem('userId', registredUserId);
          }
        },
        error: (err) => {console.log(err); }
      })
    }
    else{
      userId = decToken.id;
    }

    
    this.reservationForm.value.userId = Number(userId);    
    tmp.dateTime = this.reservationForm.value.date + ' ' + this.reservationForm.value.time;
    console.log(1);
    tmp.qty = this.reservationForm.value.qty;
    
    tmp.userId = Number(userId);
    let tmpResult : any;
    console.log(tmp);
    this._rs.doDookTable(tmp).subscribe({
      next: (data) => {
        tmpResult = data;
        console.log(tmpResult.result);
        if (tmpResult.result){
          console.log('result : ', tmpResult.result);
          this.bookingResult = tmpResult.result;
          this.getAllTables();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllTables(){
    this._tds.getAllTables().subscribe({
      next: (data) => {
        this.allTables = data;
      },
      complete: () => {
        this._callSwal();
      },
      error: (er) => {
        console.log(er);
      }
    })
    }    


  getDecodedAccessToken(token: string) {
    const helper = new JwtHelperService();
    return  helper.decodeToken(token); 
  } 

  private _callSwal() {
    const findNum = this.allTables.find((e)=>{return e.id === Number(this.bookingResult)});
    let tNo: string = '';
    if (findNum){
      tNo = findNum.tableNo.toString();
    }
    console.log(findNum);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `The Table Number ${tNo} has booked successfully`,
      showConfirmButton: false,
      timer: 5000,
      width: '340px',
    });
  }    
}
