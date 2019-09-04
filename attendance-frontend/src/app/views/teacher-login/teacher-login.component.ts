import { Component, OnInit } from "@angular/core";
import { TeacherLoginInterface } from "./../../interfaces/teacher_login_interface";
import { SpinnerService } from "../../services/spinner.service";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: "app-teacher-login",
  templateUrl: "./teacher-login.component.html",
  styleUrls: ["./teacher-login.component.css"]
})
export class TeacherLoginComponent implements OnInit {
  teacherModel = {} as TeacherLoginInterface;
  constructor(private spinnerService: SpinnerService,private router:ActivatedRoute,
    private commonService:CommonService,private route:Router) {}

  ngOnInit() {
   

  }

  teacherLogin() {
    this.spinnerService.showSpinner();
    if(this.router.snapshot.paramMap.get('token')){
      const token=this.router.snapshot.paramMap.get('token');
      this.teacherModel.verify_token=token;
      this.login(this.teacherModel);
    }
    else{
      this.login(this.teacherModel);
    }
  }

  login(data:object){
    this.commonService.postRequest(data,"teacher/login").subscribe(res=>{
      this.spinnerService.hideSpinner();
      if(res.status===200){
        this.spinnerService.successSwal(res);
        var user_data = JSON.stringify({
          name: res.data.name,
          type: res.data.type,
          id:res.data.id,
        });
        localStorage.setItem("user", user_data);
        localStorage.setItem("token",res.authorization);        
        this.route.navigateByUrl('teacher/dashboard');
      }
      else{
        this.spinnerService.errorSwal(res);
      }
    },error=>{
      this.spinnerService.hideSpinner();
      this.spinnerService.errorSwal(error.error);
    })
  }
  
}
