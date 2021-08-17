import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import { FirebaseClientService } from './../../services/firebase-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-appartment',
  templateUrl: './upload-appartment.component.html',
  styleUrls: ['./upload-appartment.component.css'],
})
export class UploadAppartmentComponent implements OnInit {
  secureUpload: boolean = true;
  images: any = [];
  photoCounter: number = 0;
  address: string = '';
  constructor(
    private SharedFuncService: SharedFuncService,
    private firebase: FirebaseClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SharedFuncService.getIp().subscribe((result: any) => {
      this.address = result.ip;
    });
  }
  uploadHotel(form: NgForm) {
    this.secureUpload = false;
    let hotel = {};
    let data = form.value;
    let localstorage = localStorage.getItem('UsersArray');
    let tempObj = JSON.parse(localstorage as any);
    data['hotelAddress'] = data.hotelAddress.toLowerCase();
    data['hotelName'] = data.hotelName.toLowerCase();
    hotel = {
      name: 'hotel',
      images: this.images,
      data: data,
      author: tempObj.email,
      ipAddress: this.address,
    };
    this.firebase.createHotel(hotel);
    this.SharedFuncService.displayToast(
      'Your hotel uploaded successfuly',
      'success',
      'green'
    );
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 1500);
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
}
