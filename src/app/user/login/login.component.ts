import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DemoServiceService } from 'src/app/demo-service.service';
import { TestresurantService } from 'src/app/services/testresurant.service';
import { Users } from 'src/app/_models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm! : FormGroup;
  canLogin: string = '';
  // @ViewChild(AppComponent, 'inger') amountEl! : ElementRef;
  // private footerElementRef!: ElementRef;
  // private child!: ElementRef;
  
  constructor(private fb: FormBuilder, 
              private route: Router, 
              private us: TestresurantService,
              private readNo: DemoServiceService){}

  ngOnInit(): void{
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
    let innerUserCat: number = -1;
    let token: string = '';
    let id: number;
    this.us.loginUser(this.loginForm.value).subscribe({
      next: (data) => { 
         innerUserCat = data.category;
         token = data.token;
         id = data.id;
        },
      complete: () => {
          if (id){
            this.canLogin = ''
            let decToken = this.getDecodedAccessToken(token);                         
            this.sendMessage(decToken.category);
            localStorage.setItem('user-level', decToken.category);
            localStorage.setItem('userId', id.toString());
          }
          else
          {
            localStorage.setItem('user-level', '0');
            this.sendMessage('0');
            this.canLogin = 'Invalid username or password';
            localStorage.removeItem('user-level');
            localStorage.removeItem('userId');
          }
        },
      error: (err) => {console.log(err)}
    })
  }

  getDecodedAccessToken(token: string) {
    const helper = new JwtHelperService();
    console.log('Ex date: ', helper.getTokenExpirationDate(token))
    return  helper.decodeToken(token);
  }

  sendMessage(msg: string): void {
    this.readNo.sendUpdate(msg);
}

}
