import { Injectable } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import Swal from 'sweetalert2';
@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  constructor(private spinnerService: Ng4LoadingSpinnerService) {}

  public showSpinner() {
    this.spinnerService.show();
  }
  public hideSpinner() {
    this.spinnerService.hide();
  }

  successSwal(text) {
    Swal.fire({
      title: text.message,
      type: "success"
    });
  }

  errorSwal(text){
    Swal.fire({
      title: text.message,
      type: "error"
    });
  }
}
