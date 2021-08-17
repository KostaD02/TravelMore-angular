import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';
import { SharedFuncService } from 'src/app/services/shared-func.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  @Output() hotelsArray: any = [];
  constructor(
    private firebase: FirebaseClientService,
    private router: Router,
    private sharedFunc: SharedFuncService
  ) {}
  ngOnInit(): void {
    this.firebase.getHotels().subscribe((element) => {
      element.forEach((e: any) => {
        this.hotelsArray.push(e.payload.doc.data());
      });
    });
  }
  search(form: NgForm) {
    this.router.navigateByUrl(`/search/${form.value.search}`);
  }
}
