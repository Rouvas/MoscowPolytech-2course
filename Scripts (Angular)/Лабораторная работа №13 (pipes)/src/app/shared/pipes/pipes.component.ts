import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Person } from '../models/person.model';

@Pipe({
  name: 'MyFilterPipe'
})
export class MyFilterPipe implements PipeTransform {

  transform(persons: Person[], searchGuy: string, searchSurname: string) {


    if (!isNullOrUndefined(persons) && searchGuy.trim().length > 0) {

      let newArr = persons.filter(person => 
        person.firstname.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0 ||
        person.lastname.toLocaleLowerCase().indexOf(searchGuy.toLocaleLowerCase()) === 0
      );


      //  let newArr = persons.filter(
      //    persons => persons.firstname.toLocaleLowerCase().indexOf( searchGuy.toLocaleLowerCase() ) === 0);
      //    newArr = newArr.filter(
      //      persons => persons.lastname.toLocaleLowerCase().indexOf( searchSurname.toLocaleLowerCase() ) === 0);

      return newArr;
    } else {
      return persons;
    }

  }

}

