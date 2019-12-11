import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  goods = [];

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.goods = this.itemsService.goods;
  }

}
