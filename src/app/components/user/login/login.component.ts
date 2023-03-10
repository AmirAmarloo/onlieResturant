import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { messagingForAccessService } from 'src/app/_services/massagingForAccess';
import { userService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm! : FormGroup;
  canLogin: string = '';
  comment: string = '';
  
  constructor(private fb: FormBuilder, 
              private route: Router, 
              private us: userService,
              private readNo: messagingForAccessService){}

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
        console.log('data: ', data);  
        innerUserCat = data.category;
        token = data.token;
        id = data.id;
        },
      complete: () => {
          if (id){
            this.canLogin = ''
            let decToken = this.getDecodedAccessToken(token);                         
            this.sendMessage(decToken.category);
            localStorage.setItem('token', token);
            this.comment = 'successfully loged in!';
          }
          else
          {
            this.sendMessage('0');
            this.canLogin = 'Invalid username or password';
            localStorage.removeItem('token');
          }
        },
      error: (err) => {console.log(err)}
    })
  }

  getDecodedAccessToken(token: string) {
    const helper = new JwtHelperService();
    return  helper.decodeToken(token);
  }

  sendMessage(msg: string): void {
    this.readNo.sendUpdate(msg);
}

testClick(){
  console.log(localStorage.getItem('token'));
}

}
