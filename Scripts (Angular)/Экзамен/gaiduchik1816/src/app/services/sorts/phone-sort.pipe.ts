import {Pipe, PipeTransform} from '@angular/core';
import {Phone} from '../model/phone/phonemodel';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'phoneSort',
  pure: false
})
export class PhoneSortPipe implements PipeTransform {

  transform(phones: Phone[], sortOptions : number) : any  {
    
  
  if (sortOptions == 1) {

   //console.log(phones[1-1].id);
  

  }


  return phones;


  }


}
