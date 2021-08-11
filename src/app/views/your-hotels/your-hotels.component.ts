import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';

@Component({
  selector: 'app-your-hotels',
  templateUrl: './your-hotels.component.html',
  styleUrls: ['./your-hotels.component.css'],
})
export class YourHotelsComponent implements OnInit {
  loader: boolean = true;
  allHotels: any = [];
  @Output() keysArray: any = [];
  @Output() myHotels: any = [];
  currentUser: any = {};
  constructor(
    private firebase: FirebaseClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let localstorage = localStorage.getItem('UsersArray');
    let tempObj = JSON.parse(localstorage as any);
    this.currentUser = tempObj;
    this.firebase.getHotels().subscribe((element) => {
      element.forEach((e: any) => {
        this.allHotels.push(e.payload.doc.data());
        if (e.payload.doc.data().author == this.currentUser.email) {
          this.keysArray.push(e.payload.doc.id);
        }
      });
    });
    setTimeout(() => {
      this.checkMyHotels(this.allHotels);
      this.loader = false;
    }, 1600);
  }
  checkMyHotels(array: any) {
    array.forEach((element: any) => {
      if (element.author == this.currentUser.email) {
        this.myHotels.push(element);
      }
    });
  }
}
