import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { FirebaseClientService } from './../../services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  address: string = '';
  passwordVisible: boolean = false;
  user: User = new User('', '', 0, '', '', '', '', '');
  usersArray: any[] = [];
  constructor(
    private router: Router,
    private firebase: FirebaseClientService,
    private sharedFunc: SharedFuncService
  ) {}

  ngOnInit(): void {
    this.firebase.getUser().subscribe((element) => {
      element.forEach((e: any) => {
        this.usersArray.push(e.payload.doc.data());
      });
    });
    this.sharedFunc.getIp().subscribe((result: any) => {
      this.address = result.ip;
    });
  }
  createUser() {
    if (this.checkUserValid()) {
      this.firebase.createUser({
        name: this.user.name.toLowerCase(),
        lastname: this.user.lastname.toLowerCase(),
        age: this.user.age,
        gender: this.user.gender,
        email: this.user.email.toLowerCase(),
        password: this.user.password,
        image: this.user.img,
        type: this.user.type,
        address: this.address,
      });
    }
    this.user = new User('', '', 0, '', '', '', '', '');
  }
  async uploadPicture() {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result as any,
          imageAlt: 'The uploaded picture',
        });
        this.user.img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  checkUserValid() {
    let isValid = true;
    let emailRegister = true;
    this.usersArray.forEach((element) => {
      if (element.email == this.user.email) {
        emailRegister = false;
        isValid = false;
      }
    });
    if (emailRegister) {
      if (
        this.user.name != '' &&
        this.user.lastname != '' &&
        this.user.age >= 18 &&
        this.user.gender != '' &&
        this.user.email != '' &&
        this.user.password != '' &&
        this.user.type != ''
      ) {
        this.sharedFunc.displayToast('Name is acceptable', 'success', 'green');
        setTimeout(() => {
          this.sharedFunc.displayToast(
            'Lastname is acceptable',
            'success',
            'green'
          );
        }, 1500);
        setTimeout(() => {
          this.sharedFunc.displayToast('Age is acceptable', 'success', 'green');
        }, 3000);
        setTimeout(() => {
          this.sharedFunc.displayToast(
            'Gender is acceptable',
            'success',
            'green'
          );
        }, 4500);
        setTimeout(() => {
          this.sharedFunc.displayToast(
            'Account type is acceptable',
            'success',
            'green'
          );
        }, 6000);
        setTimeout(() => {
          this.sharedFunc.displayToast(
            'Email is acceptable',
            'success',
            'green'
          );
        }, 7500);
        setTimeout(() => {
          this.sharedFunc.displayToast(
            'Password is acceptable',
            'success',
            'green'
          );
        }, 9000);
        if (this.user.img == '') {
          setTimeout(() => {
            this.sharedFunc.displayToast(
              'Redirect to authorization page',
              'info',
              'blue'
            );
            this.router.navigateByUrl('/authorization');
          }, 10500);
        } else {
          setTimeout(() => {
            this.sharedFunc.displayToast(
              'Photo is acceptable',
              'success',
              'green'
            );
          }, 10500);
          setTimeout(() => {
            this.sharedFunc.displayToast(
              'Redirect to authorization page',
              'info',
              'blue'
            );
            this.router.navigateByUrl('/authorization');
          }, 11000);
        }
      } else {
        if (this.user.name == '') {
          isValid = false;
          this.sharedFunc.displayToast(
            "Name can't contain symbol or number or empty",
            'warning',
            'orange'
          );
        }
        if (this.user.lastname == '') {
          isValid = false;
          this.sharedFunc.displayToast(
            "Lastname can't contain symbol or number or empty",
            'warning',
            'orange'
          );
        }
        if (this.user.age < 18) {
          isValid = false;
          this.sharedFunc.displayToast(
            'You are underage :( comeback when u are 18',
            'warning',
            'orange'
          );
        }
        if (this.user.gender == '') {
          isValid = false;
          this.sharedFunc.displayToast(
            'We have only 2 option , choose biological one',
            'warning',
            'orange'
          );
        }
        if (this.user.email == '') {
          isValid = false;
          this.sharedFunc.displayToast(
            'Email is not valid',
            'warning',
            'orange'
          );
        }
        if (this.user.password == '') {
          isValid = false;
          this.sharedFunc.displayToast(
            "Password can't be empty",
            'warning',
            'orange'
          );
        }
        if (this.user.type == '') {
          isValid = false;
          this.sharedFunc.displayToast(
            'Account type must be choosed',
            'warning',
            'orange'
          );
        }
        isValid = false;
      }
    } else {
      this.sharedFunc.displayToast('Email already registered!', 'error', 'red');
    }
    return isValid;
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
