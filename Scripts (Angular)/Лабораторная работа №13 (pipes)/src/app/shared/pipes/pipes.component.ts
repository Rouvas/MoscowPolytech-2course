import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Person } from '../models/person.model';

@Pipe({
  name: 'MyFilterPipe'
})
export class MyFilterPipe implements PipeTransform {

  transform(persons: Person[], searchStr: string) {

    if (!isNullOrUndefined(persons) && searchStr.trim().length > 0) {
      // let newArr = months.filter(month => month.toLocaleLowerCase() === searchStr.toLocaleLowerCase());
      let newArr = persons.filter(persons => 
        persons.firstname.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) === 0);
      return newArr;
    } else {
      return persons;
    }

  }

}

