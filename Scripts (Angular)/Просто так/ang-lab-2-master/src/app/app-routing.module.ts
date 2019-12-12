import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {PersonAddEditComponent} from './person-add-edit/person-add-edit.component';
import {PersonViewComponent} from './person-view/person-view.component';

const routes: Routes = [
  {path: '', component: PersonViewComponent},
  {path: 'add', component: PersonAddEditComponent},
  {path: 'edit/:id', component: PersonAddEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
