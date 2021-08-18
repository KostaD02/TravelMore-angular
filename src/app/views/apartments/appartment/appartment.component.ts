import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appartment',
  templateUrl: './appartment.component.html',
  styleUrls: ['./appartment.component.css'],
})
export class AppartmentComponent implements OnInit {
  @Input() inputedAppartment: any;
  @Input() index: any;
  @Input() hotelName: string = '';
  mainImage: string = '';
  appartmentName: string = '';
  constructor() {}

  ngOnInit(): void {
    if (this.inputedAppartment.images.length == 0) {
      this.mainImage =
        'https://cdn.iconscout.com/icon/free/png-512/no-image-1771002-1505134.png';
    } else {
      this.mainImage = this.inputedAppartment.images[0];
    }
    this.appartmentName = `Appartment${this.index}`;
  }
}
