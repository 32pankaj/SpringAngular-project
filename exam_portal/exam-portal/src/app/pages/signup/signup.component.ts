import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService , private snack:MatSnackBar) {

  }
  ngOnInit(): void {

  }


  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',

  };
  formSubmit(){

    console.log(this.user);
    if (this.user.userName==''||this.user.userName==null) {
//      alert("user is required");
      this.snack.open("User name is required",'',{duration:3000});

      return;
    }

    // adduser:userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //succes
        console.log(data);
        //clear
        this.resetUser();

        // alert('success')
        Swal.fire('Sucessfull Registered','User id is '+data.id,'success')
      },
      (error)=>{
        //error
        console.log(error);
        this.resetUser();
        alert("User already exist");
      }
    )
  }

   resetUser(){
    this.user={
      userName:'',
      password:'',
      firstName:'',
      lastName:'',
      email:'',
      phone:'',

    };
   }



}
