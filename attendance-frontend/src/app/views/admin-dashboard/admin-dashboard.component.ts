import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { CommonService } from "src/app/services/common/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}
  user: Object;

  ngOnInit() {
  }

  // logout() {
  //   this.spinnerService.showSpinner();

  //   this.commonService.getRequest().subscribe(
  //     res => {
  //       if (res.status === 200) {
  //         this.spinnerService.hideSpinner();
  //         this.router.navigateByUrl("/admin/login");
  //       } else {
  //         console.log("Internal server error");
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
