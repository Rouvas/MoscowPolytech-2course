import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
 
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { PersonViewComponent } from './person-view/person-view.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { PersonDelComponent } from './person-del/person-del.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyFilterPipe } from './shared/pipes/pipes.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    PersonViewComponent,
    PersonAddComponent,
    PersonDelComponent,
    MyFilterPipe
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }


