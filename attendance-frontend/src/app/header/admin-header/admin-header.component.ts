import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common/common.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ClassModalComponent } from "../../modal/class-modal/class-modal.component";
import Swal from 'sweetalert2';

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.css"]
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private spinnerService: SpinnerService,
    private router: Router,
   
  ) {}

  user: Object={};

  ngOnInit() {
    var user_data = localStorage.getItem("user");
    this.user = JSON.parse(user_data);
  }

  
  logout() {
    Swal.fire({
      title: "Are you sure you want to logout",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.value) {
        this.commonService.getRequest("admin/logout").subscribe(
          res => {
            if (res.status === 200) {
              localStorage.clear();
              this.router.navigateByUrl("admin/login");
            } else {
              console.log("Internal server error");
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }
}
