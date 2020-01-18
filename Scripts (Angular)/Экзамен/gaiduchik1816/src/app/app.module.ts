import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InformationComponent} from './information/information.component';
import {ShopComponent} from './shop/shop.component';
import {PhonemodelComponent} from './phonemodel/phonemodel.component';
import {FilterComponent} from './filter/filter.component';

import {HttpClientModule} from '@angular/common/http';
import { AddeditComponent } from './addedit/addedit.component';
import {PhoneFilterPipe} from './services/pipes/phone-filter.pipe';
import {PhoneFilterComponent} from './phone-filter/phone-filter.component';
import {PhoneSortPipe} from './services/sorts/phone-sort.pipe';
import {PhoneSortComponent} from './phone-sort/phone-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    ShopComponent,
    PhonemodelComponent,
    FilterComponent,
    AddeditComponent,
    PhoneFilterPipe,
    PhoneFilterComponent,
    PhoneSortPipe,
    PhoneSortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
