import {Pipe, PipeTransform} from '@angular/core';
import {Person} from '../models/person.model';

@Pipe({
  name: 'personFilter',
  pure: false
})
export class PersonFilterPipe implements PipeTransform {

  transform(personsList: Person[], searching: object): any {
    let value = personsList;

    for (const searchingKey in searching) {
      if (searching[searchingKey] !== '') {
        value = value.filter(
          person => (person[searchingKey]).toLocaleLowerCase().indexOf(searching[searchingKey].toLowerCase()) === 0);
      }
    }
    return value;
  }
}
