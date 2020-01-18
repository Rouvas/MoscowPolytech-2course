import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SrvService} from '../services/json/srv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {

  id: number;

  constructor(private srv: SrvService,
    private activatedRouter: ActivatedRoute,) {
      this.activatedRouter.params.subscribe(param => {
        this.id = parseInt(param.id, 10);
        console.log(param.id);
        console.log(this.id);
      });
     }

     phoneForm: FormGroup;
     disabledControl: boolean;

  ngOnInit() {
    
    this.phoneForm = new FormGroup({
      artic: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      name: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      manufacture: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      date: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      size: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      camera: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
      price: new FormControl({value: '', disabled: this.disabledControl}, [Validators.required]),
    });

    if (this.id) {
      this.srv.getPhones().then(() => {
        (this.srv.phones).forEach(phone => {
          if (phone.id === this.id) {
            const item = phone;
            delete item.id;
            this.phoneForm.setValue(item);
          }
        });
      });
    }
  }

  onAddPhone() {
    const phone = this.phoneForm.value;
    phone.buy = 0;
    let question = confirm("Подтвердите введенную информацию");
    if (question == true) {

    this.srv.addPhone(phone).then(() => {
      this.phoneForm.reset();
      document.location.href = "/shop";
    });
  } 
  else {console.log(phone.id)}
  }


  
  onEditPhone(id: number) {
    let phone = this.phoneForm.value;
    phone.id = id;

    let question = confirm("Подтвердите введенную информацию");

    if (question == true) {
    this.srv.editPhone(phone).then(() => {
      document.location.href = "/shop";
    });  } 
  }

  isNaN(id: number) {
    return isNaN(id);
  }
}



  


