import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.css']
})
export class AttendanceModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private commonService:CommonService) { }
  id:number;
  students=[];
  attendance_val=[];
  ngOnInit() {
    this.getStudentsForAttendance(this.id);
  }

  getStudentsForAttendance(id:number){
    const param={id:id,method:'getStudentsForAttendance'};
    this.commonService.getRequestWithParameters('admin/getAttendanceByClass',param).subscribe(res=>{
      if(res.status===200){
        this.students=res.data;
        console.log(res.data);
      }
    },error=>{
      console.log(error);
    })
  }

  studentAttendance(){
    console.log(this.attendance_val);
  }


  attendance(){

  }

}
