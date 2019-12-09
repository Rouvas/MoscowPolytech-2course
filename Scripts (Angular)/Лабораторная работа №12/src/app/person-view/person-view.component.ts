import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  @Input() inPerson: Person;
  @Output() deleteperson = new EventEmitter<Number>();
  @Output() editperson = new EventEmitter<Person>();

  

  ngOnInit() {
    console.log(this.inPerson);  
  }

  onDeletePerson(person){
    this.deleteperson.emit(person.id);
  }

  onEditPerson(firstname: string, lastname: string, id) {
    if(firstname == '' || lastname == ''){alert('Ошибка. Проверьте поля, возможно вы что-то не ввели!')} else {
    let person = new Person(firstname, lastname, id);
    this.editperson.emit(person);}
  }
  
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
