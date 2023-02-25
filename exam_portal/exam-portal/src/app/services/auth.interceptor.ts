
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterCeptor implements HttpInterceptor {
  constructor(private login:LoginService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
       // Add the jwt token
    let authReq=req;
       const token=this.login.getToken();
       console.log("---ssinside interface");
    if (token!=null) {
      console.log("----- tok/"+token)
      authReq=authReq.clone({setHeaders:{Authorization: `Bearer ${token}`}});
    }
    return next.handle(authReq);
   }

  }
export const authInterceptorProviders=[
  // {
  //   provide:HTTP_INTERCEPTORS,
  //   userClass:AuthInterCeptor,
  //   multi:true,
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterCeptor,
     multi: true }
];
