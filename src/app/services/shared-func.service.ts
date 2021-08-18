import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SharedFuncService {
  constructor(private route: Router, private http: HttpClient) {}
  displayToast(text: string, Icon: string, color: string, time: number = 1500) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: color,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: Icon as any,
      title: text,
    });
  }

  numberToEnglish(n: any, custom_join_character: any) {
    let string = n.toString(),
      units,
      tens,
      scales,
      start,
      end,
      chunks,
      chunksLen,
      chunk,
      ints,
      i,
      word,
      words;
    let and = custom_join_character || 'and';
    if (parseInt(string) === 0) {
      return 'zero';
    }
    units = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    tens = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];
    scales = [
      '',
      'thousand',
      'million',
      'billion',
      'trillion',
      'quadrillion',
      'quintillion',
      'sextillion',
      'septillion',
      'octillion',
      'nonillion',
      'decillion',
      'undecillion',
      'duodecillion',
      'tredecillion',
      'quatttuor-decillion',
      'quindecillion',
      'sexdecillion',
      'septen-decillion',
      'octodecillion',
      'novemdecillion',
      'vigintillion',
      'centillion',
    ];
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);
      if (chunk) {
        ints = chunks[i].split('').reverse().map(parseFloat);
        if (ints[1] === 1) {
          ints[0] += 10;
        }
        if ((word = scales[i])) {
          words.push(word);
        }
        if ((word = units[ints[0]])) {
          words.push(word);
        }
        if ((word = tens[ints[1]])) {
          words.push(word);
        }
        if (ints[0] || ints[1]) {
          if (ints[2] || (!i && chunksLen)) {
            words.push(and);
          }
        }
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred');
        }
      }
    }
    return words.reverse().join(' ');
  }
  redirectUnauth() {
    if (
      localStorage['UsersArray'] == undefined ||
      localStorage['UsersArray'].length == 0
    ) {
      this.route.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
  redirectAdmin() {
    if (localStorage.length < 2) {
      this.route.navigateByUrl('/');
      return false;
    } else {
      let parse = JSON.parse(localStorage['UsersArray']);
      if (parse.type != 'admin') {
        return false;
      } else {
        return true;
      }
    }
  }
  sendEmail(data: any, params: any) {
    params.to_name = data.name;
    params.to_email = data.email;
    params.message = data.message;
    params.question = data.question;
    emailjs.send(
      'service_kitwqnk',
      'template_39w76pr',
      params,
      'user_GzK09mGXoDYAgls2nw3pb'
    );
  }
  redirectAuth() {
    if (
      localStorage['UsersArray'] == '' ||
      localStorage['UsersArray'] == undefined
    ) {
      return true;
    } else {
      this.route.navigateByUrl('/');
      return false;
    }
  }
}
