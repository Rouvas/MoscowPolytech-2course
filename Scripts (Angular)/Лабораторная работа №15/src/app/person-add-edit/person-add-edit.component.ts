import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SrvService} from '../shared/services/srv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.css']
})

export class PersonAddEditComponent implements OnInit {
  id: number;
  
  constructor(
    private srv: SrvService,
    private activatedRouter: ActivatedRoute,
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.id = parseInt(param.id, 10);
    });
  }

  personForm: FormGroup;
  disabledControl: boolean;

  
  ngOnInit(): void {
    
    this.personForm = new FormGroup({
      firstName: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      lastName: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      tel: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
    });

    if (this.id) {
      this.srv.getPersons().then(() => {
        (this.srv.persons).forEach(person => {
          if (person.id === this.id) {
            const item = person;
            delete item.id;
            this.personForm.setValue(item);
          }
        });
      });
    }
  }
  
  onAddPerson() {

    
    
    const person = this.personForm.value;
    let noperson = person.tel;
    person.tel = `+7 ${noperson}`;
    let question = confirm("Подтвердите введенную информацию \n" + 'Имя: '+person.firstName + '\n' + 'Фамилия: '+person.lastName + '\n'+ 'Телефон: '+person.tel + '\n');
    if (question == true) {
    this.srv.addPerson(person).then(() => {
      this.personForm.reset();
      document.location.href = "/";
    });
  } else person.tel = noperson;
  }


  
  onEditPerson(id: number) {
    let person = this.personForm.value;
    person.id = id;
    person.tel = (person.tel.toString().indexOf('+7') === -1) ? `+7 ${person.tel}` : person.tel;
    let question = confirm("Подтвердите введенную информацию \n" + 'Имя: '+person.firstName + '\n' + 'Фамилия: '+person.lastName + '\n'+ 'Телефон: '+person.tel + '\n');


    if (question == true) {
    this.srv.editPerson(person).then(() => {
      document.location.href = "/";
    });  } 
  }

  isNaN(id: number) {
    return isNaN(id);
  }
}
