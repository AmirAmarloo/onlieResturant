import { OverlayConfig } from '@angular/cdk/overlay';
import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IngredientsService } from '../services/ingredients.service';
import { PickListComponent } from '../_dialog/pick-list/pick-list.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})

export class IngredientComponent {

  registerForm! : FormGroup;
  Units : string[] = ['Gram', 'mml'];

  @ViewChild('amountel') amountEl! : ElementRef;
  @ViewChild('unit') unt! : ElementRef;
  @ViewChild('matname') matel! : ElementRef;
  @ViewChild('priceel') priceel! : ElementRef;
  @ViewChild('pickFood') pFood! : ElementRef;
  @ViewChild('pickFoodname') pFoodName! : ElementRef;
  
  constructor(private fb: FormBuilder, 
              private _uService: IngredientsService,
              private _dialog: MatDialog,
              private route: Router){}
  
  ngOnInit(): void {
    this.createForm();
    const Role = Number(localStorage.getItem('user-level'))
    if(Role < 1){
      this.route.navigate(["/login"]);
      return;
    }
  }


  createForm(){
    this.registerForm = this.fb.group({
      materialName: ['', Validators.required],
      amount: [0, Validators.required],
      unit: [0, Validators.required],
      price: [0, Validators.required],
      foodId: [0, Validators.required]
    })
  }


  onSubmit(){

    if(document.activeElement?.id === 'pickFoodBtn'){
      return;
    }

    this.registerForm.value.foodId = this.pFood.nativeElement.value;
    console.log(this.registerForm.value.foodId);
    if (this.registerForm.value.foodId === 0 || this.registerForm.value.foodId === '') {
      alert('Enter Food!');
      this.pFood.nativeElement.focus();
      return;
    }
    if (this.registerForm.value.materialName === 0 || this.registerForm.value.materialName === '') {
      alert('Enter name!');
      this.matel.nativeElement.focus();
      return;
    }
    if (this.registerForm.value.amount === 0 || this.registerForm.value.amount === '') {
      alert('Enter amount!');
      this.amountEl.nativeElement.focus();
      return;
    }
    if (this.registerForm.value.unit === 0 || this.registerForm.value.unit === '') {
      alert('Choose Unit!');
      this.unt.nativeElement.focus();
      return;
    }
    if (this.registerForm.value.price === 0 || this.registerForm.value.price === '') {
      alert('Enter price!');
      this.priceel.nativeElement.focus();
      return;
    }

    if (this.registerForm.value.unit === 'Gram'){
      this.registerForm.value.unit = 1;
    }
    if (this.registerForm.value.unit === 'mml'){
      this.registerForm.value.unit = 2;
    }
    

    this._uService.addIngredient(this.registerForm.value).subscribe({
      next: () => {
        // this.registerForm.reset();
        // this.registerForm.controls['materialName'].removeValidators(Validators.required);
        // this.registerForm.controls['materialName'].updateValueAndValidity();
        // this.registerForm.controls['materialName'].addValidators(Validators.required);        
        
        // this.registerForm.controls['amount'].removeValidators(Validators.required);
        // this.registerForm.controls['amount'].updateValueAndValidity();
        // this.registerForm.controls['amount'].addValidators(Validators.required);        

        // this.registerForm.controls['unit'].removeValidators(Validators.required);
        // this.registerForm.controls['unit'].updateValueAndValidity();
        // this.registerForm.controls['unit'].addValidators(Validators.required);        

        // this.registerForm.controls['price'].removeValidators(Validators.required);
        // this.registerForm.controls['price'].updateValueAndValidity();
        // this.registerForm.controls['price'].addValidators(Validators.required);        

      },
      complete : () => {console.log('Ingredient added.')
                        this.registerForm.reset()},
      error: (err) => {
        console.log(err.message);
      }
    })

  }

  openWithTemplate(tpl: TemplateRef<any>) {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background'
     });
  }
  
  

  public foodPickup() {
    this._dialog
      .open(PickListComponent, {maxHeight: '90vh'})
      .afterClosed()
      .subscribe({
        next: (pId) => {
          if (pId != 0) {
            this.registerForm.value.foodId = pId.id;
            this.pFood.nativeElement.value = pId.id;
            // console.log (this.registerForm.value.foodId);
            this.pFoodName.nativeElement.value =pId.name
          }
        },
        error: (err) => {console.log(err)}
      });
  }  

}
