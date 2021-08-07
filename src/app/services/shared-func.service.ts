import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SharedFuncService {
  constructor() {}
  displayToast(text: string, Icon: string, color: string, time: number = 1500) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: color,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: Icon as any,
      title: text,
    });
  }
}
