import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from '../../../_services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resultStr: string = '';
  resetPasswordForm! : FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private us: userService){}

  ngOnInit(): void{
    this.createForm();
  }

  createForm(){
    this.resetPasswordForm = this.fb.group({
      email : ['', Validators.required]
    })
  }

  onSubmit(){
    this.resultStr = 'Email is sentding...'
    this.us.resetpassword(this.resetPasswordForm.value.email).subscribe({
      next: (data) => {
        console.log(data)
      },
      complete:() => {
        this.resultStr = 'Email sent.'
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
