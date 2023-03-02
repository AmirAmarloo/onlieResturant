import { Component } from '@angular/core';
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
}
