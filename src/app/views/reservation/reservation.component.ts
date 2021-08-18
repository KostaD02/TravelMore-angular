import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  safeUpload: boolean = false;
  key: any = '';
  option: string = '';
  payment: boolean = true;
  lastPrice: number = 0;
  formAccept: boolean = false;
  loadOne: boolean = false;
  loadTwo: boolean = false;
  calculatePrice: any = 1;
  newBorn: any;
  newPrice: any;
  load: boolean = false;
  day: any = 1;
  date: any = 1;
  child: any = 0;
  price: string = '';
  isBooked: boolean = false;
  hotelsArray: any = [];
  indexAppartment: string = '';
  currentAppartment: any = [];
  currentHotel: any = [];
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
      this.indexAppartment = params.key;
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
      this.price = this.currentAppartment.data.price;
      this.calculatePrice = this.currentAppartment.data.price;
    }, 1500);
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
      this.key = this.currentHotel.key;
      setTimeout(() => {
        this.isBooked = this.currentAppartment.booked;
      }, 1500);
    }
  }
  submit() {
    if (this.newPrice == undefined) {
      this.lastPrice = this.calculatePrice;
      this.formAccept = true;
    } else {
      this.lastPrice = this.newPrice;
      this.formAccept = true;
    }
  }
  change(event: Event) {
    let result = 0;
    let number = Number(event);
    this.day = number;
    let convertToNumber = Number(this.price);
    result = convertToNumber * number;
    this.calculatePrice = result;
  }
  changeChildren(event: Event) {
    if (Number(event) > 4) {
      let price = (this.calculatePrice * 25) / 100;
      this.newPrice = this.calculatePrice - price;
      this.load = true;
      this.loadOne = true;
    } else {
      this.load = false;
      this.loadOne = false;
      if (this.loadTwo) {
        let price = (this.calculatePrice * 15) / 100;
        this.newPrice = this.calculatePrice - price;
        this.load = true;
      }
    }
  }
  changeNewBorn(event: Event) {
    if (event) {
      this.loadTwo = true;
      if (!this.loadOne) {
        let price = (this.calculatePrice * 15) / 100;
        this.newPrice = this.calculatePrice - price;
        this.load = true;
      }
    } else {
      this.loadTwo = false;
      if (this.loadOne) {
        this.load = true;
      } else {
        this.load = false;
      }
    }
  }
  pay(option: string) {
    if (option == 'bog') {
      this.payment = false;
      this.option = 'bog';
    } else {
      this.payment = false;
      this.option = 'tbc';
    }
  }
  submitPayment(form: NgForm) {
    let index = this.indexAppartment.slice(-1);
    let hotel = this.currentHotel;
    hotel.appartments[index].booked = true;
    this.firebase.editHotels(hotel, this.key);
    this.sharedFunc.displayToast(
      'Payment finished successfully',
      'success',
      'green'
    );
    this.safeUpload = true;
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 1500);
  }
}
