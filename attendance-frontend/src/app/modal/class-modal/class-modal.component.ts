import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ClassInterface } from 'src/app/interfaces/class_interface';
import { CommonService } from 'src/app/services/common/common.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-class-modal",
  templateUrl: "./class-modal.component.html",
  styleUrls: ["./class-modal.component.css"]
})
export class ClassModalComponent implements OnInit {
  class={} as ClassInterface;
  selectedClass = [];
  dropdownList = [];
  dropdownSettings = {};


  constructor(public activeModal: NgbActiveModal,public commonService:CommonService,
    public spinnerService:SpinnerService) {}

  ngOnInit() {
    this.dropdownList = [
      { id: 1, section: 'A' },
      { id: 2, section: 'B' },
      { id: 3, section: 'C' },
    ];

 
    this.dropdownSettings = {
      idField: 'id',
      textField: 'section',
      itemsShowLimit: 3,
    };
  }

  
  addClass() {
    this.spinnerService.showSpinner();
    if(this.class.check){
      this.class.section.forEach(element => {
        this.selectedClass.push({name:this.class.class_name + element['section']});
      });
    } 
    else{
      this.selectedClass.push({name:this.class.class_name});
    }
      this.commonService.postRequest(this.selectedClass,"admin/addClass")
      .subscribe(res=>{
        if(res.status===200){
          this.spinnerService.hideSpinner();
          this.activeModal.close();
      }
      },error=>{
        console.log(error);
      })
    }
}
