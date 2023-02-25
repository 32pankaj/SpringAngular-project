import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
public loginStatusSubject=new Subject<boolean>();
  constructor(private http:HttpClient,private  router:Router) {


   }

   public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
   }
//Generate token
   public generateToken(loginData:any){
      return this.http.post(`${baseUrl}/generate-token`,loginData)
   }


   // login user
   public loginUser(token:any){
    localStorage.setItem('token',token);
    //this.loginStatusSubject.next(true);
    return true;
   }
   // Is Login : User is login in or not
   public isLogedIn()
   {
    let tokenString=localStorage.getItem('token');

    if(tokenString==undefined||tokenString==''||tokenString==null){
      console.log("------ this is loging out");
      return false;
    }else
    return true;
   }

   //log out user: remove token from storage
   public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return true;
   }

   //get token
   public getToken(){
    return localStorage.getItem('token');
   }
   // set User detail
   public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
   }
   // get User
   public getUser(){
    let userStr=localStorage.getItem('user');
    if (userStr!=null) {
      return JSON.parse(userStr);

    } else {
      this.logOut();
      return null;
    }
   }
   // get User role
   public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
  //is user expired
  public isExpired()
  {
    if (localStorage.getItem('user')==''||
        localStorage.getItem('user')==null||
        localStorage.getItem('token')==''||
        localStorage.getItem('token')==null) {
          this.router.navigate(['login']);
          return;


    }
  }
}
