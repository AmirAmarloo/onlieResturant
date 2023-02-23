import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestresurantService } from 'src/app/services/testresurant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm! : FormGroup;

  constructor(private fb: FormBuilder, private _uService: TestresurantService){}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      id: [125],
      token: [''],
      status: [2],

    })

 
  }

  onSubmit(){
    this._uService.addUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.registerForm.reset();
        this.registerForm.controls['name'].removeValidators(Validators.required);
        this.registerForm.controls['name'].updateValueAndValidity();
        this.registerForm.controls['name'].addValidators(Validators.required);        
        
        this.registerForm.controls['family'].removeValidators(Validators.required);
        this.registerForm.controls['family'].updateValueAndValidity();
        this.registerForm.controls['family'].addValidators(Validators.required);        

        this.registerForm.controls['email'].removeValidators(Validators.required);
        this.registerForm.controls['email'].updateValueAndValidity();
        this.registerForm.controls['email'].addValidators(Validators.required);        

        this.registerForm.controls['address'].removeValidators(Validators.required);
        this.registerForm.controls['address'].updateValueAndValidity();
        this.registerForm.controls['address'].addValidators(Validators.required);        

        this.registerForm.controls['password'].removeValidators(Validators.required);
        this.registerForm.controls['password'].updateValueAndValidity();
        this.registerForm.controls['password'].addValidators(Validators.required);        

        this.registerForm.controls['phone'].removeValidators(Validators.required);
        this.registerForm.controls['phone'].updateValueAndValidity();
        this.registerForm.controls['phone'].addValidators(Validators.required);        

      },
      complete : () => {console.log('user added')},
      error: (err) => {
        console.log(err.message);
      }
    })

  }

}
