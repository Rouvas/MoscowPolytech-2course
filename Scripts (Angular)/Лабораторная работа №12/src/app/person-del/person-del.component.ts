import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Person } from '../shared/models/person.model';

@Component({
  selector: 'app-person-del',
  templateUrl: './person-del.component.html',
  styleUrls: ['./person-del.component.css']
})
export class PersonDelComponent implements OnInit {

  @Input() inPerson: Person;
  constructor() { }

  ngOnInit() {
  }
onDeletePerson(id: Number){
 }
}


