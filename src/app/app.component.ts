import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { messagingForAccessService } from './_services/massagingForAccess';
import { OverlayService } from './_services/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  detNo : number = 0;
  private subscriptionName!: Subscription;
  clickEventsubscription!: Subscription;

   constructor(
    private readNo: messagingForAccessService,
    private overlayService:OverlayService,
    ){}

   ngOnInit(): void{
    this.subscriptionName= this.readNo.getUpdate().subscribe
    (message => { 
    this.detNo = Number(message.text);
    });    

    this.clickEventsubscription = this.overlayService.getClickEvent().subscribe(()=>{
      this.hideOverlay();
    })

   }

  ngOnDestroy(){
    this.subscriptionName.unsubscribe();
  }
  
  overlayStyle!: string;
  showOverlay() {
   this.overlayStyle = 'overlay-show';
  }
  hideOverlay() {
    this.overlayStyle = 'overlay-hide';
  }

}
