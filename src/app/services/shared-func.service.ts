import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SharedFuncService {
  constructor() {}
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
}
