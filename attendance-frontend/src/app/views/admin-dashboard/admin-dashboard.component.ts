import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { CommonService } from "src/app/services/common/common.service";
import { Router } from "@angular/router";
import * as CanvasJS from '../../../../node_modules/canvasjs/dist/canvasjs.min.js';

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
  grade_attendance=[];
  data={};

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.adminDashboard();
  }

  // function to view the attendance chart...
  viewChart(){
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Attendance graph of students"
      },
      data: [{
        type: "column",
        dataPoints:this.grade_attendance
      }]
    });  
    chart.render();
      }

    // function to get admin dashboard...
      adminDashboard(){
          this.commonService.getRequest("admin/dashboard").subscribe(
            res => {
              if (res.status === 200) {
               this.grade_attendance=res.data.grade_attendance;
               this.viewChart();
               this.data=res.data;
               this.spinnerService.hideSpinner();
              } else {
                console.log("Internal server error");
              }
            },
            error => {
              console.log(error);
            }
          );
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
