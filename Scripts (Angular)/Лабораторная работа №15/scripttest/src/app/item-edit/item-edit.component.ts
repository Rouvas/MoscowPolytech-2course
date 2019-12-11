import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  id: number;
  itemForm: FormGroup;
  selectedItem;

  constructor(
    private activatedRouter: ActivatedRoute, // хранит url адрес и параметры
    private router: Router, // этот сервис используется для навигации
    private itemsService: ItemsService
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  ngOnInit() {
    this.selectedItem = this.itemsService.getItemById(+this.id);
    this.itemForm = new FormGroup({
      'name': new FormControl(this.selectedItem.name)
    });
  }

  onSaveForm() {
    this.itemsService.putItemById(+this.id, this.itemForm.value.name);
    this.router.navigate([`/catalog`]); // метод navigate используется для программной навигации
  }

}
