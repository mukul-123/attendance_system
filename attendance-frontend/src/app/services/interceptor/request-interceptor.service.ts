import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpResponse, HttpEvent } from "@angular/common/http";
import { headersToString } from "selenium-webdriver/http";
import { AuthService } from "../auth.service";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req, next) {
    let tok = this.authService.getToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: "Bearer " + tok,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization"
      }
    });

    return next.handle(tokenizedReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl("admin/login");
        }
      })
    );
  }
}
