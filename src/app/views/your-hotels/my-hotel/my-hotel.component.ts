import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css'],
})
export class MyHotelComponent implements OnInit {
  @Input() inputedHotel = {};
  myHotelData!: any;
  mainImage: string = '';
  hotelName: string = '';
  constructor() {}
  ngOnInit(): void {
    this.myHotelData = this.inputedHotel;
    this.hotelName = this.myHotelData.data.hotelName;
    if (this.myHotelData.images.length == 0) {
      this.mainImage =
        'https://cdn.iconscout.com/icon/free/png-512/no-image-1771002-1505134.png';
    } else {
      this.mainImage = this.myHotelData.images[0];
    }
    console.log(this.myHotelData);
  }
}
