import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/_services/orders.service';
import { OverlayService } from 'src/app/_services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  
  number: any;
  showBadge: boolean = true;
  selectedQty: any;
  ocf: boolean = true;

  constructor(private overlayService:OverlayService,
              private _os: OrdersService,
              private _dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this._os.currentQty.subscribe(qty => (this.badgeReset(qty)));
    // this.subscription = this._menuService.getNumber().subscribe(number => { this.number = number });
  }

  badgeReset(qty: number){
    this.selectedQty = qty
    if (qty > 0){
      this.showBadge = false;
    }
    else
    {
      this.showBadge = true;
    }
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

  hideOverlay(): void {
    this.overlayService.sendClickEvent();
  }

  openDialog(){
    this._os.openCheckoutFunc(this.ocf);
  }
}
