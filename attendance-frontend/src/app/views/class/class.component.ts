import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common/common.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClassModalComponent } from "src/app/modal/class-modal/class-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.css"]
})
export class ClassComponent implements OnInit {
  class = [];
  config = {};

  constructor(
    private commonService: CommonService,
    private modalService: NgbModal,
    private router: Router,
    private spinnerService:SpinnerService
  ) {}

  ngOnInit() {
    this.getClasses(1);
  }

  addClass() {
    this.modalService
      .open(ClassModalComponent, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        // closed reason after button click
        result => {
          this.getClasses(1);
        },
        // closed reason when modal closes by closed icon
        reason => {}
      );
  }
  
  getClasses(page: number) {
    const param={page:page};
    this.commonService.getRequestWithParameters("admin/classes", param).subscribe(
      res => {
        if (res.status === 200) {
          this.class = res.class;
          this.config = {
            currentPage: this.class["current_page"],
            itemsPerPage: this.class["per_page"],
            totalItems: this.class["total"]
          };
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  removeClass(class_id: number) {
    Swal.fire({
      title: "Are you sure",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        const c_id={id:class_id};
        this.commonService.getRequestWithParameters("admin/removeClass",c_id).subscribe(
          res => {
            if (res.status === 200) {
              this.spinnerService.successSwal(res);
              this.getClasses(1);
            }
          },
          error => {
            this.spinnerService.errorSwal(error);
          }
        );
      }
    });
  }

  viewStudents(class_id, page: number) {
    this.router.navigateByUrl("/admin/student_class/" + btoa(class_id));
  }
}
