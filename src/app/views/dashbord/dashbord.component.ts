import { Component, OnInit } from '@angular/core';
import { FirebaseClientService } from './../../services/firebase-client.service';
import { SharedFuncService } from './../../services/shared-func.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  loaded: boolean = false;
  users = true;
  hotels: boolean = false;
  mesasges: boolean = false;
  usersArray: any = [];
  hotelsArray: any = [];
  messagesArray: any = [];
  constructor(
    private firebase: FirebaseClientService,
    private sharedFunc: SharedFuncService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage['needReload'] == '1') {
      localStorage.removeItem('needReload');
      window.location.reload();
    }
    if (this.sharedFunc.redirectAdmin()) {
      this.getEverything();
      setTimeout(() => {
        this.loaded = true;
        // console.log('users', this.usersArray);
        // console.log('hotels', this.hotelsArray);
        console.log('messages', this.messagesArray);
      }, 1500);
    }
  }
  chooseOption(option: string) {
    if (option == 'users') {
      document.getElementById('left')?.classList.add('active');
      this.users = true;
      this.hotels = false;
      this.mesasges = false;
      document.getElementById('middle')?.classList.remove('active');
      document.getElementById('rigth')?.classList.remove('active');
    } else if (option == 'hotels') {
      document.getElementById('middle')?.classList.add('active');
      this.users = false;
      this.hotels = true;
      this.mesasges = false;
      document.getElementById('left')?.classList.remove('active');
      document.getElementById('rigth')?.classList.remove('active');
    } else {
      document.getElementById('rigth')?.classList.add('active');
      this.users = false;
      this.hotels = false;
      this.mesasges = true;
      document.getElementById('middle')?.classList.remove('active');
      document.getElementById('left')?.classList.remove('active');
    }
  }
  getEverything() {
    this.firebase.getHotels().subscribe((element) => {
      element.forEach((item: any, index: number) => {
        this.hotelsArray.push(item.payload.doc.data());
        this.hotelsArray[index]['keys'] = item.payload.doc.id;
      });
    });
    this.firebase.getUser().subscribe((element) => {
      element.forEach((item: any, index: number) => {
        this.usersArray.push(item.payload.doc.data());
        this.usersArray[index]['keys'] = item.payload.doc.id;
      });
    });
    this.firebase.getMessages().subscribe((element) => {
      element.forEach((item: any, index: number) => {
        this.messagesArray.push(item.payload.doc.data());
        this.messagesArray[index]['keys'] = item.payload.doc.id;
      });
    });
  }
  viewImage(data: string, name: string) {
    Swal.fire({
      title: `User <strong style="color:#2574a9">${name}</strong> image `,
      html: `<img  width="600" height="400" src="${data}" alt="Coultn't open the image" style="object-fit: contain">`,
      width: 800,
    });
  }
  editUser(key: string) {
    this.router.navigateByUrl(`/dashboard/${key}`);
  }
  deleteUser(key: string, name: string, image: string) {
    Swal.fire({
      title: `Are you sure to delete user : ${name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaded = false;
        this.firebase.deleteUser(key);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }
  async reply(array: any) {
    let obj = {
      name: '',
      email: '',
      message: '',
      question: '',
    };
    let params = {
      to_name: '',
      to_email: '',
      message: '',
      question: '',
    };
    obj.name = array.name;
    obj.email = array.email;
    obj.question = array.message;
    const { value: message } = await Swal.fire({
      title: `Question by : ${array.name} `,
      input: 'text',
      text: `Message : ${array.message}`,
      inputLabel: 'Enter answer',
      inputPlaceholder: 'Enter message to send',
    });

    if (message) {
      Swal.fire(`Entered answer " ${message} " was sent`);
      obj.message = message;
      this.sharedFunc.sendEmail(obj, params);
    }
  }
  checkMessage(data: any) {
    Swal.fire({
      icon: 'question',
      title: 'Message',
      text: `${data}`,
    });
  }
  deleteMessage(key: string, name: string) {
    Swal.fire({
      title: `Are you sure to delete user : ${name} message?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaded = false;
        this.firebase.deleteMessage(key);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }
}
