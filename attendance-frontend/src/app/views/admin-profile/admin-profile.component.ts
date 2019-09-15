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
  data:object={};
  selectedFile: File

  ngOnInit() {
    this.getUserProfile()
  }

  getUserProfile(){
    this.commonService.getRequest("admin/profile").subscribe(res=>{
      this.data=res.data;
    },error=>{
      this.spinnerService.errorSwal(error.error);
    })
  }

  // function to validate user image...

  validateUserImage(img){
    var error={};
    var allowedFormats=['image/jpeg','image/png','image/jpg'];

    if(this.selectedFile.size > 5*1024*1024*1024){
      error['message']="Image size should not exceed 5 MB";
    }
    if(!allowedFormats.includes(this.selectedFile.type)){
      error['message']="Only jpeg,jpg and png formats allowed";
    }
    if(Object.entries(error).length !== 0){
      this.spinnerService.errorSwal(error);
      return false;
    }
    else{
      return true;
    }
  }

// function to show the preview of image...

  userImage(event){
    this.selectedFile = event.target.files[0];

    if(this.validateUserImage(this.selectedFile)){
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e?:object) {
          document.getElementById("image").setAttribute('src',e['target']['result']);
        }
        reader.readAsDataURL(event.target.files[0]);
    }
   
    }
  }

  // function to update the profile...

  updateProfile(){
    if(this.validateUserImage(this.selectedFile)){
      var user_data=localStorage.getItem('user');
      var data=JSON.parse(user_data);
      data.name=this.data['name'];

      var fd=new FormData();
      // var data=JSON.stringify(this.data);
  
      // fd.append('data',data);
      fd.append('id',this.data['id']);
      fd.append('name',this.data['name']);
      fd.append('email',this.data['email']);
  
      fd.append('userImage', this.selectedFile, this.selectedFile.name);
  
      this.commonService.postRequest(fd,"admin/updateProfile").subscribe(res=>{
        if(res.status===200){
          this.spinnerService.successSwal(res);
          data.image=res.image;
          this.getUserProfile();
          localStorage.setItem('user',JSON.stringify(data));
        }
      },error=>{
        this.spinnerService.errorSwal(error.error);
      })
    }
   
  }
}
