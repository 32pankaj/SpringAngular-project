import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:any;
  constructor(private loginService:LoginService){}
  ngOnInit(): void {
      this.user=this.loginService.getUser();
      // this.user=this.loginService.getCurrentUser().subscribe((data)=>{
      //   this.user=data;
      // },
      // (error)=>{
      //   alert('error');
      // });
  }
  getColor(){
    if (this.user.enabled) {
      return "forestgreen";
    } else {
      return  "red";

    }

  }
}
