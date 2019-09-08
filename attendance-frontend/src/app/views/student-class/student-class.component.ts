import { Component, OnInit,HostListener } from "@angular/core";
import { CommonService } from "src/app/services/common/common.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: "app-student-class",
  templateUrl: "./student-class.component.html",
  styleUrls: ["./student-class.component.css"]
})
export class StudentClassComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private spinnerService:SpinnerService,
    private router: ActivatedRoute
  ) {}

  students = [];
  config = {};
  class_id: number;
  grade:string;
  isVerify:boolean=false;
  loading:boolean;
  verify_code:String;

  ngOnInit() {
  this.getClassIdFromUrl();
  }

  getClassIdFromUrl(){
    const class_id = this.router.snapshot.paramMap.get("class_id");
    var id = atob(class_id);
    this.studentByClass(id, 1);
  }
 

  studentByClass(class_id, page: number) {
    this.isVerify=false;
    this.class_id = class_id;
    const grade = { class: this.class_id, page: page };

    this.commonService
      .getRequestWithParameters("admin/view_students", grade)
      .subscribe(
        res => {
          if (res.status === 200) {
            var stu_list="List of students";
            this.students = res.data;
            this.grade=res.class.name;
            this.config = {
              currentPage: this.students["current_page"],
              itemsPerPage: this.students["per_page"],
              totalItems: this.students["total"]
            };
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  pageChange(page) {
    this.studentByClass(this.class_id, page);
  }

  changeHtml(id:number){
    this.isVerify=true;
  }
  cancelVerify(){
    this.isVerify=false;
  }

  verifyStudent(id){
    const data={s_id:id,code:this.verify_code};
    this.commonService.getRequestWithParameters('admin/student_verify',data).subscribe(res=>{
      if(res.status===200){
        this.getClassIdFromUrl();
      }
      else{
        this.spinnerService.errorSwal(res);
      }
    },error=>{
      this.spinnerService.errorSwal(error.error);
    })
  }
}
