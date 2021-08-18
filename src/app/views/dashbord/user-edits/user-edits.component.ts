import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edits',
  templateUrl: './user-edits.component.html',
  styleUrls: ['./user-edits.component.css'],
})
export class UserEditsComponent implements OnInit {
  constructor(
    private sharedFunc: SharedFuncService,
    private firebase: FirebaseClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  loader: boolean = false;
  secureUpdate: boolean = true;
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
    this.sharedFunc.redirectUnauth();
    this.route.params.subscribe((params: Params) => {
      this.key = params.key;
    });
    this.firebase
      .getDocument('user-collection', this.key)
      .subscribe((element) => {
        this.currentUser = element.payload.data();
      });
    setTimeout(() => {
      this.loader = true;
      this.updateStaticData();
    }, 1000);
  }
  updateStaticData() {
    this.age = this.currentUser.age;
    this.name = this.currentUser.name;
    this.lastname = this.currentUser.lastname;
    this.email = this.currentUser.email;
    this.gender = this.currentUser.gender;
    this.type = this.currentUser.type;
    this.image = this.currentUser.image;
    this.oldPassword = this.currentUser.password;
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
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
          localStorage['needReload'] = '1';
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
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
          localStorage['needReload'] = '1';
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
}
