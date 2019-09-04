import { Component, OnInit } from "@angular/core";
import { TeacherRegisterInterface } from "src/app/interfaces/teacher_reg_interface";
import { CommonService } from "src/app/services/common/common.service";
import { SpinnerService } from "src/app/services/spinner.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.component.css"]
})
export class AddTeacherComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  teacher = {} as TeacherRegisterInterface;
  grades = [];

  ngOnInit() {
    this.getAllClasses();
  }

  getAllClasses() {
    const param = { method: "getClassesForTeacher" };
    this.commonService
      .getRequestWithParameters("admin/getAllClasses", param)
      .subscribe(
        res => {
          if (res.status === 200) {
            this.grades = res;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  teacherRegister() {
    this.spinnerService.showSpinner();
    const data = this.teacher;
    // console.log(data);
    this.commonService.postRequest(data, "admin/addTeacher").subscribe(
      res => {
        this.spinnerService.hideSpinner();
        if (res.status === 200) {
          this.spinnerService.successSwal(res);
          setTimeout(() => {
            this.router.navigateByUrl("/admin/teachers");
          }, 1000);
        }
      },
      error => {
        this.spinnerService.hideSpinner();
        this.spinnerService.errorSwal(error.error);
      }
    );
  }
}
