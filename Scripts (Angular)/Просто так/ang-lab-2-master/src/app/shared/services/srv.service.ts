import { Injectable } from '@angular/core';
import {Person} from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class SrvService {
  persons: Person[] = [];
  link = 'http://api.std-692.ist.mospolytech.ru/';

  constructor() {
  }

  async getPersons() {
    this.persons = [];

    const data = await (await fetch(
      this.link,
      {
        method: 'get'
      }
    )).json();

    for (const index in data) {
      for (const personInfo in data[index]) {
        if (personInfo === 'createdAt' || personInfo === 'updatedAt') {
          delete data[index][personInfo];
        }
      }
      this.persons.push(data[index]);
    }
  }

  async AddPerson(person: Person) {
    delete person.id;
    const res = await (await fetch(
      this.link,
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
      }
    )).json();

    return res.person;
  }

  async RemovePerson(id: number) {
    const data = {id};
    await (await fetch(
      this.link,
      {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }
    ));
  }

  async EditPerson(person: Person) {
    await (await fetch(
      this.link,
      {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
      }
    ));
  }
}
