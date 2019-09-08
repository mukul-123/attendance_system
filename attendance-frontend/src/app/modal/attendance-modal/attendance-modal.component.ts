import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common/common.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.css']
})
export class AttendanceModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private commonService:CommonService,
    private spinnerService:SpinnerService) { }
  id:number;
  students=[];
  attendance=[];
  student_attendance=[];

  ngOnInit() {
    this.getStudentsForAttendance(this.id);
  }

  getStudentsForAttendance(id:number){
    const param={id:id,method:'getStudentsForAttendance'};
    this.commonService.getRequestWithParameters('admin/getAttendanceByClass',param).subscribe(res=>{
      if(res.status===200){
        this.students=res.data;
      }
    },error=>{
      console.log(error);
    })
  }

  studentAttendance(){
    if(this.attendance.length>0){
      let len=this.students.length;
      if(localStorage.getItem('user')){
        var user_data=JSON.parse(localStorage.getItem('user'));
        var id=user_data.id;
      }
      this.student_attendance=[];
      for(var i=0;i<len;i++){
        this.student_attendance.push(
          {grade_id:this.id,teacher_id:id,student_id:this.students[i].id,availability:''+this.attendance[i]+''}
          );
      }
      this.commonService.postRequest(this.student_attendance,'admin/studentAttendance').subscribe(res=>{
        if(res.status===200){
          this.spinnerService.successSwal(res);
          this.activeModal.close();
        }
      },error=>{
        this.spinnerService.errorSwal(error);
      })

      // console.log(this.student_attendance);
    }
  } 

}
