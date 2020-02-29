// Не работает и не будет работать

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private http: HttpClient) {
    // this.getJSON().subscribe(data => {
    //     console.log(data);
    // });
  }
  // public getJSON(): Observable<any> {
  //   return this.http.get("./rasp/schedule.json");
  // }

}
