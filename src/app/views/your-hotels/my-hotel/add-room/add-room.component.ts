import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit {
  key: string = '';
  loaded: boolean = false;
  hotelName: string = '';
  hotelsArray: any = [];
  currentHotel: any = [];
  photoCounter: number = 0;
  secureUpload: boolean = true;
  images: any = [];
  constructor(
    private SharedFuncService: SharedFuncService,
    private firebase: FirebaseClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hotelName = params.name;
      this.key = params.key;
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
      this.SharedFuncService.displayToast(
        'Sorry unexpected error',
        'info',
        'blue',
        2500
      );
      this.router.navigateByUrl('/help');
      setTimeout(() => {
        this.SharedFuncService.displayToast(
          'Please describe problem exactly what happend',
          'question',
          'grey'
        );
      }, 2500);
    } else {
      this.currentHotel = array[indexHotel];
    }
  }
  uploadAppartment(form: NgForm) {
    try {
      this.addAppartmentToHotel(form.value, this.images);
      this.secureUpload = false;
      setTimeout(() => {
        this.firebase.editHotels(this.currentHotel, this.key);
        this.SharedFuncService.displayToast(
          'Your appartment successfully added to hotel',
          'success',
          'green'
        );
      }, 500);
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 3000);
    } catch (error) {
      this.SharedFuncService.displayToast(
        'Unexpected error , please describe what happend',
        'danger',
        'red'
      );
      setTimeout(() => {
        this.router.navigateByUrl('/help');
      }, 1500);
    }
  }
  async uploadPhoto() {
    if (this.photoCounter == 6) {
      this.SharedFuncService.displayToast(
        "You can't upload more picture",
        'error',
        'red'
      );
      return;
    }
    let image = '';
    let uploaded = false;
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        Swal.fire({
          title: 'Your uploaded hotel picture',
          imageUrl: e.target.result as any,
          imageAlt: 'The uploaded picture',
        });
        this.images.push(e.target.result);
        image = e.target.result;
      };
      uploaded = true;
      reader.readAsDataURL(file);
    }
    if (uploaded) this.switchPhotos();
    this.photoCounter++;
  }
  switchPhotos() {
    if (this.photoCounter == 0) {
      setTimeout(() => {
        document.getElementById('mainPhoto')!.innerHTML = `
          <img id="mainImage" src="${this.images[0]}">
        `;
        const image = document.getElementById('mainImage');
        image!.style.width = '100%';
        image!.style.height = '100%';
        image!.style.objectFit = 'contain';
      }, 500);
    }
    if (this.photoCounter == 1) {
      setTimeout(() => {
        document.getElementById('leftNumer')!.innerHTML =
          '4 Additional photo left to upload';
        document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item active">
            <img id="slideFirst" src="${this.images[1]}" alt="First slide">
        </div>
        `;
        const image = document.getElementById('slideFirst');
        image!.style.width = '288px';
        image!.style.height = '313px';
        image!.style.objectFit = 'cover';
      }, 500);
    }
    if (this.photoCounter == 2) {
      setTimeout(() => {
        document.getElementById('leftNumer')!.innerHTML =
          '3 Additional photo left to upload';
        document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item">
            <img id="slideSecond" src="${this.images[2]}" alt="Second slide">
        </div>
        `;
        const image = document.getElementById('slideSecond');
        image!.style.width = '288px';
        image!.style.height = '313px';
        image!.style.objectFit = 'cover';
      }, 500);
    }
    if (this.photoCounter == 3) {
      setTimeout(() => {
        document.getElementById('leftNumer')!.innerHTML =
          '2 Additional photo left to upload';
        document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item">
            <img id="slideThree" src="${this.images[3]}" alt="Third slide">
        </div>
        `;
        const image = document.getElementById('slideThree');
        image!.style.width = '288px';
        image!.style.height = '313px';
        image!.style.objectFit = 'cover';
      }, 500);
    }
    if (this.photoCounter == 4) {
      setTimeout(() => {
        document.getElementById('leftNumer')!.innerHTML =
          '1 Additional photo left to upload';
        document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item">
            <img id="slideFor" src="${this.images[4]}" alt="Forth slide">
        </div>
        `;
        const image = document.getElementById('slideFor');
        image!.style.width = '288px';
        image!.style.height = '313px';
        image!.style.objectFit = 'cover';
      }, 500);
    }
    if (this.photoCounter == 5) {
      setTimeout(() => {
        document.getElementById('leftNumer')!.innerHTML =
          "You can't upload more photo <i class='far fa-frown'></i>";
        document.getElementById('innerImages')!.innerHTML += `
        <div class="carousel-item">
            <img id="slideFive" src="${this.images[5]}" alt="Fifth slide">
        </div>
        `;
        const image = document.getElementById('slideFive');
        image!.style.width = '288px';
        image!.style.height = '313px';
        image!.style.objectFit = 'cover';
      }, 500);
    }
  }
  addAppartmentToHotel(data: any, images: any) {
    if (this.currentHotel['appartments'] == undefined) {
      this.currentHotel['appartments'] = [];
      this.currentHotel.appartments.push({ data, images });
    } else {
      this.currentHotel.appartments.push({ data, images });
    }
  }
}
