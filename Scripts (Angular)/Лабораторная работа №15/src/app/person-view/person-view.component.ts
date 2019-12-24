import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SrvService} from '../shared/services/srv.service';
import {Person} from '../shared/models/person.model';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  @Output() removePerson = new EventEmitter<number>();

  persons: Person[] = [];

  constructor(private srv: SrvService) {
  }


  searching: object = {
    firstName: ' '
  };

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.persons = [];
    this.srv.getPersons().then(() =>
      (this.srv.persons).forEach(person => this.persons.push(person))
    );
  }

  onRemovePerson(id: number) {
    console.log('Попытка удаления под id', id)
    this.srv.removePerson(id).then(() => {
      this.persons = this.persons.filter(person => person.id !== id);
    });
  }

  FilterPersonsList(e: object) {
    this.searching = e;
  }
}
