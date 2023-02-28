import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TestresurantService } from 'src/app/services/testresurant.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  resetPasswordForm! : FormGroup;
  infoOut: string = '';
  token!: string;
  email!: string;

  resetedData = {
    email: '',
    password: '',
    token: ''
  }

  constructor(private fb: FormBuilder, private us: TestresurantService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.createForm();
  }

  createForm(){
    this.resetPasswordForm = this.fb.group({
      passwordFirst : ['', Validators.required],
      passwordSecond : ['', Validators.required]
    })
  }

  onSubmit(){
    if (this.resetPasswordForm.value.passwordFirst != 
        this.resetPasswordForm.value.passwordSecond){
        alert('Not same!');
        return;
    }
    let stringObj: string;
    this.route.queryParams
      .subscribe(params => {
        stringObj = JSON.stringify(params);
        this.token = stringObj.substring(stringObj.indexOf('{"t":')+6, stringObj.indexOf('"email')).replace(`"`, '').replace(`,`, '')
        this.email = stringObj.substring(stringObj.indexOf('"email":')+9, stringObj.indexOf('"}')).replace(`"`, '')
        console.log(this.resetPasswordForm.value.passwordFirst);
        let givenToken = localStorage.getItem('token');
        if (givenToken){
          this.getDecodedAccessToken(givenToken);
        }
      }
    ); 
    if (this.email && this.resetPasswordForm.value.passwordFirst && this.token){
      this.resetedData.email = this.email;
      this.resetedData.password = this.resetPasswordForm.value.passwordFirst;
      this.resetedData.token = this.token
      let dta : string;
      this.us.effectChangePassword(this.resetedData).subscribe({
        next:(data) => {
          dta = JSON.stringify(data);
          console.log('next')
          this.infoOut = 'Your change passsword request is being processed. Please wait...'
        },
        complete: () =>{
          console.log(dta)
          
          this.infoOut = dta.substring(dta.indexOf('"result":')+9, dta.indexOf('"}')).replace(`"`, '')
        },
        error: (err) => {
        console.log(err)
        this.infoOut = err;
        }
      })    
    }
  }

  getDecodedAccessToken(token: string) {
    const helper = new JwtHelperService();
    console.log('Ex date: ', helper.getTokenExpirationDate(token))
    return  helper.decodeToken(token);
  }


}
