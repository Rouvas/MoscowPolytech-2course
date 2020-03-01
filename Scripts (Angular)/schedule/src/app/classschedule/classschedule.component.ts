import { Component, OnInit } from '@angular/core';
import { Scheduler } from 'rxjs';

@Component({
  selector: 'app-classschedule',
  templateUrl: './classschedule.component.html',
  styleUrls: ['./classschedule.component.css']
})
export class ClassscheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    let rasp = {
      1: 'Математика',
      2: 'Русский язык',
      3: 'Китайский язык',
      4: 'Информатика'
    }

    console.log(rasp);


  }

}
