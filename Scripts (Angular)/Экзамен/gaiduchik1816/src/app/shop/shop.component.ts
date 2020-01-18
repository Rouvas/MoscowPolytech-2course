import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Phone} from '../services/model/phone/phonemodel';
import {SrvService} from '../services/json/srv.service';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Output() removePhone = new EventEmitter<number>();

  searching: object = {
    firstName: ' '
  };

  finding: object = {
    firstName: ' '
  };

  phones: Phone[] = [];
  modalRef: BsModalRef;
  constructor(private srv: SrvService) {}
  
  ngOnInit():void {
    this.getPhones();
  }


  getPhones() {
    this.phones = [];
    this.srv.getPhones().then(() =>
      (this.srv.phones).forEach(phone => this.phones.push(phone))
    );
  }

  onBuy(id: number) {
    let phone = this.phones[id-1];
    let question = confirm("Подтвердите изменение");

    if (question == true) {
      phone.buy = phone.buy + 1;

    this.srv.editPhone(phone).then(() => {
      console.log('Устройство добавлено')
    });  
  
  } else {console.log('Oops...')}

  }


  onRemovePhone(id: number) {
    console.log('Попытка удаления под id', id)
    this.srv.removePhone(id).then(() => {
      this.phones = this.phones.filter(phone => phone.id !== id);
    });
  }

  SortingPhonesList(e: object) {
    this.searching = e;
  }



  

}
