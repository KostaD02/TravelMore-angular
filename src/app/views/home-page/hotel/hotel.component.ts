import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {
  @Input() inputedHotel = {};
  myHotelData!: any;
  mainImage: string = '';
  constructor() {}
  checkHotel() {}
  ngOnInit(): void {
    this.myHotelData = this.inputedHotel;
    if (this.myHotelData.images.length == 0) {
      this.mainImage =
        'https://cdn.iconscout.com/icon/free/png-512/no-image-1771002-1505134.png';
    } else {
      this.mainImage = this.myHotelData.images[0];
    }
    console.log(this.myHotelData.data);
  }
}
