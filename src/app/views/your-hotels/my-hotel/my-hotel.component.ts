import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css'],
})
export class MyHotelComponent implements OnInit {
  @Input() inputedHotel = {};
  @Input() key: string = '';
  myHotelData!: any;
  mainImage: string = '';
  hotelName: string = '';
  constructor(
    private firebase: FirebaseClientService,
    private sharedFunc: SharedFuncService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let i = 0;
    this.myHotelData = this.inputedHotel;
    this.hotelName = this.myHotelData.data.hotelName;
    if (this.myHotelData.images.length == 0) {
      this.mainImage =
        'https://cdn.iconscout.com/icon/free/png-512/no-image-1771002-1505134.png';
    } else {
      this.mainImage = this.myHotelData.images[0];
    }
  }
  deleteHotel(key: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.firebase.deleteHotel(key);
        } catch (error) {
          this.sharedFunc.displayToast('Unexpected error', 'danger', 'red');
          setTimeout(() => {
            this.router.navigateByUrl('/help');
          }, 1500);
        }
        this.firebase.deleteHotel(key);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  }
}
