import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppComponent } from './app.component';
<<<<<<< HEAD
=======
import { ClassscheduleComponent } from './classschedule/classschedule.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
>>>>>>> parent of 38793e55... nn

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    NgxSmartModalModule.forRoot()
=======
    NgxSmartModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
>>>>>>> parent of 38793e55... nn
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
