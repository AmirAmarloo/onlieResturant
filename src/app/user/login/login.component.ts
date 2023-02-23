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
    let res : Users;
    let innerUserCat: number = -1;
    this.us.loginUser(this.loginForm.value).subscribe({
      next: (data) => { 
         res = data;
        
        console.log('result: ', data);
        // console.log('data: ', data);
        //   for (let i of data){
          //     console.log('sssssss : ', i);
          //  }
          console.log('test........')
          
        },
        complete: () => {let mn:string = 'name';
                       console.log('res: ', res)
                       console.log('res.name: ', res.name);
                       let aaa = JSON.stringify(res);
                       console.log('length: ' , aaa.length)
                       if (aaa.length > 190){
                         console.log(aaa);
                         console.log('name: ',  aaa.substring(aaa.indexOf('name')+5, aaa.indexOf(',"id":')-1).replace(`"`, '').replace(':', ''));
                         console.log('family: ',  aaa.substring(aaa.indexOf('family')+7, aaa.indexOf('category')-3).replace(`"`, '').replace(':', ''));
                         console.log('status: ',  aaa.substring(aaa.indexOf('"status":')+10, aaa.indexOf(',"token":')-3).replace(`"`, '').replace(':', ''));
                         console.log('category: ',  aaa.substring(aaa.indexOf('"category":')+12, aaa.indexOf(',"email"')-3).replace(`"`, '').replace(':', ''));
                         console.log('email: ',  aaa.substring(aaa.indexOf('"email":')+9, aaa.indexOf(',"status"')).replace(`"`, '').replace(':', ''));
                         //{t: 'e7af3224-9685-11ed-8eb6-98fa9b778764'}
                         let token = aaa.substring(aaa.indexOf('"token":')+9, aaa.indexOf('}]')).replace(`"`, '').replace(':', '')
                         
                         console.log('token: ',  aaa.substring(aaa.indexOf('"token":')+9, aaa.indexOf('}]')).replace(`"`, '').replace(':', ''));
                         innerUserCat = parseInt(aaa.substring(aaa.indexOf('"category":')+12, aaa.indexOf(',"email"')-3).replace(`"`, '').replace(':', ''));
                         console.log('innerCategory: ' + innerUserCat);
                       //  this.route.config[0] = {path: 'login', component: LoginComponent}
                         console.log(this.route.config)
                         this.canLogin = ''
                         let decToken = this.getDecodedAccessToken(token);                         
                         console.log('Category:', decToken.category)
                         this.sendMessage(decToken.category);
                         localStorage.setItem('user-level', decToken.category);
                         localStorage.setItem('userId', aaa.substring(aaa.indexOf('"id":')+5, aaa.indexOf(',"family":')).replace(`"`, '').replace(':', ''));
                       }
                       else
                       {
                        localStorage.setItem('user-level', '0');
                        this.sendMessage('0');
                        this.canLogin = 'Invalid username or password';
                       }
                      },
      error: (err) => {console.log(err)}
    })
    console.log('After service calling.');

    // if (innerUserCat === 5){
      console.log(this.route.config[0])
    // }
        
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
