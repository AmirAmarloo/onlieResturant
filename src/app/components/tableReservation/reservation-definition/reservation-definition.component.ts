import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationDefinationService } from 'src/app/_services/reservation-defination.service';

@Component({
  selector: 'app-reservation-definition',
  templateUrl: './reservation-definition.component.html',
  styleUrls: ['./reservation-definition.component.css']
})
export class ReservationDefinitionComponent {

  reservationForm! : FormGroup;

  constructor(private fb: FormBuilder, 
    private _rs : ReservationDefinationService, 
    ){}

  ngOnInit(): void {
    this.createForm();
  }

 
  createForm(){
    this.reservationForm = this.fb.group({
      id: [0, Validators.required],
      tableId: [0, Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      userId: [0, Validators.required],
      qty: [0, Validators.required],
    })
  }

  onSubmit(){

  }

}
