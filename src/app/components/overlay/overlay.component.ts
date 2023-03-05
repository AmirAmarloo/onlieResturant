import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlayService } from 'src/app/_services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  
  number: any;
  subscription!: Subscription;
  badgQty: string = '5';

  constructor(private overlayService:OverlayService) {}

  ngOnInit(): void {
    // this.subscription = this._menuService.getNumber().subscribe(number => { this.number = number });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  hideOverlay(): void {
    this.overlayService.sendClickEvent();
  }

  getTotalQty(totalQty: any){
    this.badgQty = totalQty;
  }

}
