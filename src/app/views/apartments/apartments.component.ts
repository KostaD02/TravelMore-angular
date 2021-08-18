import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css'],
})
export class ApartmentsComponent implements OnInit {
  @Output() currentHotel: any = [];
  @Output() HotelName: string = '';
  loaded: boolean = false;
  hotelName: string = '';
  hotelsArray: any = [];
  slider: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedFunc: SharedFuncService,
    private firebase: FirebaseClientService
  ) {}
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hotelName = params.name;
      this.HotelName = params.name;
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
      this.hotelName = this.capitalizeFirstLetter(this.hotelName);
      this.setCarusel();
    }, 1600);
  }
  takeCurrentHotel(array: any) {
    let indexHotel = -1;
    array.forEach((element: any, index: any) => {
      if (element.data.hotelName == this.hotelName) {
        indexHotel = index;
      }
    });
    this.currentHotel = array[indexHotel];
  }
  greaterThan(data: any) {
    return data.length > 0;
  }
  viewImage() {
    Swal.fire({
      title: `<strong style="color:#2574a9">${this.hotelName}</strong> main image`,
      html: `<img  width="600" height="400" src="${this.currentHotel.images[0]}" alt="Coultn't open the image" style="object-fit: contain">`,
      width: 800,
    });
  }
  setCarusel() {
    if (this.currentHotel.images.length <= 1) {
      this.slider = false;
    } else {
      this.slider = true;
      for (let i = 1; i <= this.currentHotel.images.length - 1; i++) {
        setTimeout(() => {
          if (i == 1) {
            document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item active">
            <img id="${i}image" src="${this.currentHotel.images[i]}" alt="${i} slide">
        </div>
        `;
          } else {
            document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item">
            <img id="${i}image" src="${this.currentHotel.images[i]}" alt="${i} slide">
        </div>
        `;
          }
          const image = document.getElementById(`${i}image`);
          image!.style.width = '288px';
          image!.style.height = '313px';
          image!.style.objectFit = 'cover';
        }, 500);
      }
    }
  }
  check(data: any) {
    if (data['appartments'] == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
