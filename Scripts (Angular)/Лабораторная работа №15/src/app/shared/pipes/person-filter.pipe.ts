import {Pipe, PipeTransform} from '@angular/core';
import {Person} from '../models/person.model';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'personFilter',
  pure: false
})
export class PersonFilterPipe implements PipeTransform {

  transform(persons: Person[], searching) : any  {
    let searchGuy = searching.firstName;

    if (!isNullOrUndefined(persons) && searchGuy.trim().length > 0) {

      let newArr = persons.filter(person => 
        person.firstName.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0 ||
        person.lastName.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0
      );


      return newArr;
    } else {
      return persons;
    }

  }


}
