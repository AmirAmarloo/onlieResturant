import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { messagingForAccessService } from './_services/massagingForAccess';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  detNo : number = 0;
  private subscriptionName!: Subscription;

   constructor(private readNo: messagingForAccessService){}

   ngOnInit(): void{
    this.subscriptionName= this.readNo.getUpdate().subscribe
    (message => { 
    this.detNo = Number(message.text);
   });    

   }

  ngOnDestroy(){
    this.subscriptionName.unsubscribe();
  }

}
