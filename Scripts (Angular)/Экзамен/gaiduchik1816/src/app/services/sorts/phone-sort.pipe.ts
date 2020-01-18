import {Pipe, PipeTransform} from '@angular/core';
import {Phone} from '../model/phone/phonemodel';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'phoneSort',
  pure: false
})
export class PhoneSortPipe implements PipeTransform {

  transform(phones: Phone[], sortOptions : number) : any  {
    console.log('Выбран алгоритм №' + sortOptions);
  if (sortOptions == 1) {

    phones.sort((prev, next) => prev.id - next.id);

  }

  if (sortOptions == 2) {

    phones.sort((prev, next) => next.id - prev.id);
  
  }

  if (sortOptions == 3) {

    phones.sort((prev, next) => prev.price - next.price);

  }

  if (sortOptions == 4) {

    phones.sort((prev, next) => next.price - prev.price);
  
  }  if (sortOptions == 5) {

    phones.sort((prev, next) => prev.buy - next.buy);

  }

  if (sortOptions == 6) {

    phones.sort((prev, next) => next.buy - prev.buy);
  
  }


  return phones;


  }


}
