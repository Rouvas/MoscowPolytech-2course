import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { PersonViewComponent } from './person-view/person-view.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { PersonDelComponent } from './person-del/person-del.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    PersonViewComponent,
    PersonAddComponent,
    PersonDelComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
