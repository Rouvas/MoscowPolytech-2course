import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BrowserModule } from '@angular/platform-browser'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schedule';
  constructor(public ngxSmartModalService: NgxSmartModalService) { }
}
