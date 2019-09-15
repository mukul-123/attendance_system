import { Component, OnInit } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminLoginInterface } from "./../../interfaces/admin_login_interface";
import { SpinnerService } from "../../services/spinner.service";
import { CommonService } from "./../../services/common/common.service";
import { map } from "rxjs/operators";
import {Routes,RouterModule, Router} from '@angular/router';

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"]
})
export class AdminLoginComponent implements OnInit {
  public adminModel = {} as AdminLoginInterface;

  constructor(
    private spinnerService: SpinnerService,
    private commonService: CommonService,private router:Router
  ) {}

  ngOnInit() {}

  adminLogin() {
    this.spinnerService.showSpinner();
    this.commonService
      .postRequest(this.adminModel,"admin/login").
        subscribe((res) => {
          this.spinnerService.hideSpinner();
          if(res.status===200){
            var user_data = JSON.stringify({
              name: res.data.name,
              type: res.data.type,
              id:res.data.id,
              image:res.data.image
            });
            localStorage.setItem("user", user_data);
            localStorage.setItem("token",res.authorization);
            this.router.navigateByUrl('/admin/dashboard');
            // redirect to admin login page...
          } else{
            this.spinnerService.errorSwal(res);
            }
          },error=>{
            this.spinnerService.hideSpinner();
            this.spinnerService.errorSwal(error.error);
          })
  }
}
