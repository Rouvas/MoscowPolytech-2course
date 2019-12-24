import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-person-filter',
  templateUrl: './person-filter.component.html',
  styleUrls: ['./person-filter.component.css']
})
export class PersonFilterComponent {
  @Output() filterPersonsList = new EventEmitter<object>();

  searching = {
    firstName: '',
  };

  onFilterPersonsList() {
    this.filterPersonsList.emit(this.searching);
  }
}
