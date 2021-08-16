import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as numberToWords from 'number-to-words';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  isUserGuest: boolean = true;
  isBooked: boolean = false;
  hotelsArray: any = [];
  indexAppartment: string = '';
  currentAppartment: any = [];
  currentHotel: any = [];
  imagesAppartment: any = [];
  loaded: boolean = false;
  hotelName: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedFunc: SharedFuncService,
    private firebase: FirebaseClientService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hotelName = params.name;
      this.indexAppartment = params.id;
    });
    this.firebase.getHotels().subscribe((element) => {
      element.forEach((e: any) => {
        this.hotelsArray.push(e.payload.doc.data());
      });
      this.takeCurrentAppartment(this.hotelsArray);
    });
    setTimeout(() => {
      while (true) {
        if (this.currentHotel.length == 0) {
          this.loaded = false;
        } else {
          this.loaded = true;
          break;
        }
      }
      let index = this.indexAppartment.slice(-1);
      this.currentAppartment = this.currentHotel.appartments[index];
      this.imagesAppartment = this.currentAppartment.images;
      setTimeout(() => {
        let h2 = document.getElementById('appartmentIndex');
        h2!.innerHTML = `You are now checking <strong style="color:#2574a9">${
          this.hotelName
        }</strong> hotels <strong style="color:#2574a9">${numberToWords.toOrdinal(
          Number(index) + 1
        )}</strong> appartment`;
        h2!.style.textAlign = 'center';
        h2!.style.marginBottom = '25px';
      }, 100);
      try {
        let user = localStorage.getItem('UsersArray') as any;
        if (
          JSON.parse(user).type == 'admin' ||
          JSON.parse(user).type == 'hotel'
        )
          this.isUserGuest = false;
      } catch (error) {
        this.isUserGuest = true;
      }
    }, 1600);
  }
  takeCurrentAppartment(array: any) {
    let indexHotel = -1;
    array.forEach((element: any, index: any) => {
      if (element.data.hotelName == this.hotelName) {
        indexHotel = index;
      }
    });
    if (indexHotel == -1) {
      this.sharedFunc.displayToast(
        'Sorry unexpected error',
        'info',
        'blue',
        2500
      );
      this.router.navigateByUrl('/help');
      setTimeout(() => {
        this.sharedFunc.displayToast(
          'Please describe problem exactly what happend',
          'question',
          'grey'
        );
      }, 2500);
    } else {
      this.currentHotel = array[indexHotel];
      setTimeout(() => {
        this.isBooked = this.currentAppartment.booked;
      }, 1500);
    }
  }
  uploadImage(index: any) {
    if (this.imagesAppartment[index] == undefined) return false;
    else return true;
  }
}
