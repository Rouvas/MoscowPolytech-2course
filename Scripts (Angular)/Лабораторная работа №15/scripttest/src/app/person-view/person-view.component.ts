import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css'],
})



export class PersonViewComponent implements OnInit {

  @Input() inPerson: Person;
  @Output() deleteperson = new EventEmitter<Number>();
  @Output() editperson = new EventEmitter<Person>();

  personForms: FormGroup;
  disabledForms = false;
  mask = ['+','7',' ','(',/[1-9]/, /\d/, /\d/,')' ,' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/];

  ngOnInit() {
    this.personForms = new FormGroup({
      firstName: new FormControl({ value: this.inPerson.firstname, disabled: this.disabledForms },
        [Validators.required]),
      lastName: new FormControl({ value: this.inPerson.lastname, disabled: this.disabledForms },
        [Validators.required]),
      phone: new FormControl({ value: this.inPerson.phone, disabled: this.disabledForms },
        [Validators.required])
    });
   
  }

  onDeletePerson(person){
    this.deleteperson.emit(person.id);
  }

  onEditPerson(firstname: string, lastname: string, id, phone: string)  {
    let person = new Person(firstname, lastname, phone, id);
    console.log(this.personForms);
    this.editperson.emit(person);
  }
  
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
