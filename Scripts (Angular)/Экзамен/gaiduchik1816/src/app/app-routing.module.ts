import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InformationComponent} from './information/information.component';
import {ShopComponent} from './shop/shop.component';
import {AddeditComponent} from './addedit/addedit.component';
//import {AppComponent} from './app.component';
//import {PersonAddEditComponent} from './person-add-edit/person-add-edit.component';
//import {PersonViewComponent} from './person-view/person-view.component';

const routes: Routes = [
  {path: '', component: InformationComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'add', component: AddeditComponent},
  {path: 'edit/:id', component: AddeditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}