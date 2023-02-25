import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){}
  loginData={
    userName:'',
    password:''
  }

  ngOnInit(): void {

  }
  formSubmit()
  {
    console.log('login btton click')
    if (this.loginData.userName.trim()=='' || this.loginData.userName==null) {
    this.snack.open('User Name Required !!','',{duration:3000});
    return;

    }
     if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('Password is required','',{duration:3000})
      return;
    }

   // Request to Server to request Tocken
    this.login.generateToken(this.loginData).subscribe((data:any)=>{
      console.log('sucess');
      console.log(data);


      //Log In
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe((user:any)=>{
          this.login.setUser(user);
          console.log(user);

          if (this.login.getUserRole()=='ADMIN')
           {
            //redirect user ....Admin:admin-dashboard
           // window.location.href='/admin';
           this.login.loginStatusSubject.next(true);
           this.router.navigate(['admin']);

          }
          else if (this.login.getUserRole()=='NORMAL')
          {
            //redirect user .... Normal: normal-dashboard
            // window.location.href='/user';
            alert("login start");
            this.login.loginStatusSubject.next(true);
            this.router.navigate(['user']);
            alert("login end");

          }
          else
           {
            this.login.logOut();
          }



      })


    },(error:Error)=>{
      console.log('Login failed');
      console.log(error);
      this.loginData.userName='';
      this.loginData.password='';
      this.snack.open('Invalid crediential','',{duration:3000})
    }

    );

  }

}
