import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const bg = document.querySelector('.content-container');
    if (localStorage['mode'] == 'true') {
      bg!.classList.remove('day');
      bg!.classList.add('nigth');
    } else {
      bg!.classList.add('day');
      bg!.classList.remove('nigth');
    }
  }
}
