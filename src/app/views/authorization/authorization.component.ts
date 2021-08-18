import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FirebaseClientService } from './../../services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit {
  passwordVisible: boolean = false;
  userEmail!: string;
  userPassword!: string;
  usersArray: any[] = [];
  constructor(
    private firebase: FirebaseClientService,
    private router: Router,
    private sharedFunc: SharedFuncService
  ) {}

  ngOnInit(): void {
    if (this.sharedFunc.redirectAuth()) {
      this.firebase.getUser().subscribe((element) => {
        element.forEach((e: any) => {
          this.usersArray.push(e.payload.doc.data());
        });
      });
    }
  }
  logIn() {
    for (let i = 0; i < this.usersArray.length; i++) {
      if (
        this.usersArray[i].email == this.userEmail &&
        this.usersArray[i].password == this.userPassword
      ) {
        this.displayToast('Succesfully logined', 'success', 'green');
        this.uploadInLocalStorage(this.usersArray[i]);
        this.router.navigateByUrl('/');
        return;
      }
    }
    this.displayToast('Incorrect data', 'error', 'red');
    this.userPassword = '';
    this.userEmail = '';
  }
  displayToast(text: string, Icon: string, color: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: color,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: Icon as any,
      title: text,
    });
  }
  uploadInLocalStorage(array: any) {
    localStorage.setItem('UsersArray', JSON.stringify(array));
  }
  visible() {
    const input = document.getElementById('password');
    const eye = document.getElementById('eye');
    if (!this.passwordVisible) {
      this.passwordVisible = true;
      eye!.innerHTML = `<i class="far fa-eye"></i>`;
      input?.setAttribute('type', 'text');
    } else {
      this.passwordVisible = false;
      eye!.innerHTML = `<i class="far fa-eye-slash"></i>`;
      input?.setAttribute('type', 'password');
    }
  }
}
