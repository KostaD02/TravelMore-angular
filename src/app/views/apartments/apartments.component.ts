import { Component, OnInit } from '@angular/core';
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
  loaded: boolean = false;
  hotelName: string = '';
  hotelsArray: any = [];
  currentHotel: any = [];
  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseClientService,
    private router: Router,
    private sharedFunc: SharedFuncService
  ) {}
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hotelName = params.name;
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
      this.currentHotel.images.push('');
    }
  }
  viewImage() {
    Swal.fire({
      title: `<strong>${this.hotelName}</strong> main image`,
      html: `<img  width="600" height="400" src="${this.currentHotel.images[0]}" alt="Coultn't open the image" style="object-fit: contain">`,
      width: 800,
    });
  }
}
