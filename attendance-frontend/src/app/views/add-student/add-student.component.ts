import { Component, OnInit, ViewChild } from "@angular/core";
import { StudentInterface } from "src/app/interfaces/student_reg_interface";
import { CommonService } from "src/app/services/common/common.service";
import { SpinnerService } from 'src/app/services/spinner.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent implements OnInit {
  constructor(private commonService: CommonService,private spinnerService:SpinnerService) {}
  @ViewChild('student_registration') form:NgForm;

  public student = {} as StudentInterface;
  classes = [];

  ngOnInit() {
    this.getAllClasses();
  }

  studentRegister() {
    this.spinnerService.showSpinner();
    this.commonService.postRequest(this.student, "admin/studentRegister")
    .subscribe(res=>{
      if(res.status===200){
          this.spinnerService.hideSpinner();
          this.spinnerService.successSwal(res);    
           this.form.reset();
      }
    },error=>{
      this.spinnerService.errorSwal(error);
    });
  }

  getAllClasses() {
    const param={method:'getClassesForStudent'};

    this.commonService.getRequestWithParameters("admin/getAllClasses",param).subscribe(
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
}
