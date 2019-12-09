import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  @Output() addperson = new EventEmitter<Person>();

  constructor() { }

  ngOnInit() {
  }


  
  onAddPerson(firstname: string, lastname: string) {
    if(firstname == '' || lastname == ''){alert('Ошибка. Проверьте поля, возможно вы что-то не ввели!')} else {
    let person = new Person(firstname, lastname);
    this.addperson.emit(person);}
  }

}
