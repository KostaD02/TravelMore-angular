import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
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
      this.indexAppartment = params.id;
    });
    this.firebase.getHotels().subscribe((element) => {
      element.forEach((e: any) => {
        this.hotelsArray.push(e.payload.doc.data());
      });
      this.takeCurrentHotel(this.hotelsArray);
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
      console.log(this.currentAppartment);
      setTimeout(() => {
        document.getElementById(
          'appartmentIndex'
        )!.innerHTML = `You are now checking <strong style="color:#2574a9">${
          this.hotelName
        }</strong> hotels <strong style="color:#2574a9">${Number(
          index + 1
        )}</strong> appartment`;
      }, 100);
    }, 1600);
  }
  takeCurrentHotel(array: any) {
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
    }
  }
}
