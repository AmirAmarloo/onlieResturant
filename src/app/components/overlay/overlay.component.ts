import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/_services/orders.service';
import { OverlayService } from 'src/app/_services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  
  number: any;
  subscription!: Subscription;
  selectedQty: any;

  constructor(private overlayService:OverlayService,
              private _os: OrdersService
    ) {}

  ngOnInit(): void {
    this._os.currentQty.subscribe(qty => (this.selectedQty= qty));
    // this.subscription = this._menuService.getNumber().subscribe(number => { this.number = number });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  hideOverlay(): void {
    this.overlayService.sendClickEvent();
  }

}
