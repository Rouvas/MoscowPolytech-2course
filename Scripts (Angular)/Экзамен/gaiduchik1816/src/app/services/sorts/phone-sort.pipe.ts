import {Pipe, PipeTransform} from '@angular/core';
import {Phone} from '../model/phone/phonemodel';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'phoneSort',
  pure: false
})
export class PhoneSortPipe implements PipeTransform {

  transform(phones: Phone[], finding) : any  {
    console.log(finding);
    let searchGuy = finding.firstName;

    if (!isNullOrUndefined(phones) && searchGuy.trim().length > 0) {

      let newArr = phones.filter(phones => 
        phones.name.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0 ||
        phones.manufacture.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0 ||
        phones.artic.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0 
      );


      return newArr;
    } else {
      return phones;
    }

  }


}
