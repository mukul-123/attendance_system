import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common/common.service";
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: "app-teacher-list",
  templateUrl: "./teacher-list.component.html",
  styleUrls: ["./teacher-list.component.css"]
})
export class TeacherListComponent implements OnInit {
  constructor(private commonService: CommonService,private spinnerService:SpinnerService) {}
  config = {};
  teachers = {};
  ngOnInit() {
    this.getAllTeachers(1);
  }

  getAllTeachers(page: number) {
    const data = { page: page };

    this.commonService
      .getRequestWithParameters("admin/getAllTeachers", data)
      .subscribe(
        res => {
          if (res.status === 200) {
            this.teachers = res.data;
            this.config = {
              currentPage: res.data["current_page"],
              itemsPerPage: res.data["per_page"],
              totalItems: res.data["total"]
            };
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  removeTeacher(id:number){
    Swal.fire({
      title: "Are you sure you want to delete",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        const param={id:id};
        this.commonService.getRequestWithParameters('admin/removeTeacher',param).subscribe(res=>{
          if(res.status===200){
            this.spinnerService.successSwal(res);
            this.getAllTeachers(1);
          } else{
            this.spinnerService.errorSwal(res);
          }
        },error=>{
          this.spinnerService.errorSwal(error.error);
        })
      }
    });
  }
}
