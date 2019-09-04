import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(private commonService:CommonService,private spinnerService:SpinnerService) { }

  ngOnInit() {
    this.getUserProfile()
  }

  getUserProfile(){
    this.commonService.getRequest("admin/profile").subscribe(res=>{
      console.log(res.data);
    },error=>{
      this.spinnerService.errorSwal(error.error);
    })
  }
}
