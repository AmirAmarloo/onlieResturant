import { Component } from '@angular/core';

@Component({
  selector: 'app-initparam',
  templateUrl: './initparam.component.html',
  styleUrls: ['./initparam.component.css']
})
export class InitparamComponent {
   public publicvar = 0;

   public getval():number{
    return this.publicvar;
   }
}
