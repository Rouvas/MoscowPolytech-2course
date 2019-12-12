import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  @Output() addperson = new EventEmitter<Person>();
  personForms: FormGroup;
  disabledForms = false;
  mask = ['+','7',' ','(',/[1-9]/, /\d/, /\d/,')' ,' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/];
  constructor() { }

  ngOnInit() {
    this.personForms = new FormGroup({
      firstName: new FormControl({ value: '', disabled: this.disabledForms },
        [Validators.required]),
      lastName: new FormControl({ value: '', disabled: this.disabledForms },
        [Validators.required]),
      phone: new FormControl({ value: '', disabled: this.disabledForms },
        [Validators.required])
    });
  }


  
  onAddPerson(firstname: string, lastname: string, phone: string) {
    let person = new Person(firstname, lastname, phone);
    this.addperson.emit(person);
  }

}
