import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/admin/dashboard");
    } else{
      return true
    }
  }

  getToken(){
    if(localStorage.getItem('token')){
      let tok=localStorage.getItem('token');
        return tok;
    } else{
      return 0;
    }
  }

}
