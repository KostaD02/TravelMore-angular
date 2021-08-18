import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-edits',
  templateUrl: './hotel-edits.component.html',
  styleUrls: ['./hotel-edits.component.css'],
})
export class HotelEditsComponent implements OnInit {
  constructor(
    private SharedFuncService: SharedFuncService,
    private firebase: FirebaseClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  loader: boolean = false;
  secureUpdate: boolean = true;
  key: string = '';
  currentHotel: any = [];
  tempboolean: boolean = false;
  tempImageHolder: string = '';
  secureUpload: boolean = true;
  images: any = [];
  photoCounter: number = 0;
  hotelName: string = '';
  ngOnInit(): void {
    if (this.SharedFuncService.redirectUnauth()) {
      this.route.params.subscribe((params: Params) => {
        this.key = params.key;
      });
      this.firebase
        .getDocument('hotel-collection', this.key)
        .subscribe((element) => {
          this.currentHotel = element.payload.data();
        });
      setTimeout(() => {
        this.loader = true;
        this.photoCounter = this.currentHotel.images.length;
        this.images = this.currentHotel.images;
        setTimeout(() => {
          this.displayPhotos();
        }, 1000);
      }, 1000);
    }
  }
  ShowFullSize(index: any) {
    Swal.fire({
      html: `<img  width="600" height="400" src="${this.currentHotel.images[index]}" alt="Coultn't open the image" style="object-fit: contain">`,
      width: 800,
    });
  }
  AddImage() {
    this.uploadPhoto();
    setTimeout(() => {
      if (this.tempboolean) {
        try {
          if (this.photoCounter == 0) {
            const mainImage = document.getElementById('mainImage');
            mainImage!.style.backgroundImage = `url(${this.images[0]})`;
            this.tempboolean = false;
          }
          if (this.photoCounter == 1) {
            const mainImage = document.getElementById('first');
            mainImage!.style.backgroundImage = `url(${this.images[1]})`;
            this.tempboolean = false;
          }
          if (this.photoCounter == 2) {
            const mainImage = document.getElementById('second');
            mainImage!.style.backgroundImage = `url(${this.images[2]})`;
            this.tempboolean = false;
          }
          if (this.images.length == 4) {
            const mainImage = document.getElementById('third');
            mainImage!.style.backgroundImage = `url(${this.images[3]})`;
            this.tempboolean = false;
          }
          if (this.images.length == 5) {
            const mainImage = document.getElementById('forth');
            mainImage!.style.backgroundImage = `url(${this.images[4]})`;
            this.tempboolean = false;
          }
          if (this.images.length == 6) {
            const mainImage = document.getElementById('fifth');
            mainImage!.style.backgroundImage = `url(${this.images[5]})`;
            this.tempboolean = false;
          }
        } catch (error) {
          this.displayPhotos();
        }
      }
    }, 4000);
  }
  greaterThan(index: any) {
    return this.photoCounter > index;
  }
  SwitchImage(index: any) {
    this.switchImages();
    if (index == 0) {
      const mainImage = document.getElementById('mainImage');
      mainImage!.style.backgroundImage = `url(${this.tempImageHolder})`;
      this.tempboolean = false;
      this.images[index] = this.tempImageHolder;
    }
    if (index == 1) {
      const mainImage = document.getElementById('first');
      mainImage!.style.backgroundImage = `url(${this.tempImageHolder})`;
      this.tempboolean = false;
      this.images[index] = this.tempImageHolder;
    }
    if (index == 2) {
      const mainImage = document.getElementById('second');
      mainImage!.style.backgroundImage = `url(${this.tempImageHolder})`;
      this.tempboolean = false;
      this.images[index] = this.tempImageHolder;
    }
    if (index == 3) {
      const mainImage = document.getElementById('third');
      mainImage!.style.backgroundImage = `url(${this.tempImageHolder})`;
      this.tempboolean = false;
      this.images[index] = this.tempImageHolder;
    }
    if (index == 4) {
      const mainImage = document.getElementById('forth');
      mainImage!.style.backgroundImage = `url(${this.tempImageHolder})`;
      this.tempboolean = false;
      this.images[index] = this.tempImageHolder;
    }
    if (index == 5) {
      const mainImage = document.getElementById('fifth');
      mainImage!.style.backgroundImage = `url(${this.tempImageHolder})`;
      this.tempboolean = false;
      this.images[index] = this.tempImageHolder;
    }
    console.log(this.images);
  }
  displayPhotos() {
    if (this.currentHotel.images.length == 0) {
      const mainImage = document.getElementById('mainImage');
      mainImage!.style.backgroundImage = `url(https://cdn.iconscout.com/icon/free/png-512/no-image-1771002-1505134.png)`;
    } else {
      this.images.forEach((element: any, index: any) => {
        if (index == 0) {
          const mainImage = document.getElementById('mainImage');
          mainImage!.style.backgroundImage = `url(${element})`;
        }
        if (index == 1) {
          const mainImage = document.getElementById('first');
          mainImage!.style.backgroundImage = `url(${element})`;
        }
        if (index == 2) {
          const mainImage = document.getElementById('second');
          mainImage!.style.backgroundImage = `url(${element})`;
        }
        if (index == 3) {
          const mainImage = document.getElementById('third');
          mainImage!.style.backgroundImage = `url(${element})`;
        }
        if (index == 4) {
          const mainImage = document.getElementById('forth');
          mainImage!.style.backgroundImage = `url(${element})`;
        }
        if (index == 5) {
          const mainImage = document.getElementById('fifth');
          mainImage!.style.backgroundImage = `url(${element})`;
        }
      });
    }
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
  editHotel(form: NgForm) {
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
    };
    try {
      this.firebase.editHotels(hotel, this.key);
      this.SharedFuncService.displayToast(
        'Your hotel edited successfuly',
        'success',
        'green'
      );
    } catch (error) {
      this.router.navigateByUrl('/help');
    }
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 1500);
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
        this.SharedFuncService.displayToast(
          'Photo uploaded successfully',
          'success',
          'green',
          2000
        );
        this.photoCounter++;
        console.log(this.images);
        console.log(this.photoCounter);
      };
      uploaded = true;
      reader.readAsDataURL(file);
    }
    if (uploaded) {
      this.tempboolean = true;
    }
  }
  async switchImages() {
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
        this.tempImageHolder = e.target.result;
        this.SharedFuncService.displayToast(
          'Photo switched successfully',
          'success',
          'green',
          2000
        );
      };
      uploaded = true;
      reader.readAsDataURL(file);
    }
    if (uploaded) {
      this.tempboolean = true;
    }
  }
}
