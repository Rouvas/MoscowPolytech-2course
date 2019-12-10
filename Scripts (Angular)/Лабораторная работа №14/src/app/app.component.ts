import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from './shared/models/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  title = 'Компоненты';
  persons: Person[] = [];
  searchGuy = '';
  searchSurname = '';
  constructor() {
  }


  ngOnInit(): void {
    this.persons.push(new Person('Savage', 'Goodbye', '+7 (555) 093-40-42', 1));
    this.persons.push(new Person('Sakis', 'Rouvas', '+7 (555) 093-40-42', 2));
    this.persons.push(new Person('Dimitra', 'Papadea', '+7 (555) 093-40-42', 3));
    this.persons.push(new Person('C.C.', 'Catch', '+7 (555) 093-40-42', 4));
    this.persons.push(new Person('Patty', 'Ryan', '+7 (555) 093-40-42', 5));
  }

  ngOnDestroy(): void {
  }

  onAddPerson(person: Person) {
    let newId;
    if (this.persons.length == 0) {newId = 1} else {newId = this.persons[this.persons.length - 1].id + 1;}
    person.id = newId;
    this.persons.push(person);
  }

  onDeletePerson(id: Number){
let foundIdx = this.persons.findIndex(el => el.id == id);
if(foundIdx !== undefined) this.persons.splice(foundIdx,1);
   }

  onEditPerson(person: Person){
    let foundIdx = this.persons.findIndex(el => el.id == person.id);
  if(foundIdx !== undefined) this.persons.splice(foundIdx,1,person);
  }

}
