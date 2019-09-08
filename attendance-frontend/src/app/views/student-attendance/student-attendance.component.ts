import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common/common.service";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AttendanceModalComponent } from "src/app/modal/attendance-modal/attendance-modal.component";
import { SpinnerService } from "src/app/services/spinner.service";

@Component({
  selector: "app-student-attendance",
  templateUrl: "./student-attendance.component.html",
  styleUrls: ["./student-attendance.component.css"]
})
export class StudentAttendanceComponent implements OnInit {
  classes = [];
  method: string;
  attendances = {};
  clas_id: number;
  config = {};

  constructor(
    private commonService: CommonService,
    private modalService: NgbModal,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.method = "Select the class you want to view attendance";
    this.getAllClasses();
  }

  getAllClasses() {
    const param = { method: "getClassesForStudent" };
    this.commonService
      .getRequestWithParameters("admin/getAllClasses", param)
      .subscribe(
        res => {
          if (res.status === 200) {
            this.classes = res.class;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  classChange(page, event) {
    if (event !== '') {
      this.clas_id = event.target.value;
    }
    if (this.clas_id == 0) {
      Swal.fire({
        title: "Please select the class",
        type: "warning"
      });
    } else {
      const data = {
        id: this.clas_id,
        method: "getStudentAttendance",
        page: page
      };
      this.commonService
        .getRequestWithParameters("admin/getAttendanceByClass", data)
        .subscribe(
          res => {
            if (res.status === 200) {
              this.config = {
                currentPage: res.data["current_page"],
                itemsPerPage: res.data["per_page"],
                totalItems: res.data["total"]
              };
              this.method = "Attendance of " + " class";
              this.attendances = res.data;
            }
          },
          error => {
            this.spinnerService.errorSwal(error.error);
          }
        );
    }
  }

  giveAttendance() {
    const param={id:this.clas_id};
    this.commonService.getRequestWithParameters("admin/checkAttendance",param).subscribe(res=>{
      if(res.status===200 && res.marked===false){
        this.modalService.open(AttendanceModalComponent, {
          ariaLabelledBy: "modal-basic-title"
        }).componentInstance.id = this.clas_id;
      }
      else{
        this.spinnerService.errorSwal(res);
      }
    },error=>{
      this.spinnerService.errorSwal(error);
    })
   
  }
}
