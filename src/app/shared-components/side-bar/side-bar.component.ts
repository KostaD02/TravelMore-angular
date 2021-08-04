import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user-model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  myUser: User = new User('Guest', '', 0, '', '', '', '', '');
  userType!: string;
  userFromData: any;
  constructor() {}

  ngOnInit(): void {
    if (localStorage.length > 0) {
      let getUser = JSON.parse(localStorage.getItem('UsersArray') as any);
      if (getUser.type == 'admin') {
        this.userType = 'admin';
        this.myUser = new User(
          getUser.name,
          getUser.lastname,
          getUser.age,
          getUser.email,
          getUser.gender,
          getUser.password,
          getUser.image,
          getUser.type
        );
      } else if (getUser.type == 'hotel') {
        this.userType = 'hotel';
        this.myUser = new User(
          getUser.name,
          getUser.lastname,
          getUser.age,
          getUser.email,
          getUser.gender,
          getUser.password,
          getUser.image,
          getUser.type
        );
      } else {
        this.userType = 'guest';
      }
    } else {
      this.userType = 'guest';
    }
  }
  socialMediaClick() {
    Swal.fire({
      title: '<strong>Our Social Medias</strong>',
      icon: 'info',
      html:
        '<b style="color:blue"> <i class="fab fa-facebook-f"> </i></b><a href="https://www.facebook.com" style="text-decoration:none;color:black"> Facebook</a> <b style="color:white">...</b>' +
        '<b style="color:purple"> <i class="fab fa-instagram"> </i></b><a href="https://www.instagram.com" style="text-decoration:none;color:black"> Instagram</a>  <b style="color:white">...</b>' +
        '<b style="color:cyan"> <i class="fab fa-twitter"> </i></b><a href="https://www.twitter.com" style="text-decoration:none;color:black"> Twitter</a>   ',
    });
  }
  logOut() {
    window.localStorage.clear();
    window.location.reload();
  }
}
