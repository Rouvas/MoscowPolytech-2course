import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  goods = [];

  constructor(
    
  ) { }
  @Input() inPerson: Person;
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

}
