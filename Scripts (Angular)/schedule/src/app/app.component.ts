import { Component } from '@angular/core';
// import { NgxSmartModalService } from 'ngx-smart-modal';
// import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/database';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('school68schedule');
    this.item = this.itemRef.valueChanges();
   
    console.log(this.item);
    console.log(this.itemRef);


  }

}
