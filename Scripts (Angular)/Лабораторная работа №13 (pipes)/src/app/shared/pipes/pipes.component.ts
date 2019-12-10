import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Person } from '../models/person.model';

@Pipe({
  name: 'MyFilterPipe'
})
export class MyFilterPipe implements PipeTransform {

  transform(persons: Person[], searchGuy: string) {

    if (!isNullOrUndefined(persons) && searchGuy.trim().length > 0) {

      let newArr = persons.filter(
        persons => persons.firstname.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0);

      return newArr;
    } else {
      return persons;
    }

  }

}

