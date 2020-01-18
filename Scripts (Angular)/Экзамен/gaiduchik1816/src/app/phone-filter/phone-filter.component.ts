import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-phone-filter',
  templateUrl: './phone-filter.component.html',
  styleUrls: ['./phone-filter.component.css']
})
export class PhoneFilterComponent {
  @Output() FilterPhonesList = new EventEmitter<object>();

  searching = {
    firstName: '',
  };

  onFilterPhonesList() {
    console.log(this.searching);
    this.FilterPhonesList.emit(this.searching);
  }
}
