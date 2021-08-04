import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseClientService } from './../../services/firebase-client.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  constructor(
    private router: Router,
    private firebase: FirebaseClientService
  ) {}

  ngOnInit(): void {}
  sendMessage(form: NgForm) {
    this.firebase.sendMessage(form.value as any);
  }
  sendMessages() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'green',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: 'success',
      title: '<strong>Your message was sent!</strong>',
    });

    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2500);
  }
}
