import { Component, OnInit } from '@angular/core';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { FirebaseClientService } from './../../services/firebase-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private sharedFunc: SharedFuncService,
    private firebase: FirebaseClientService,
    private router: Router
  ) {}
  secureUpdate: boolean = true;
  keysArray: any = [];
  usersArray: any = [];
  key: string = '';
  currentUser: any = [];
  image: string = '';
  age: string = '';
  gender: string = '';
  name: string = '';
  lastname: string = '';
  type: string = '';
  email: string = '';
  newPassword: string = '';
  oldPassword: string = '';
  ngOnInit(): void {
    if (this.sharedFunc.redirectUnauth()) {
      let data = localStorage['UsersArray'];
      this.currentUser = JSON.parse(data);
      this.updateStaticData();
      this.firebase.getUser().subscribe((element) => {
        element.forEach((e: any) => {
          this.usersArray.push(e.payload.doc.data());
          this.keysArray.push(e.payload.doc.id);
        });
      });
      setTimeout(() => {
        this.takeCurrentKey();
      }, 1000);
    }
  }
  updateUser(form: NgForm) {
    let data = form.value;
    let newData = [];
    if (data.oldPassword == this.currentUser.password) {
      if (data.newPassword == '') {
        this.secureUpdate = false;
        newData = data;
        newData.password = newData.oldPassword;
        delete newData.newPassword;
        delete newData.oldPassword;
        newData.image = this.image;
        this.sharedFunc.displayToast(
          'User successfully updated',
          'success',
          'green'
        );
        this.firebase.editUsers(newData, this.key);
        localStorage['UsersArray'] = JSON.stringify(newData);
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1400);
      } else {
        this.secureUpdate = false;
        newData = data;
        newData.password = newData.newPassword;
        delete newData.newPassword;
        delete newData.oldPassword;
        newData.image = this.image;
        this.sharedFunc.displayToast(
          'User successfully updated',
          'success',
          'green'
        );
        this.firebase.editUsers(newData, this.key);
        localStorage['UsersArray'] = JSON.stringify(newData);
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1400);
      }
    } else {
      this.sharedFunc.displayToast('Wrong data', 'danger', 'red');
      this.age = this.currentUser.age;
      this.name = this.currentUser.name;
      this.lastname = this.currentUser.lastname;
      this.email = this.currentUser.email;
      this.gender = this.currentUser.gender;
      this.type = this.currentUser.type;
    }
  }
  updateStaticData() {
    this.age = this.currentUser.age;
    this.name = this.currentUser.name;
    this.lastname = this.currentUser.lastname;
    this.email = this.currentUser.email;
    this.gender = this.currentUser.gender;
    this.type = this.currentUser.type;
    this.image = this.currentUser.image;
  }
  async updatePicture() {
    let image = '';
    let uploaded = false;
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
          title: 'Your uploaded hotel picture',
          imageUrl: e.target.result as any,
          imageAlt: 'The uploaded picture',
        });
        image = e.target.result;
        this.image = image;
      };
      uploaded = true;
      reader.readAsDataURL(file);
    }
  }
  takeCurrentKey() {
    for (let i = 0; i < this.keysArray.length; i++) {
      this.firebase
        .getDocument('user-collection', this.keysArray[i])
        .subscribe((e) => {
          let data = e.payload.data() as any;
          if (data.email == this.email) {
            this.key = e.payload.id;
          }
        });
    }
  }
}
