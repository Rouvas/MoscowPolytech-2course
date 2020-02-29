import { Component } from '@angular/core';
<<<<<<< HEAD
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BrowserModule } from '@angular/platform-browser'
=======
// import { NgxSmartModalService } from 'ngx-smart-modal';
// import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


>>>>>>> parent of 38793e55... nn


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'schedule';
  constructor(public ngxSmartModalService: NgxSmartModalService) { }
=======
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    
    
 // document.cookie = "Save last position";
    
   // alert( document.cookie ); 
  
  }
  
>>>>>>> parent of 38793e55... nn
}
