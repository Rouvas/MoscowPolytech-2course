import {Injectable} from '@angular/core';
import {Phone} from '../model/phone/phonemodel';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SrvService {
  phones: Phone[] = [];
  phonesadd: Phone[] = [];
  phonesedit: Phone[] = [];
  link = 'http://localhost:3000/posts/';
  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(public http: HttpClient) {
  }

  async getPhones() {
    this.phones = [];
    
   const data = await this.http
     .get(this.link)
     .toPromise();

    for (const index in data) {
      delete data[index].createdAt;
      delete data[index].updatedAt;
      this.phones.push(data[index]);
    }
    
  }

  async addPhone(phone: Phone) {
    this.phonesadd = [];
    const dataadd = await this.http
    .get(this.link)
    .toPromise();

   for (const index in dataadd) {
     delete dataadd[index].createdAt;
     delete dataadd[index].updatedAt;
     this.phonesadd.push(dataadd[index]);
   }



    return this.http.post(this.link, phone, this.options).toPromise();
  }

  async removePhone(id: number) {
    let linkdel = this.link + id;
    return this.http.request('delete', linkdel, {body: {id}}).toPromise();
  }

  async editPhone(phone: Phone) {
    this.phonesedit = [];
    const dataedit = await this.http
    .get(this.link)
    .toPromise();

   for (const index in dataedit) {
     delete dataedit[index].createdAt;
     delete dataedit[index].updatedAt;
     this.phonesedit.push(dataedit[index]);
   }
   
   //phone.buy = this.phonesedit[phone.id].buy;

    let link = this.link + phone.id;
    return this.http.put(link, phone, this.options).toPromise();
  }
}
