import { Component } from '@angular/core';
// import { NgxSmartModalService } from 'ngx-smart-modal';
// import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    
    
 // document.cookie = "Save last position";
    
   // alert( document.cookie ); 
  
  }
  
}
