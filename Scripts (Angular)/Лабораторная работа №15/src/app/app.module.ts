import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { PersonViewComponent } from './person-view/person-view.component';
import { PersonFilterPipe } from './shared/pipes/person-filter.pipe';
import { PersonFilterComponent } from './person-filter/person-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonAddEditComponent,
    PersonViewComponent,
    PersonFilterPipe,
    PersonFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
