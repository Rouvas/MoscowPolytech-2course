import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-phone-sort',
  templateUrl: './phone-sort.component.html',
  styleUrls: ['./phone-sort.component.css']
})
export class PhoneSortComponent {
  @Output() SortPhonesList = new EventEmitter<number>();




  onClick(id:number) {
    this.SortPhonesList.emit(id);
  }


 // onSortPhonesList() {
  //  console.log(this.finding);
   // this.SortPhonesList.emit(this.finding);
 // }
}
