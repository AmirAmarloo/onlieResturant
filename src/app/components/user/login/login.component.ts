import  Swal  from 'sweetalert2';
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
            this._callSwal();
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

  private _callSwal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'successfully logged in',
      showConfirmButton: false,
      timer: 2500,
      width: '340px',
    });
    this.route.navigateByUrl('/home');
  } 

  getDecodedAccessToken(token: string) {
    const helper = new JwtHelperService();
    console.log('Ex date: ', helper.getTokenExpirationDate(token));

    console.log(helper.decodeToken(token));
    return  helper.decodeToken(token);
  }

  sendMessage(msg: string): void {
    this.readNo.sendUpdate(msg);
}

testClick(){
  console.log(localStorage.getItem('token'));
}

}
