import {Injectable} from '@angular/core';
import {Person} from '../models/person.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SrvService {
  persons: Person[] = [];
  link = 'http://localhost:3001/posts/';
  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(public http: HttpClient) {
  }

  async getPersons() {
    this.persons = [];
    const data = await this.http
      .get(this.link)
      .toPromise();

    for (const index in data) {
      delete data[index].createdAt;
      delete data[index].updatedAt;
      this.persons.push(data[index]);
    }
    console.log(this.persons)
  }

  async addPerson(person: Person) {
    delete person.id;
    return this.http.post(this.link, person, this.options).toPromise();
  }

  async removePerson(id: number) {
    let linkdel = this.link + id;
    return this.http.request('delete', linkdel, {body: {id}}).toPromise();
  }

  async editPerson(person: Person) {
    let link = this.link + person.id;
    return this.http.put(link, person, this.options).toPromise();
  }
}
