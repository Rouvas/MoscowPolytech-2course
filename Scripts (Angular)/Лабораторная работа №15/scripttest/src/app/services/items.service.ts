import { Injectable } from '@angular/core';
import { dependenciesFromGlobalMetadata } from '@angular/compiler/src/render3/r3_factory';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  goods = [
    { id: 0, name: 'яблоко' },
    { id: 1, name: 'груша' },
    { id: 2, name: 'томат' }
  ];

  constructor() { }

  putItemById(id: number, name: string) {
    this.goods.map(good => {
      if (good.id === id) {
        good.name = name;
      }
    });
  }

  getItemById(id: number) {
    return this.goods.find(good => good.id === id);
  }
}
