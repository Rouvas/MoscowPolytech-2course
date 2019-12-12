import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SrvService} from '../shared/services/srv.service';
import {ActivatedRoute, Router} from '@angular/router';

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
      this.id = param.id;
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
          if (person.id == this.id) {
            let item = person;
            delete item.id;
            this.personForm.setValue(item);
          }
        });
      });
    }
  }

  onAddPerson() {
    const person = this.personForm.value;
    person.tel = `+7 ${person.tel}`;
    this.srv.AddPerson(person).then(res => {
        this.personForm.reset();
      }
    );
  }

  onEditPerson(id: number) {
    let person;

    const formValues = this.personForm.controls;

    for (let key in formValues) {
      if (key !== 'tel') {
        person[key] = formValues[key].value;
      } else {
        person[key] = (formValues[key].value.toString().indexOf('+7') === -1) ? `+7 ${formValues[key].value}` : formValues[key].value;
      }
    }

    person[id] = id;

    this.srv.EditPerson(person);
  }
}
