import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  loadNotFoundHotel: boolean = false;
  loader: boolean = true;
  resultArray: any = [];
  hotelsArray: any = [];
  hotelName: string = '';
  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseClientService,
    private sharedFunc: SharedFuncService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hotelName = params.result.toLowerCase();
    });
    this.firebase.getHotels().subscribe((element) => {
      element.forEach((e: any) => {
        this.hotelsArray.push(e.payload.doc.data());
      });
    });

    setTimeout(() => {
      this.loader = false;
      setTimeout(() => {
        this.compareResult(this.hotelsArray);
      }, 100);
    }, 1500);
  }
  search(result: NgForm) {
    this.resultArray = [];
    this.hotelName = result.value.search;
    this.compareResult(this.hotelsArray);
  }
  compareResult(array: any) {
    let resultIndex = -1;
    array.forEach((element: any, index: any) => {
      if (element.data.hotelName == this.hotelName) {
        resultIndex = index;
        this.resultArray.push(element);
        this.loadNotFoundHotel = false;
        this.sharedFunc.displayToast(
          `We found hotel ${this.hotelName}`,
          'success',
          'green',
          2500
        );
      }
    });
    if (resultIndex == -1) {
      this.sharedFunc.displayToast(
        `We can't find any hotel , which name start ${this.hotelName}`,
        'question',
        'grey',
        2500
      );
      this.loadNotFoundHotel = true;
    }
  }
}
