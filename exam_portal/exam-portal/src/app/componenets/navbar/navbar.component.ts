import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userActive = false;
  userName = null;

  constructor(public loginService: LoginService) {}
  ngOnInit(): void {


      this.userActive = this.loginService.isLogedIn();
      this.userName = this.loginService.getUser().userName;
      console.log("------insub-- " + this.userActive + " - " + this.userName);
      this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
        console.log("------insub " + this.userActive + " - " + this.userName);
        this.userActive = this.loginService.isLogedIn();
        this.userName = this.loginService.getUser().userName;
      });


  }


  logOut() {
    this.loginService.logOut();
    // this.userActive = false;
    // this.userName = null;
    window.location.reload();

  }
}
