import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Person } from '../models/person.model';

@Pipe({
  name: 'MyFilterPipe'
})
export class MyFilterPipe implements PipeTransform {

  transform(persons: Person[], searchFirstname: string, searchLastname:string) {



    if (!isNullOrUndefined(persons) && searchFirstname.trim().length > 0) {
      let newArr = persons.filter(persons => persons.firstname.toLocaleLowerCase().indexOf(searchFirstname.toLocaleLowerCase()) === 0);
      return newArr;
    } else {
      return persons;
    }

  }

}

