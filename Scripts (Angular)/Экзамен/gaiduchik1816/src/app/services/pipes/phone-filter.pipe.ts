import {Pipe, PipeTransform} from '@angular/core';
import {Phone} from '../model/phone/phonemodel';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'phoneFilter',
  pure: false
})
export class PhoneFilterPipe implements PipeTransform {

  transform(phones: Phone[], searching) : any  {
    console.log(searching);
    let searchGuy = searching.firstName;

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
